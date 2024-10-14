<template>
  <base-modal class="save-data-modal" @click="$emit('close')" title="שמור נתונים">
    <div>
      <label>
        <span>מספר תעודת זהות</span>
        <input type="number" v-model="idNumber" />
      </label>
    </div>
    <template #footer>
      <button @click="$emit('save-data', idNumber)">טען נתונים</button>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseModal } from '../common/base-modal'

export default defineComponent({
  name: 'save-data-modal',
  components: {
    BaseModal
  },
  data() {
    return {
      idNumber: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.save-data-modal {
  div {
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
  }
  button {
    padding: 0.5rem;
    background-color: #16a085;
    color: white;
    border: none;
    border-radius: 4px;
  }
}
</style>
