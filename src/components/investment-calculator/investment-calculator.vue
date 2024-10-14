<template>
  <section class="investment-calculator">
    <button class="remove-btn" @click="$emit('remove-fund')">✕</button>
    <div class="fund-name" contenteditable @blur="updateOptions('name', $event.target.innerText)">
      {{ options.name }}
    </div>
    <div class="wrapper">
      <q-input
        :model-value="options.currentAccumulatedAmount"
        @update:model-value="updateOptions('currentAccumulatedAmount', +$event)"
        label="סכום צבירה נוכחי"
        type="number"
        dense
      />
      <q-input
        :model-value="options.monthlyContribution"
        @update:model-value="updateOptions('monthlyContribution', +$event)"
        label="הפקדה חודשית"
        type="number"
        dense
      />

      <q-input
        :model-value="options.accumulationAnnualFee"
        @update:model-value="updateOptions('accumulationAnnualFee', +$event)"
        label="דמי ניהול מצבירה"
        type="number"
        dense
      />
      <q-input
        :model-value="options.depositFee"
        @update:model-value="updateOptions('depositFee', +$event)"
        label="דמי ניהול מהפקדה"
        type="number"
        dense
      />
      <q-input
        :model-value="options.investmentReturnRate"
        @update:model-value="updateOptions('investmentReturnRate', +$event)"
        label="אחוז תשואה שנתי"
        type="number"
        dense
      />
      <q-input
        :model-value="options.incomeTaxRate"
        @update:model-value="updateOptions('incomeTaxRate', +$event)"
        label="שיעור מס הכנסה"
        type="number"
        dense
      />
      <q-input
        :model-value="options.yearsToRetirement"
        @update:model-value="updateOptions('yearsToRetirement', +$event)"
        label="שנים עד פרישה"
        type="number"
        dense
      />
      <q-toggle
        :model-value="options.reduceTaxAnnually"
        @update:model-value="updateOptions('reduceTaxAnnually', $event)"
        label="תשלום מס שנתי"
        right-label
      />
      <q-btn color="primary" size="sm" @click="addDeposit"> הוסף הפקדה חד פעמית </q-btn>
    </div>
    <table v-if="options.yearsToRetirement">
      <thead>
        <th>שנים</th>
        <th>סכום צבירה</th>
        <th>דמי ניהול</th>
        <th>מס הכנסה</th>
      </thead>
      <tbody>
        <tr v-for="(fundCalculation, i) in retirementFundCalculation" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ fundCalculation[0] }}</td>
          <td>{{ fundCalculation[1] }}</td>
          <td>{{ fundCalculation[2] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import type { InvestmentCalculatorOptions } from '@/models/retirement-calculator.model'
import type { PropType } from 'vue'

export default {
  props: {
    options: {
      type: Object as PropType<InvestmentCalculatorOptions>,
      required: true
    }
  },
  computed: {
    retirementFundCalculation(): Array<Array<string>> {
      const monthlyAccumulationFeeRate = this.options.accumulationAnnualFee / 12 / 100
      const monthlyDepositFeeRate = this.options.depositFee / 100
      const monthlyProfitRate = this.options.investmentReturnRate / 12 / 100

      let totalAmount = this.options.currentAccumulatedAmount
      let totalFees = 0
      let totalTax = 0
      const yearlyCalculations = []

      const startDate = new Date()

      for (let month = 1; month <= this.options.yearsToRetirement * 12; month++) {
        const currentDate = new Date(startDate)
        currentDate.setMonth(startDate.getMonth() + month - 1)

        // Apply one-time deposits at the correct month
        this.options.oneTimeDeposits.forEach((deposit) => {
          const date = new Date(deposit.date)
          const depositMonth =
            (date.getFullYear() - startDate.getFullYear()) * 12 +
            (date.getMonth() - startDate.getMonth()) +
            1

          if (depositMonth === month) {
            totalAmount += deposit.amount
          }
        })

        // Calculate profit for the month
        const monthlyProfit = totalAmount * monthlyProfitRate

        // Calculate accumulation and deposit fees
        const accumulationFee = totalAmount * monthlyAccumulationFeeRate
        const depositFee = this.options.monthlyContribution * monthlyDepositFeeRate

        // Add fees to the total
        totalFees += accumulationFee + depositFee

        // Update total amount after profit and fees
        totalAmount =
          (totalAmount + monthlyProfit) * (1 - monthlyAccumulationFeeRate) +
          this.options.monthlyContribution * (1 - monthlyDepositFeeRate)

        // Apply income tax logic at the end of each year
        if (month % 12 === 0) {
          // Calculate income tax for the year's profit
          const yearlyProfit = totalAmount * monthlyProfitRate * 12
          const incomeTaxAmount = (yearlyProfit * this.options.incomeTaxRate) / 100
          // Store yearly calculations: [totalAmountAfterFees, totalFees, incomeTaxAmount]
          yearlyCalculations.push([
            Intl.NumberFormat('he-IL', {
              style: 'currency',
              currency: 'ILS',
              maximumFractionDigits: 0
            }).format(totalAmount),
            Intl.NumberFormat('he-IL', {
              style: 'currency',
              currency: 'ILS',
              maximumFractionDigits: 0
            }).format(totalFees),
            Intl.NumberFormat('he-IL', {
              style: 'currency',
              currency: 'ILS',
              maximumFractionDigits: 0
            }).format(incomeTaxAmount)
          ])

          // Deduct income tax only if `reduceTaxAnnually` is true
          if (this.options.reduceTaxAnnually) {
            totalAmount -= incomeTaxAmount
            totalTax += incomeTaxAmount
          }
        }
      }

      console.log('yearlyCalculations =========>', yearlyCalculations)

      return yearlyCalculations
    }
  },
  methods: {
    addDeposit() {
      this.updateOptions('oneTimeDeposits', [
        ...this.options.oneTimeDeposits,
        { amount: 0, date: '' }
      ])
    },
    removeDeposit(index: number) {
      this.updateOptions(
        'oneTimeDeposits',
        this.options.oneTimeDeposits.filter((_, i: number) => i !== index)
      )
    },

    updateOptions(
      key: string,
      value: string | number | { amount: number; date: string }[] | boolean
    ) {
      this.$emit('update-options', { ...this.options, [key]: value })
    }
  }
}
</script>

<style lang="scss" scoped>
.investment-calculator {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  direction: rtl;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .fund-name {
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  .wrapper {
    padding: 8px;
    display: grid;
    width: 400px;
    gap: 16px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  input {
    width: 100px;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    border-radius: 0 0 4px 4px;
    width: 100%;
    th {
      background-color: #16a085;
      color: white;
      padding: 8px;
      text-align: center;
    }

    td {
      direction: ltr;
      border-bottom: 1px solid #e0e0e0;
      padding: 8px;
      text-align: center;
    }
  }

  .remove-btn {
    background-color: #f8f8f8;
    border: none;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    font-size: 14px;
    height: 25px;
    width: 25px;
    margin: 8px 8px 0 0;
    transition: background-color 0.3s;
  }
}
</style>
