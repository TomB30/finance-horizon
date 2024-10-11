<template>
  <section class="investment-page">
    <h2 class="page-title">ניהול השקעות נוספות</h2>
    <div class="investment-list">
      <investment-calculator
        :options="investmentOptions"
        @update-options="investmentOptions = $event"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { InvestmentCalculator } from '@/components/investment-calculator'
import type { InvestmentCalculatorOptions } from '@/models/retirement-calculator.model'

export default defineComponent({
  name: 'investment-page',
  components: {
    InvestmentCalculator
  },
  emits: {},
  props: {},
  data() {
    return {
      investmentOptions: {
        name: '',
        currentAccumulatedAmount: 0,
        monthlyContribution: 0,
        accumulationAnnualFee: 0,
        depositFee: 0,
        investmentReturnRate: 0,
        incomeTaxRate: 0,
        yearsToRetirement: 0,
        reduceTaxAnnually: true,
        oneTimeDeposits: []
      } as InvestmentCalculatorOptions
    }
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.page-title,
.sub-title {
  color: #16a085;
  margin: 8px 16px;
}

.investment-list {
  display: flex;
  justify-content: flex-start;
}
</style>
