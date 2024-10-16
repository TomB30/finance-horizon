<template>
  <section class="retirement-page">
    <h4 class="page-title">ניהול הקופה הפנסיונית שלי</h4>
    <q-btn class="action-btn q-mx-md" color="primary" @click="isLoadModalOpen = true"
      >טען נתונים</q-btn
    >
    <q-btn class="action-btn" color="primary" @click="isSaveModalOpen = true">שמור נתונים</q-btn>
    <div class="header">
      <personal-finance-info
        :options="personalFinancialInfo"
        @update-options="personalFinancialInfo = $event"
      />
    </div>
    <q-separator />
    <h5 class="sub-title">השוואת דמי ניהול בין קרנות</h5>
    <div class="row q-mr-md q-gutter-md items-start">
      <retirement-calculator
        v-for="(fund, i) in funds"
        :key="fund.name"
        :options="fundsOptions"
        :fund-options="fund"
        @update-fund-options="updateFund(i, $event)"
        @remove-fund="funds.splice(i, 1)"
      />
      <q-btn color="primary" @click="openAddFundModal">הוסף קרן</q-btn>
    </div>
    <add-fund-modal
      :model-value="isAddFundModalOpen"
      @add-fund="addFund"
      @close="isAddFundModalOpen = false"
    />
    <load-data-modal
      :model-value="isLoadModalOpen"
      @load-data="loadData"
      @close="isLoadModalOpen = false"
    />
    <save-data-modal
      :model-value="isSaveModalOpen"
      @save-data="saveData"
      @close="isSaveModalOpen = false"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { RetirementCalculator } from '@/components/retirement-calculator'
import { PersonalFinanceInfo } from '@/components/personal-finance-info'
import { AddFundModal } from '@/components/add-fund-modal'
import { LoadDataModal } from '@/components/load-data-modal'
import { SaveDataModal } from '@/components/save-data-modal'

import type {
  FundFeesOptions,
  PersonalFinanceInfoOptions,
  RetirementCalculatorOptions
} from '@/models/retirement-calculator.model'

export default defineComponent({
  name: 'retirement-page',
  components: {
    RetirementCalculator,
    PersonalFinanceInfo,
    AddFundModal,
    LoadDataModal,
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
      funds: [] as FundFeesOptions[]
    }
  },
  created() {},
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
    loadData(idNumber: string) {
      const loadedData = localStorage.getItem(idNumber)
      if (loadedData) {
        const parsedData = JSON.parse(loadedData)
        this.personalFinancialInfo = parsedData.personalFinancialInfo
        this.funds = parsedData.funds
      }
      this.isLoadModalOpen = false
    },
    saveData(idNumber: string) {
      if (!idNumber) {
        this.isSaveModalOpen = false
        return
      }
      localStorage.setItem(
        idNumber,
        JSON.stringify({ personalFinancialInfo: this.personalFinancialInfo, funds: this.funds })
      )
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

.compare-list {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
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
