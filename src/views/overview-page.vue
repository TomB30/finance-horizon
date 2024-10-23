<template>
  <section class="overview-page">
    <h4 class="page-title">מבט על</h4>
    <div></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overview-page',
  components: {},
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

<style lang="scss" scoped>
.page-title,
.sub-title {
  color: #16a085;
  margin: 8px 16px;
}
</style>
