/** `sizes` of the project screenshots: full width minus the page gutters on phones, 560px otherwise. */
export const PROJECT_SIZES = '(max-width: 720px) calc(100vw - 48px), 560px'

/** Widths the legacy build generated; the source width is always added. */
const LEGACY_WIDTHS = [120, 180, 240, 320, 480, 640, 960, 1280, 1920]

/** Widths to generate for an image: the usual steps below 90% of the source width, plus the source width. */
export const srcsetWidths = (sourceWidth: number) => [
  ...LEGACY_WIDTHS.filter((width) => width < sourceWidth * 0.9),
  sourceWidth,
]

/** Widest version shown in the lightbox. */
export const LIGHTBOX_MAX_WIDTH = 1920

export type LogoSize = 'default' | 'mid' | 'small'
export type LogoContext = 'home' | 'clients'

type LogoBox = {
  /** Cell of the desktop grid the logo must fit in. */
  desktop: [width: number, height: number]
  /** Cell width on phones, as a CSS expression, and its height in px. */
  mobileWidth: string
  mobileHeight: number
  /** Share of the cell a logo may fill (`--mid` and `--small` modifiers in the stylesheet). */
  desktopScale: Record<LogoSize, number>
  mobileScale: Record<LogoSize, number>
}

// Mirrors the .client / .client-card rules of global.css.
const BOXES: Record<LogoContext, LogoBox> = {
  home: {
    desktop: [200, 148],
    mobileWidth: '50vw - 54px',
    mobileHeight: 104,
    desktopScale: { default: 1, mid: 0.8, small: 0.62 },
    mobileScale: { default: 1, mid: 0.82, small: 0.64 },
  },
  clients: {
    desktop: [200, 124],
    mobileWidth: '100vw - 84px',
    mobileHeight: 124,
    desktopScale: { default: 1, mid: 0.8, small: 0.62 },
    mobileScale: { default: 1, mid: 0.8, small: 0.62 },
  },
}

/** Narrowest viewport the layout is designed for, to tell width-bound from height-bound logos. */
const MIN_VIEWPORT = 320

const viewportShare = (expression: string) => (expression.startsWith('50vw') ? 0.5 : 1)
const viewportOffset = (expression: string) => Number(expression.split('- ')[1]?.replace('px', '') ?? 0)

/**
 * `sizes` attribute of a client logo: the width it is actually painted at, given the cell it is contained in.
 * A logo is either bound by the cell width (fluid on phones) or by its height (a fixed size).
 */
export function logoSizes({
  width,
  height,
  size,
  context,
}: {
  width: number
  height: number
  size: LogoSize
  context: LogoContext
}): string {
  const box = BOXES[context]
  const aspect = width / height

  const [cellWidth, cellHeight] = box.desktop
  const desktop = Math.round(
    Math.min(cellWidth * box.desktopScale[size], cellHeight * box.desktopScale[size] * aspect),
  )

  const scale = box.mobileScale[size]
  const heightBound = Math.round(box.mobileHeight * scale * aspect)
  const narrowestCell =
    MIN_VIEWPORT * viewportShare(box.mobileWidth) - viewportOffset(box.mobileWidth)

  // Within a pixel of the narrowest cell, a fixed size is close enough to a fluid one.
  if (heightBound <= narrowestCell * scale + 1) {
    return heightBound === desktop
      ? `${desktop}px`
      : `(max-width: 720px) ${heightBound}px, ${desktop}px`
  }

  const fluid =
    scale === 1 ? `calc(${box.mobileWidth})` : `calc((${box.mobileWidth}) * ${scale})`
  return `(max-width: 720px) ${fluid}, ${desktop}px`
}
