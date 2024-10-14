<template>
  <section class="retirement-calculator">
    <button class="remove-btn" @click="$emit('remove-fund')">✕</button>
    <div class="fund-name" contenteditable @blur="updateFundName">
      {{ fundOptions.name }}
    </div>
    <div>
      <label>
        <span>דמי ניהול מצבירה</span>
        <input
          type="number"
          step="0.01"
          :value="fundOptions.accumulationAnnualFee + ''"
          @input="updateFundAccumulationAnnualFee"
        />
      </label>
      <label>
        <span>דמי ניהול מהפקדה</span>
        <input
          type="number"
          step="0.01"
          :value="fundOptions.depositFee"
          @input="updateDepositFee"
        />
      </label>
      <label>
        <span>אחוז תשואה שנתי</span>
        <input
          type="number"
          step="1"
          :value="fundOptions.investmentReturnRate"
          @input="updateInvestmentReturnRate"
        />
      </label>
    </div>
    <table v-if="options.yearsToRetirement">
      <thead>
        <th>שנים</th>
        <th>סכום צבירה</th>
        <th>דמי ניהול</th>
      </thead>
      <tbody>
        <tr v-for="i in options.yearsToRetirement" :key="i">
          <td>{{ i }}</td>
          <td>{{ calculateRetirementFund(i)[0] }}</td>
          <td>{{ calculateRetirementFund(i)[1] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import type {
  FundFeesOptions,
  RetirementCalculatorOptions
} from '@/models/retirement-calculator.model'

export default defineComponent({
  name: 'retirement-calculator',
  components: {},
  props: {
    options: {
      type: Object as PropType<RetirementCalculatorOptions>,
      required: true
    },
    fundOptions: {
      type: Object as PropType<FundFeesOptions>,
      required: true
    }
  },
  methods: {
    calculateRetirementFund(yearsToRetirement: number) {
      // Convert annual rates to monthly rates
      const monthlyDepositFeeRate = this.fundOptions.depositFee / 100
      let totalFees = 0

      const monthlyContributionDepositFee = this.options.monthlyContribution * monthlyDepositFeeRate
      const monthlyContributionAfterFee =
        this.options.monthlyContribution - monthlyContributionDepositFee
      let totalAmount = this.options.currentAccumulatedAmount

      for (let month = 1; month <= yearsToRetirement * 12; month++) {
        totalAmount += monthlyContributionAfterFee

        totalAmount *= (this.fundOptions.investmentReturnRate / 100 + 1) ** (1 / 12)

        const accumulationFee = (totalAmount * this.fundOptions.accumulationAnnualFee) / 12 / 100

        totalAmount -= accumulationFee

        totalFees += accumulationFee + monthlyContributionDepositFee
      }

      const formattedTotalAmount = Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        maximumFractionDigits: 0
      }).format(totalAmount)

      const formattedTotalFees = Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        maximumFractionDigits: 0
      }).format(totalFees)

      return [formattedTotalAmount, formattedTotalFees]
    },
    updateFundOptions(key: string, value: string | number) {
      this.$emit('update-fund-options', { ...this.fundOptions, [key]: value })
    },
    updateFundName(event: Event) {
      this.updateFundOptions('name', (event.target as HTMLDivElement).innerText)
    },
    updateFundAccumulationAnnualFee(event: Event) {
      this.updateFundOptions(
        'accumulationAnnualFee',
        parseFloat((event.target as HTMLInputElement).value)
      )
    },
    updateDepositFee(event: Event) {
      this.updateFundOptions('depositFee', parseFloat((event.target as HTMLInputElement).value))
    },
    updateInvestmentReturnRate(event: Event) {
      this.updateFundOptions(
        'investmentReturnRate',
        parseFloat((event.target as HTMLInputElement).value)
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.retirement-calculator {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  direction: rtl;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 300px;

  .fund-name {
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;

    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  input {
    width: 60px;
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
