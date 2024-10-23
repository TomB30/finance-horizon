<template>
  <section class="education-fund-page">
    <education-fund-calculator />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { EducationFundCalculator } from '@/components/education-fund-calculator'

export default defineComponent({
  name: 'education-fund-page',
  components: {
    EducationFundCalculator
  },
  emits: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
})
</script>
