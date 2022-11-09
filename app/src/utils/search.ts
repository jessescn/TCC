export function compareStrings(a: string, b: string) {
  return a.toLowerCase().localeCompare(b.toLowerCase()) == 0
}

export function includesStrings(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase())
}

export function searchByKeys<T>(value: T, keys: (keyof T)[], term: string) {
  if (term.trim() === '') return true

  let matches = false

  keys.forEach(key => {
    if (compareStrings(String(value[key]), term)) {
      matches = true
      return
    }

    const subterms = term.split(' ')

    const matchedSubterms = subterms.filter(subterm =>
      includesStrings(String(value[key]), subterm)
    )

    if (matchedSubterms.length === subterms.length) {
      matches = true
      return
    }
  })

  return matches
}
