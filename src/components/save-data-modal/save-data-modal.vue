<template>
  <section class="save-data-modal" @click="$emit('close')">
    <div @click.stop>
      <button class="close-btn" @click="$emit('close')">✕</button>
      <label>
        <span>מספר תעודת זהות</span>
        <input type="number" v-model="idNumber" />
      </label>
      <button @click="$emit('save-data', idNumber)">טען נתונים</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'save-data-modal',
  data() {
    return {
      idNumber: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.save-data-modal {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    color: white;
    background-color: #16a085;
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 16px;
    padding-top: 50px;
    border-radius: 4px;

    width: 30%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

    button:not(.close-btn) {
      grid-column: 1 / -1;
      padding: 0.5rem;
      background-color: #16a085;
      color: white;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
