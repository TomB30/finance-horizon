<template>
  <section class="retirement-calculator">
    <q-btn v-if="removeable" class="remove-btn" round size="xs" @click="$emit('remove-fund')"
      ><span class="icon">✕</span></q-btn
    >
    <div class="fund-name q-my-sm" contenteditable @blur="updateFundName">
      {{ fundOptions.name }}
    </div>
    <div class="wrapper column q-ma-sm">
      <q-input
        stack-label
        step="0.01"
        type="number"
        label="דמי ניהול מצבירה"
        :model-value="fundOptions.accumulationAnnualFee"
        @update:model-value="updateFundAccumulationAnnualFee"
        suffix="%"
      />
      <q-input
        stack-label
        step="0.01"
        type="number"
        label="דמי ניהול מהפקדה"
        :model-value="fundOptions.depositFee"
        @update:model-value="updateDepositFee"
        suffix="%"
      />
      <q-input
        step="0.1"
        type="number"
        label="אחוז תשואה שנתי"
        :model-value="fundOptions.investmentReturnRate"
        @update:model-value="updateInvestmentReturnRate"
        suffix="%"
      />
    </div>
    <table v-if="options.yearsToRetirement">
      <thead>
        <th>שנים</th>
        <th>סכום צבירה</th>
        <th>דמי ניהול</th>
      </thead>
      <tbody>
        <tr v-for="(year, i) in retirementFundOverYears" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ year[0] }}</td>
          <td>{{ year[1] }}</td>
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
import { retirementUtils } from '@/utils/retirement.utils'

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
    },
    removeable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    retirementFundOverYears(): string[][] {
      return retirementUtils.calculateRetirement(
        this.options.currentAccumulatedAmount,
        this.options.monthlyContribution,
        this.fundOptions.depositFee,
        this.fundOptions.accumulationAnnualFee,
        this.fundOptions.investmentReturnRate,
        this.options.yearsToRetirement
      )
    }
  },
  methods: {
    updateFundOptions(key: string, value: string | number) {
      this.$emit('update-fund-options', { ...this.fundOptions, [key]: value })
    },
    updateFundName(event: Event) {
      this.updateFundOptions('name', (event.target as HTMLDivElement).innerText)
    },
    updateFundAccumulationAnnualFee(val: string | number | null) {
      this.updateFundOptions('accumulationAnnualFee', val ? parseFloat(val as string) : 0)
    },
    updateDepositFee(val: string | number | null) {
      this.updateFundOptions('depositFee', val ? parseFloat(val as string) : 0)
    },
    updateInvestmentReturnRate(val: string | number | null) {
      this.updateFundOptions('investmentReturnRate', val ? parseFloat(val as string) : 0)
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
  width: 340px;

  .fund-name {
    text-align: center;
    margin: 6px auto;
    width: 70%;
  }

  h1 {
    text-align: center;
  }

  .column {
    gap: 8px;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
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
