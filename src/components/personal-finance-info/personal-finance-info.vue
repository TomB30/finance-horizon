<template>
  <section class="personal-finance-info">
    <div>
      <q-input
        :model-value="options.currentAccumulatedAmount"
        @update:model-value="
          $emit('update-options', { ...options, currentAccumulatedAmount: +event.target.value })
        "
        label="צבירה נוכחית"
        stack-label
      />
      <q-input
        :model-value="options.yearsToRetirement"
        @update:model-value="
          $emit('update-options', { ...options, yearsToRetirement: +event.target.value })
        "
        label="מספר שנים לפרישה"
        stack-label
      />
      <q-input
        :model-value="options.monthlyIncome"
        @update:model-value="
          $emit('update-options', { ...options, monthlyIncome: +event.target.value })
        "
        label="שכר חודשי"
        stack-label
      />
      <q-input
        :model-value="options.monthlyContributionPercentage"
        @update:model-value="
          $emit('update-options', {
            ...options,
            monthlyContributionPercentage: +event.target.value
          })
        "
        label="אחוז הפקדה משכר"
        stack-label
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PersonalFinanceInfoOptions } from '@/models/retirement-calculator.model'

export default defineComponent({
  name: 'personal-finance-info',
  components: {},
  emits: {},
  props: {
    options: {
      type: Object as () => PersonalFinanceInfoOptions,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.personal-finance-info {
  padding: 0 16px;

  div {
    display: flex;
    justify-content: flex-start;
    gap: 30px;

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-size: 1rem;
        white-space: nowrap;
      }

      input {
        width: 150px;
      }
    }
  }
}
</style>
