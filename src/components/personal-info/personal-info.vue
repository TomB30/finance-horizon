<template>
  <section class="personal-info">
    <h3>פרטים אישיים</h3>
    <div>
      <label>
        <span>שם פרטי</span>
        <input type="text" />
      </label>
      <label>
        <span>שם משפחה</span>
        <input type="text" />
      </label>
      <label>
        <span>תאריך לידה</span>
        <input type="date" />
      </label>
      <label>
        <span>תעודת זהות</span>
        <input type="text" />
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'personal-info',
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
.personal-info {
  div {
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
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
      }
    }
  }
}
</style>
