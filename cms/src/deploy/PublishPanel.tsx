'use client'

import { Button, useTranslation } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

import type { PublishStatus } from './runner'

const texts = {
  fr: {
    title: 'Publier le site',
    intro:
      'Les modifications enregistrées ici ne sont en ligne qu’après publication : le site est reconstruit à partir du contenu actuel (environ 1 à 2 minutes).',
    publish: 'Publier le site',
    running: 'Publication en cours…',
    success: 'Dernière publication réussie',
    failed: 'Dernière publication échouée : le site en ligne n’a pas changé.',
    idle: 'Aucune publication depuis ce back-office.',
    by: 'par',
    log: 'Journal',
  },
  en: {
    title: 'Publish the site',
    intro:
      'Changes saved here only go live once published: the site is rebuilt from the current content (about 1 to 2 minutes).',
    publish: 'Publish the site',
    running: 'Publishing…',
    success: 'Last publish succeeded',
    failed: 'Last publish failed: the live site has not changed.',
    idle: 'Not published from this back office yet.',
    by: 'by',
    log: 'Log',
  },
}

export const PublishPanel = () => {
  const { i18n } = useTranslation()
  const t = i18n.language === 'fr' ? texts.fr : texts.en
  const [status, setStatus] = useState<PublishStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const res = await fetch('/api/publish', { credentials: 'include' })
    if (res.ok) setStatus((await res.json()) as PublishStatus)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  // Poll while a run is in progress.
  useEffect(() => {
    if (status?.state !== 'running') return
    const timer = setInterval(() => void refresh(), 3000)
    return () => clearInterval(timer)
  }, [status?.state, refresh])

  const publish = async () => {
    setError(null)
    const res = await fetch('/api/publish', { method: 'POST', credentials: 'include' })
    if (res.ok || res.status === 409) setStatus((await res.json()) as PublishStatus)
    else setError(`HTTP ${res.status}`)
  }

  const running = status?.state === 'running'
  const when = status?.startedAt ? new Date(status.startedAt).toLocaleString(i18n.language) : ''
  const message = !status
    ? ''
    : status.state === 'idle'
      ? t.idle
      : `${status.state === 'success' ? t.success : status.state === 'failed' ? t.failed : t.running} — ${when} ${t.by} ${status.startedBy}`

  return (
    <section style={{ marginBottom: 'calc(var(--base) * 2)' }}>
      <h2 style={{ marginBottom: 'calc(var(--base) / 2)' }}>{t.title}</h2>
      <p style={{ marginBottom: 'var(--base)' }}>{t.intro}</p>
      <Button onClick={publish} disabled={running} buttonStyle="primary">
        {running ? t.running : t.publish}
      </Button>
      <p role="status" style={{ color: status?.state === 'failed' ? 'var(--theme-error-500)' : undefined }}>
        {error ?? message}
      </p>
      {status?.log ? (
        <details open={running || status.state === 'failed'}>
          <summary>{t.log}</summary>
          <pre style={{ maxHeight: '20rem', overflow: 'auto', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
            {status.log}
          </pre>
        </details>
      ) : null}
    </section>
  )
}
