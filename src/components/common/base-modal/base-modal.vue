<template>
  <section class="base-modal">
    <transition>
      <section v-if="modelValue" class="background" @click="$emit('close')">
        <section class="modal" @click.stop>
          <button class="close-btn" @click="$emit('close')">✕</button>
          <header>
            <slot name="header">{{ title }}</slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
        </section>
      </section>
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-modal',
  components: {},
  emits: {},
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
.base-modal {
  .background {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: relative;
    border-radius: 4px;
    background-color: white;
  }

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
    color: rgba(0, 0, 0, 0.7);
    top: 8px;
    right: 8px;
    height: 25px;
    width: 25px;
    font-size: 15px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: lightgray;
    }
  }

  footer {
    border-top: 1px solid #e0e0e0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
