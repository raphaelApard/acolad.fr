// Mobile accordions (missions, other projects, experience). The panels are only
// collapsed by CSS below the breakpoint, so the toggles are inert on desktop.
export function initDisclosures(root: ParentNode = document) {
  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-disclosure] .disclosure-toggle')) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.closest('[data-disclosure]')?.toggleAttribute('data-open', open);
    });
  }
}
