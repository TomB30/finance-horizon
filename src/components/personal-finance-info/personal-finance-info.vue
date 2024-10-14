<template>
  <section class="personal-finance-info">
    <div>
      <q-input
        :model-value="options.currentAccumulatedAmount"
        type="number"
        @update:model-value="
          $emit('update-options', { ...options, currentAccumulatedAmount: +$event })
        "
        label="צבירה נוכחית"
        suffix="₪"
      />
      <q-input
        :model-value="options.yearsToRetirement"
        type="number"
        @update:model-value="$emit('update-options', { ...options, yearsToRetirement: +$event })"
        label="מספר שנים לפרישה"
      />
      <q-input
        :model-value="options.monthlyIncome"
        type="number"
        @update:model-value="$emit('update-options', { ...options, monthlyIncome: +$event })"
        label="שכר חודשי"
        suffix="₪"
      />
      <q-input
        :model-value="options.monthlyContributionPercentage"
        type="number"
        @update:model-value="
          $emit('update-options', {
            ...options,
            monthlyContributionPercentage: +$event
          })
        "
        label="אחוז הפקדה משכר"
        step="0.01"
        suffix="%"
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
  emits: ['update-options'],
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
    gap: 16px;
    width: 600px;
  }
}
</style>
