<template>
  <base-modal class="load-data-modal" @click="$emit('close')" title="טען נתונים">
    <div class="modal-body">
      <q-input v-model="idNumber" label="מספר תעודת זהות" type="number" />
    </div>
    <template #footer>
      <q-btn color="primary" size="sm" @click="$emit('load-data', idNumber)">טען נתונים</q-btn>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseModal } from '../common/base-modal'
export default defineComponent({
  name: 'load-data-modal',
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
.load-data-modal {
  div {
    background-color: white;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
