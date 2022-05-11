export const validateEmail = (mail: string) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}
