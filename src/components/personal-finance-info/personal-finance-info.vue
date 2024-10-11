<template>
  <section class="personal-finance-info">
    <div>
      <label>
        <span>צבירה נוכחית</span>
        <input
          type="number"
          placeholder="הכנס סכום"
          :value="options.currentAccumulatedAmount"
          @input="
            $emit('update-options', { ...options, currentAccumulatedAmount: +$event.target.value })
          "
        />
      </label>
      <label>
        <span>מספר שנים לפרישה</span>
        <input
          type="number"
          :value="options.yearsToRetirement"
          @input="$emit('update-options', { ...options, yearsToRetirement: +$event.target.value })"
        />
      </label>
      <label>
        <span>שכר חודשי</span>
        <input
          type="number"
          :value="options.monthlyIncome"
          @input="$emit('update-options', { ...options, monthlyIncome: +$event.target.value })"
        />
      </label>
      <label>
        <span>אחוז הפקדה משכר</span>
        <input
          type="number"
          :value="options.monthlyContributionPercentage"
          @input="
            $emit('update-options', {
              ...options,
              monthlyContributionPercentage: +$event.target.value
            })
          "
        />
      </label>
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
