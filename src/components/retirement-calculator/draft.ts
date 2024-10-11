// calculateRetirementFund(yearsToRetirement: number) {
//     // Convert annual rates to monthly rates
//     const monthlyAccumulationFeeRate = this.fundOptions.accumulationAnnualFee / 12 / 100
//     const monthlyDepositFeeRate = this.fundOptions.depositFee / 100
//     const monthlyProfitRate = this.fundOptions.investmentReturnRate / 12 / 100

//     let totalAmount = this.options.currentAccumulatedAmount
//     let totalFees = 0
//     let totalProfits = 0 // Separate tracker for profits

//     for (let month = 1; month <= yearsToRetirement * 12; month++) {
//       const depositFee = this.options.monthlyContribution * monthlyDepositFeeRate
//       const accumulationFee = totalAmount * monthlyAccumulationFeeRate

//       totalAmount += this.options.monthlyContribution - depositFee

//       // Update total fees
//       totalFees += accumulationFee + depositFee

//       // Then calculate the profit only on the current total amount (not on profits)
//       const monthlyProfit = totalAmount * monthlyProfitRate

//       // Add profit to totalProfits but do not compound it
//       totalProfits += monthlyProfit

//       // Apply the accumulation fee after calculating the profit
//       totalAmount -= accumulationFee

//       if (month % 12 === 0) {
//       totalAmount += totalProfits
//       }
//     }

//     // Total funds is contributions + accumulated profits
//     const finalAmount = totalAmount + totalProfits

//     const formattedFinalAmount = Intl.NumberFormat('he-IL', {
//       style: 'currency',
//       currency: 'ILS',
//       maximumFractionDigits: 0
//     }).format(finalAmount)

//     const formattedTotalFees = Intl.NumberFormat('he-IL', {
//       style: 'currency',
//       currency: 'ILS',
//       maximumFractionDigits: 0
//     }).format(totalFees)

//     return [formattedFinalAmount, formattedTotalFees]
//   },
