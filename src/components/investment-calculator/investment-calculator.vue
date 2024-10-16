<template>
  <section class="investment-calculator">
    <q-btn class="remove-btn" round size="xs" @click="$emit('remove-fund')"
      ><span class="icon">✕</span></q-btn
    >
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
        suffix="₪"
      />
      <q-input
        :model-value="options.monthlyContribution"
        @update:model-value="updateOptions('monthlyContribution', +$event)"
        label="הפקדה חודשית"
        type="number"
        dense
        suffix="₪"
      />

      <q-input
        :model-value="options.accumulationAnnualFee"
        @update:model-value="updateOptions('accumulationAnnualFee', +$event)"
        label="דמי ניהול מצבירה"
        type="number"
        step="0.01"
        dense
        suffix="%"
      />
      <q-input
        :model-value="options.depositFee"
        @update:model-value="updateOptions('depositFee', +$event)"
        label="דמי ניהול מהפקדה"
        type="number"
        step="0.01"
        dense
        suffix="%"
      />
      <q-input
        :model-value="options.investmentReturnRate"
        @update:model-value="updateOptions('investmentReturnRate', +$event)"
        label="אחוז תשואה שנתי"
        type="number"
        step="0.1"
        dense
        suffix="%"
      />
      <q-input
        :model-value="options.incomeTaxRate"
        @update:model-value="updateOptions('incomeTaxRate', +$event)"
        label="שיעור מס הכנסה"
        type="number"
        dense
        suffix="%"
      />
      <q-input
        :model-value="options.yearsToRetirement"
        @update:model-value="updateOptions('yearsToRetirement', +$event)"
        label="שנים עד פרישה"
        type="number"
        dense
      />
      <q-toggle
        dense
        :model-value="options.reduceTaxAnnually"
        @update:model-value="updateOptions('reduceTaxAnnually', $event)"
        label="תשלום מס שנתי"
        left-label
      />
    </div>
    <div
      class="row justify-around items-center"
      v-for="(singleDeposit, i) in options.oneTimeDeposits"
      :key="i"
    >
      <q-input
        dense
        :model-value="singleDeposit.amount"
        type="number"
        @update:model-value="updateOneTimeDeposits(i, { ...singleDeposit, amount: +$event })"
      />
      <q-input
        dense
        type="date"
        :model-value="singleDeposit.date"
        @update:model-value="updateOneTimeDeposits(i, { ...singleDeposit, date: $event })"
      />
      <q-btn flat round size="xs" @click="removeDeposit(i)">
        <span class="icon">✕</span>
      </q-btn>
    </div>
    <q-btn color="primary" class="q-ma-sm" size="sm" @click="addDeposit">
      הוסף הפקדה חד פעמית
    </q-btn>
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
      const depositFeeRate = this.options.depositFee / 100

      let totalAmount = this.options.currentAccumulatedAmount
      let totalFees = 0
      let totalTax = 0
      const yearlyCalculations = []
      let totalProfit = 0

      const startDate = new Date()

      for (let month = 1; month <= this.options.yearsToRetirement * 12; month++) {
        // Add monthly contribution
        totalAmount = this.addOneTimeDeposits(startDate, totalAmount, month, depositFeeRate)
        totalAmount += this.options.monthlyContribution * (1 - depositFeeRate)

        // Calculate profit
        const monthlyProfit =
          totalAmount * (this.options.investmentReturnRate / 100 + 1) ** (1 / 12) - totalAmount

        totalAmount += monthlyProfit

        // Calculate accumulation and deposit fees
        const accumulationFee = totalAmount * monthlyAccumulationFeeRate
        const depositFee = this.options.monthlyContribution * depositFeeRate

        totalProfit += monthlyProfit - accumulationFee
        // Add fees to the total
        totalFees += accumulationFee + depositFee

        // Update total amount after profit and fees
        totalAmount = totalAmount * (1 - monthlyAccumulationFeeRate)

        // Apply income tax logic at the end of each year
        if (month % 12 === 0) {
          // Calculate income tax for the year's profit
          const incomeTaxAmount = (totalProfit * this.options.incomeTaxRate) / 100

          // Store yearly calculations: [totalAmountAfterFees, totalFees, incomeTaxAmount]
          yearlyCalculations.push([
            this.shekelFormat(totalAmount),
            this.shekelFormat(totalFees),
            this.shekelFormat(incomeTaxAmount)
          ])

          // Deduct income tax only if `reduceTaxAnnually` is true
          if (this.options.reduceTaxAnnually) {
            totalAmount -= incomeTaxAmount
            totalTax += incomeTaxAmount
            totalProfit = 0
          }
        }
      }

      return yearlyCalculations
    }
  },
  methods: {
    shekelFormat(amount: number): string {
      return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        maximumFractionDigits: 0
      }).format(amount)
    },
    addOneTimeDeposits(
      startDate: Date,
      totalAmount: number,
      month: number,
      depositFeeRate: number
    ) {
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
          totalAmount += deposit.amount * (1 - depositFeeRate)
        }
      })
      return totalAmount
    },
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
    updateOneTimeDeposits(index: number, value: { amount: number; date: string }) {
      this.updateOptions(
        'oneTimeDeposits',
        this.options.oneTimeDeposits.map((d, i) => (i === index ? value : d))
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .fund-name {
    text-align: center;
  }

  .wrapper {
    padding: 8px;
    display: grid;
    width: 400px;
    gap: 16px;
    grid-template-columns: 1fr 1fr 1fr;
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
    position: absolute;
    top: 6px;
    left: 8px;
  }
}
</style>
