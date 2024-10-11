<template>
  <header class="app-header"></header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-header',
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
.app-header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  nav {
    display: flex;
    gap: 16px;
  }
}
</style>
