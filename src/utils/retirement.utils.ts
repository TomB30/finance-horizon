import { stringUtils } from './string.utils'

export const retirementUtils = {
  calculateRetirement
}
/**
 * Calculate the amount of money and fees per year until retirement.
 * @param currentAmount - The current amount of money.
 * @param monthlyContribution - The monthly contribution.
 * @param depositFee - The deposit fee in percentage.
 * @param annualAccumulationFee - The annual accumulation fee in percentage.
 * @param annualReturnRate - The annual return rate in percentage.
 * @param yearsToRetirement - The years until retirement.
 **/
function calculateRetirement(
  currentAmount: number,
  monthlyContribution: number,
  depositFee: number,
  annualAccumulationFee: number,
  annualReturnRate: number,
  yearsToRetirement: number
): string[][] {
  const amountAndFeesPerYear = []
  let totalFees = 0

  const monthlyContributionDepositFee = monthlyContribution * (depositFee / 100)
  const monthlyContributionAfterFee = monthlyContribution - monthlyContributionDepositFee
  let totalAmount = currentAmount

  for (let month = 1; month <= yearsToRetirement * 12; month++) {
    totalAmount += monthlyContributionAfterFee
    totalAmount *= (annualReturnRate / 100 + 1) ** (1 / 12)

    const accumulationFee = (totalAmount * annualAccumulationFee) / 12 / 100
    totalAmount -= accumulationFee

    totalFees += accumulationFee + monthlyContributionDepositFee

    const formattedTotalAmount = stringUtils.shekelFormat(totalAmount)
    const formattedTotalFees = stringUtils.shekelFormat(totalFees)
    if (month % 12 === 0) {
      amountAndFeesPerYear.push([formattedTotalAmount, formattedTotalFees])
    }
  }

  return amountAndFeesPerYear
}
