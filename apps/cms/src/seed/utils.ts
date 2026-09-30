type Plain = Record<string, unknown>

const isPlain = (value: unknown): value is Plain =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Deep-merges seed fragments left to right. Plain objects merge key by key and arrays merge row by row,
 * so a row can be spread over a shared part (ids, urls) and a localized part (texts).
 */
export function merge(...parts: unknown[]): unknown {
  return parts.reduce((acc, part) => {
    if (part === undefined) return acc
    if (isPlain(acc) && isPlain(part)) {
      const out: Plain = { ...acc }
      for (const key of Object.keys(part)) out[key] = key in acc ? merge(acc[key], part[key]) : part[key]
      return out
    }
    if (Array.isArray(acc) && Array.isArray(part)) {
      return Array.from({ length: Math.max(acc.length, part.length) }, (_, i) =>
        i < acc.length && i < part.length ? merge(acc[i], part[i]) : (i < part.length ? part[i] : acc[i]),
      )
    }
    return part
  }, undefined)
}

/**
 * Copies the row ids of `saved` (a document just written in one language) onto the matching rows of `next`
 * (the same document in another language). Array rows are shared between languages: writing them again without
 * their id would replace them and orphan the text already stored for the other language.
 */
export function withRowIds<T>(saved: unknown, next: T): T {
  if (Array.isArray(next) && Array.isArray(saved)) {
    return next.map((row, i) => withRowIds(saved[i], isPlain(row) && isPlain(saved[i]) && 'id' in saved[i] ? { ...row, id: saved[i].id } : row)) as T
  }
  if (isPlain(next) && isPlain(saved)) {
    const out: Plain = {}
    for (const key of Object.keys(next)) out[key] = withRowIds(saved[key], next[key])
    return out as T
  }
  return next
}
