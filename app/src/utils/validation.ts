export const validateEmail = (mail: string) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

export const extract = (beg: string, end: string) => {
  const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm')
  const normalise = (str: string) => str.slice(beg.length, end.length * -1)
  return function (str: any): string[] {
    return str.match(matcher).map(normalise)
  }
}
