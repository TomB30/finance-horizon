<template>
  <base-modal class="add-fund-modal" @close="$emit('close')" title="הוספת קרן">
    <div class="modal-body">
      <label>
        <span>שם הקרן</span>
        <input type="text" v-model="fundOptions.name" />
      </label>
      <label>
        <span>דמי ניהול מצבירה</span>
        <input type="number" step="0.01" v-model="fundOptions.accumulationAnnualFee" />
      </label>
      <label>
        <span>דמי ניהול מהפקדה</span>
        <input type="number" step="0.01" v-model="fundOptions.depositFee" />
      </label>
      <label>
        <span>אחוז תשואה שנתי</span>
        <input type="number" step="1" v-model="fundOptions.investmentReturnRate" />
      </label>
    </div>
    <template #footer>
      <button class="add-fund-btn" @click="$emit('add-fund', fundOptions)">הוסף קרן</button>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BaseModal } from '@/components/common/base-modal'

import type { FundFeesOptions } from '@/models/retirement-calculator.model'

export default defineComponent({
  name: 'add-fund-modal',
  components: {
    BaseModal
  },
  data() {
    return {
      fundOptions: {
        name: '',
        accumulationAnnualFee: 0,
        depositFee: 0,
        investmentReturnRate: 0
      } as FundFeesOptions
    }
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.add-fund-modal {
  .modal-body {
    display: grid;
    grid-row: 2;
    grid-template-columns: 1fr 1fr;
    flex-direction: column;
    gap: 1rem;

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-size: 1rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }
    }
  }

  .add-fund-btn {
    padding: 0.5rem 1rem;
    background-color: #16a085;
    color: white;
    border: none;
    border-radius: 4px;
  }
}
</style>
