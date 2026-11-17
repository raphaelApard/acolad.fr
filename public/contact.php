<?php
// Receives the contact form (src/components/pages/ContactPage.astro) and e-mails it to the
// company with PHP's mail(), as the host (o2switch) sends it. Nothing is stored, apart from a
// short-lived count of requests per hashed IP address to slow down abuse.
//
// Answers in JSON when the page posts with fetch (Accept: application/json); otherwise, for a
// browser without JavaScript, redirects back to the contact page with an anchor that shows the
// outcome (#contact-sent or #contact-failed).

declare(strict_types=1);

// The address that receives the messages, and sends them: the company address, the same as
// `business.email` in src/content/business.ts. It must be on the site's domain (SPF).
const RECIPIENT = 'contact@acolad.fr';
const SENDER_NAME = 'Site acolad.fr';

// Where the visitor goes back to, per language (the contact page paths in src/site/routes.ts).
const PAGES = ['fr' => '/contact/', 'en' => '/en/contact/'];

// At most this many messages per IP address within the window.
const RATE_LIMIT = 5;
const RATE_WINDOW = 3600;

const MAX_LENGTHS = ['name' => 200, 'company' => 200, 'email' => 254, 'need' => 200, 'message' => 10000];

function wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

/** Ends the request with the outcome, in the form the client asked for. */
function respond(int $status, string $outcome, string $lang): never
{
    if (wants_json()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $outcome === 'sent', 'error' => $outcome === 'sent' ? null : $outcome]);
    } else {
        $anchor = $outcome === 'sent' ? 'contact-sent' : 'contact-failed';
        header('Location: ' . PAGES[$lang] . '#' . $anchor, true, 303);
    }
    exit;
}

/** One line of text: no line breaks (they would let a field forge mail headers), trimmed. */
function single_line(string $value): string
{
    return trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
}

/** A display name for a mail header: quoted when plain ASCII, encoded (RFC 2047) otherwise. */
function display_name(string $name): string
{
    if (mb_check_encoding($name, 'ASCII')) {
        return '"' . addcslashes($name, '"\\') . '"';
    }
    return mb_encode_mimeheader($name, 'UTF-8', 'B', "\r\n");
}

/** True when this address may send another message; counts the request. */
function within_rate_limit(string $ip): bool
{
    // Outside the web root when the host allows it, so the counts are never served.
    $dir = dirname(__DIR__) . '/contact-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700) && !is_dir($dir)) {
        $dir = sys_get_temp_dir() . '/acolad-contact-rate';
        if (!is_dir($dir) && !@mkdir($dir, 0700) && !is_dir($dir)) {
            return true;
        }
    }
    $file = $dir . '/' . hash('sha256', $ip . '|' . __FILE__);
    $now = time();
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return true;
    }
    flock($handle, LOCK_EX);
    $times = array_filter(
        array_map('intval', explode(',', stream_get_contents($handle) ?: '')),
        static fn (int $t) => $t > $now - RATE_WINDOW,
    );
    $allowed = count($times) < RATE_LIMIT;
    if ($allowed) {
        $times[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, implode(',', $times));
    flock($handle, LOCK_UN);
    fclose($handle);

    // Forget the addresses that have been quiet for a whole window (the legal notice promises
    // an hour at most).
    foreach (glob($dir . '/*') ?: [] as $old) {
        if (filemtime($old) < $now - RATE_WINDOW) {
            @unlink($old);
        }
    }
    return $allowed;
}

$lang = ($_POST['lang'] ?? '') === 'en' ? 'en' : 'fr';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

// A form posted from another site: refuse it (browsers send Origin on every POST).
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if ($origin !== null && $origin !== 'https://' . ($_SERVER['HTTP_HOST'] ?? '')) {
    respond(403, 'origin', $lang);
}

// The "website" field is hidden from people: only robots fill it. They are told it worked.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, 'sent', $lang);
}

$fields = [];
foreach (MAX_LENGTHS as $key => $max) {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || !mb_check_encoding($value, 'UTF-8') || mb_strlen($value, 'UTF-8') > $max) {
        respond(400, 'invalid', $lang);
    }
    $fields[$key] = $key === 'message' ? trim(str_replace(["\r\n", "\r"], "\n", $value)) : single_line($value);
}

if ($fields['name'] === '' || $fields['message'] === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    respond(400, 'invalid', $lang);
}

$recipient = RECIPIENT;
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    error_log('contact.php: RECIPIENT is not a valid address');
    respond(500, 'server', $lang);
}

if (!within_rate_limit((string) ($_SERVER['REMOTE_ADDR'] ?? ''))) {
    respond(429, 'rate', $lang);
}

$need = $fields['need'] !== '' ? $fields['need'] : 'Autre demande';

$body = implode("\n", array_filter([
    'Nom : ' . $fields['name'],
    $fields['company'] !== '' ? 'Société : ' . $fields['company'] : null,
    'E-mail : ' . $fields['email'],
    'Besoin : ' . $need,
    'Langue du site : ' . $lang,
])) . "\n\n" . $fields['message'] . "\n";

$headers = [
    // Sent from the company's own address: the domain's SPF record lets this server send for it.
    'From' => display_name(SENDER_NAME) . ' <' . $recipient . '>',
    // Answering the e-mail writes to the visitor.
    'Reply-To' => display_name($fields['name']) . ' <' . $fields['email'] . '>',
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

// -f sets the envelope sender, which SPF checks, to the same address.
$subject = mb_encode_mimeheader('Demande depuis acolad.fr : ' . $need, 'UTF-8', 'B', "\r\n");
$sent = mail($recipient, $subject, $body, $headers, '-f' . $recipient);

if (!$sent) {
    error_log('contact.php: mail() failed');
    respond(500, 'server', $lang);
}

respond(200, 'sent', $lang);
