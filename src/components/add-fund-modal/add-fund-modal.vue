<template>
  <base-modal class="add-fund-modal" @close="$emit('close')" title="הוספת קרן">
    <div class="modal-body">
      <q-input v-model="fundOptions.name" label="שם הקרן" />
      <q-input
        v-model="fundOptions.accumulationAnnualFee"
        type="number"
        step="0.01"
        label="דמי ניהול מצבירה"
      />
      <q-input
        v-model="fundOptions.depositFee"
        type="number"
        step="0.01"
        label="דמי ניהול מהפקדה"
      />
      <q-input
        v-model="fundOptions.investmentReturnRate"
        type="number"
        step="0.1"
        label="אחוז תשואה שנתי"
      />
    </div>
    <template #footer>
      <q-btn color="primary" @click="$emit('add-fund', fundOptions)">הוסף קרן</q-btn>
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

  .q-input * {
    direction: rtl !important;
  }
}
</style>
