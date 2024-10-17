export const stringUtils = {
  shekelFormat
}

function shekelFormat(amount: number): string {
  return Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0
  }).format(amount)
}
