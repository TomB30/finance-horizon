<template>
  <base-modal class="save-data-modal" @click="$emit('close')" title="שמור נתונים">
    <p>האם אתה בטוח שברצונך לשמור את נתוני הפנסיה?</p>
    <template #footer>
      <q-btn color="primary" size="sm" @click="$emit('save-data', idNumber)">שמור נתונים</q-btn>
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
  }
}
</style>
