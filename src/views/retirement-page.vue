<template>
  <section class="retirement-page">
    <h2 class="page-title">ניהול הקופה הפנסיונית שלי</h2>
    <button class="action-btn" @click="isLoadModalOpen = true">טען נתונים</button>
    <button class="action-btn" @click="isSaveModalOpen = true">שמור נתונים</button>
    <div class="header">
      <personal-finance-info
        :options="personalFinancialInfo"
        @update-options="personalFinancialInfo = $event"
      />
      <div></div>
    </div>
    <hr />
    <h3 class="sub-title">השוואת דמי ניהול בין קרנות</h3>
    <div class="compare-list">
      <retirement-calculator
        v-for="(fund, i) in funds"
        :key="fund.name"
        :options="fundsOptions"
        :fund-options="fund"
        @update-fund-options="updateFund(i, $event)"
        @remove-fund="funds.splice(i, 1)"
      />
      <button class="add-fund-btn" @click="openAddFundModal">+</button>
    </div>

    <transition>
      <add-fund-modal
        v-if="isAddFundModalOpen"
        @add-fund="addFund"
        @close="isAddFundModalOpen = false"
      />
    </transition>

    <transition>
      <load-data-modal
        v-if="isLoadModalOpen"
        @load-data="loadData"
        @close="isLoadModalOpen = false"
      />
    </transition>
    <transition>
      <save-data-modal
        v-if="isSaveModalOpen"
        @save-data="saveData"
        @close="isSaveModalOpen = false"
      />
    </transition>
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
      console.log('idNumber =========>', idNumber)
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
.action-btn {
  background-color: #16a085;
  color: white;
  border: none;
  font-size: 16px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-inline: 16px;
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

.add-fund-btn {
  height: 35px;
  width: 35px;
  border-radius: 2rem;
  border: none;
  background-color: #16a085;
  color: white;
  font-size: 30px;
  cursor: pointer;
  transition:
    width 0.3s,
    filter 0.3s;
  text-align: right;
  padding-right: 9px;

  &:hover {
    width: 100px;
    &::after {
      content: 'הוסף קרן';
      white-space: nowrap;
      position: relative;
      font-size: 15px;
      top: -6px;
      left: -6px;
    }
  }
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
