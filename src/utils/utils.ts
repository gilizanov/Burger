export const formatCurrency = (n: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    style: 'currency',
  }).format(n)
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/[^\d]/g, '')
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return formatPhoneNumber(phoneNumber).length === 11
}

export const validateEmail = (email: string): boolean => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
