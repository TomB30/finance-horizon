<template>
  <section class="retirement-page">
    <h4 class="page-title">ניהול הקופה הפנסיונית שלי</h4>
    <div class="header">
      <personal-finance-info
        :options="personalFinancialInfo"
        @update-options="personalFinancialInfo = $event"
      />
      <q-btn class="action-btn q-mr-md" color="primary" @click="isSaveModalOpen = true"
        >שמור נתונים</q-btn
      >
    </div>
    <q-separator />
    <h5 class="sub-title">השוואת דמי ניהול בין קרנות</h5>
    <div class="cacluator-list row q-mr-md items-start">
      <template v-for="(fund, i) in funds" :key="fund.name">
        <retirement-calculator
          :removeable="i !== 0"
          :options="fundsOptions"
          :fund-options="fund"
          @update-fund-options="updateFund(i, $event)"
          @remove-fund="funds.splice(i, 1)"
        />
        <q-separator v-if="i === 0" vertical />
      </template>
      <q-btn color="primary" @click="openAddFundModal">הוסף קרן להשוואה</q-btn>
    </div>
    <add-fund-modal
      :model-value="isAddFundModalOpen"
      @add-fund="addFund"
      @close="isAddFundModalOpen = false"
    />
    <save-data-modal
      :model-value="isSaveModalOpen"
      @save-data="saveRetirementData"
      @close="isSaveModalOpen = false"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { RetirementCalculator } from '@/components/retirement-calculator'
import { PersonalFinanceInfo } from '@/components/personal-finance-info'
import { AddFundModal } from '@/components/add-fund-modal'
import { SaveDataModal } from '@/components/save-data-modal'

import type {
  FundFeesOptions,
  PersonalFinanceInfoOptions,
  RetirementCalculatorOptions
} from '@/models/retirement-calculator.model'
import { useAuthStore } from '@/stores/auth.store'

export default defineComponent({
  name: 'retirement-page',
  components: {
    RetirementCalculator,
    PersonalFinanceInfo,
    AddFundModal,
    SaveDataModal
  },
  emits: {},
  props: {},
  data() {
    return {
      isAddFundModalOpen: false,
      isLoadModalOpen: false,
      isSaveModalOpen: false,
      personalFinancialInfo: {
        monthlyIncome: 0,
        monthlyContributionPercentage: 18.5,
        currentAccumulatedAmount: 0,
        yearsToRetirement: 0
      } as PersonalFinanceInfoOptions,
      options: {
        currentAccumulatedAmount: 156759,
        yearsToRetirement: 41,
        monthlyContribution: 5833
      } as RetirementCalculatorOptions,
      funds: [
        { name: 'קרן הפנסיה שלי', accumulationAnnualFee: 0, depositFee: 0, investmentReturnRate: 0 }
      ] as FundFeesOptions[],
      authStore: useAuthStore()
    }
  },
  async created() {
    await this.loadRetirementData()
  },
  computed: {
    fundsOptions(): RetirementCalculatorOptions {
      return {
        currentAccumulatedAmount: this.personalFinancialInfo.currentAccumulatedAmount,
        yearsToRetirement: this.personalFinancialInfo.yearsToRetirement,
        monthlyContribution:
          this.personalFinancialInfo.monthlyIncome *
          (this.personalFinancialInfo.monthlyContributionPercentage / 100)
      }
    }
  },
  methods: {
    async loadRetirementData() {
      const userId = this.authStore.loggedInUserId
      if (!userId) return
      const loadedData = localStorage.getItem(userId)
      if (loadedData) {
        const parsedData = JSON.parse(loadedData)
        this.personalFinancialInfo = parsedData.personalFinancialInfo
        this.funds = parsedData.funds
      }
    },
    openAddFundModal() {
      this.isAddFundModalOpen = true
    },
    addFund(fund: FundFeesOptions) {
      this.funds.push({
        name: fund.name,
        accumulationAnnualFee: fund.accumulationAnnualFee,
        depositFee: fund.depositFee,
        investmentReturnRate: fund.investmentReturnRate
      })
      this.isAddFundModalOpen = false
    },
    updateFund(index: number, fund: FundFeesOptions) {
      this.funds[index] = fund
    },
    saveRetirementData() {
      const userId = this.authStore.loggedInUserId
      if (!userId) return
      let userDataStr = localStorage.getItem(userId)
      if (!userDataStr) {
        localStorage.setItem(
          userId,
          JSON.stringify({ personalFinancialInfo: this.personalFinancialInfo, funds: this.funds })
        )
      } else {
        const userData = JSON.parse(userDataStr)
        userData.personalFinancialInfo = this.personalFinancialInfo
        userData.funds = this.funds
        localStorage.setItem(userId, JSON.stringify(userData))
      }
      this.isSaveModalOpen = false
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

.header {
  display: flex;
  align-items: end;
  padding: 8px 0;
}

.cacluator-list {
  gap: 16px;
}

.personal-info-wrapper {
  display: flex;
  gap: 16px;
  padding: 0 16px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
