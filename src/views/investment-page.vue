<template>
  <section class="investment-page">
    <h4 class="page-title">ניהול השקעות נוספות</h4>
    <div class="investment-list row q-pa-md">
      <template v-for="(investment, i) in investments" :key="investment.name">
        <investment-calculator
          :options="investment"
          @remove="removeInvestment(i)"
          @update-options="investments[i] = $event"
        />
      </template>
      <div class="column q-gutter-md">
        <q-btn color="primary" @click="addInvestment">הוסף השקעה</q-btn>
        <q-btn color="primary" @click="saveInvestmentsData">שמור נתונים</q-btn>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { InvestmentCalculator } from '@/components/investment-calculator'
import type { InvestmentCalculatorOptions } from '@/models/retirement-calculator.model'
import { useAuthStore } from '@/stores/auth.store'

export default defineComponent({
  name: 'investment-page',
  components: {
    InvestmentCalculator
  },
  emits: {},
  props: {},
  data() {
    return {
      investments: [
        {
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
        }
      ] as InvestmentCalculatorOptions[],
      authStore: useAuthStore()
    }
  },
  created() {
    this.loadInvestmentsData()
  },
  computed: {},
  methods: {
    addInvestment() {
      this.investments.push({
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
      })
    },
    removeInvestment(index: number) {
      this.investments.splice(index, 1)
    },
    loadInvestmentsData() {
      const userId = this.authStore.loggedInUserId
      if (!userId) return
      const userDataStr = localStorage.getItem(userId)
      if (!userDataStr) return
      const userData = JSON.parse(userDataStr)
      this.investments = userData.investments
    },
    saveInvestmentsData() {
      const userId = this.authStore.loggedInUserId
      if (!userId) return
      const userDataStr = localStorage.getItem(userId)
      if (!userDataStr) {
        localStorage.setItem(userId, JSON.stringify({ investments: this.investments }))
      } else {
        const userData = JSON.parse(userDataStr)
        userData.investments = this.investments
        localStorage.setItem(userId, JSON.stringify(userData))
      }
    }
  }
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
  align-items: flex-start;
  gap: 16px;
}
</style>
