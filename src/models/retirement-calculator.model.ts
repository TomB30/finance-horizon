export interface RetirementCalculatorOptions {
  currentAccumulatedAmount: number
  yearsToRetirement: number
  monthlyContribution: number
}

export interface FundFeesOptions {
  accumulationAnnualFee: number
  depositFee: number
  investmentReturnRate: number
  name: string
}

export interface PersonalFinanceInfoOptions {
  currentAccumulatedAmount: number
  monthlyContributionPercentage: number
  yearsToRetirement: number
  monthlyIncome: number
}

export interface InvestmentCalculatorOptions {
  name: string
  currentAccumulatedAmount: number
  monthlyContribution: number
  accumulationAnnualFee: number
  depositFee: number
  investmentReturnRate: number
  yearsToRetirement: number
  incomeTaxRate: number
  reduceTaxAnnually: boolean
  oneTimeDeposits: { amount: number; date: string }[]
}
