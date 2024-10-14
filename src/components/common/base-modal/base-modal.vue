<template>
  <q-dialog :model-value="modelValue" @hide="$emit('close')">
    <q-card class="modal" @click.stop>
      <q-btn class="close-btn" @click="$emit('close')" round size="xs">
        <span class="icon">✕</span>
      </q-btn>
      <header>
        <slot name="header">{{ title }}</slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-modal',
  components: {},
  emits: ['close'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
header,
footer,
main {
  padding: 8px 16px;
}

header {
  border-bottom: 1px solid #e0e0e0;
  min-height: 40px;
  text-align: center;
  font-weight: bold;
}

.close-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #000;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

footer {
  border-top: 1px solid #e0e0e0;
}
</style>
