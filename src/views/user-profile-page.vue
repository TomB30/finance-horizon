<template>
  <section class="user-profile-page">
    <h4 class="page-title">האיזור האישי</h4>
    <div class="row items-center q-mb-md">
      <q-input dense outlined style="width: 300px" stack-label label="שם מלא" v-model="user.name" />
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="אימייל"
        v-model="user.email"
      />
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="מספר פלאפון"
        v-model="user.phone"
      />
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="כתובת"
        v-model="user.address"
      />
    </div>
    <div class="row items-center q-mb-md">
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="שכר חודשי"
        v-model="user.salary"
      />
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="תאריך לידה"
        type="date"
        v-model="user.birthDate"
      />
      <q-input
        dense
        outlined
        style="width: 300px"
        stack-label
        label="גיל פרישה"
        v-model="user.retirementAge"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'user-profile-page',
  components: {},
  emits: {},
  props: {},
  data() {
    return {
      user: {
        name: 'תום בכר',
        email: 'tomchick30@gmail.com',
        phone: '054-6838519',
        address: 'רחוב יפו 221 דירה 3 קומה 2 תל אביב',
        salary: 28000,
        birthDate: '1998-08-06',
        retirementAge: 67
      }
    }
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.user-profile-page {
  padding: 0 16px;
  .page-title {
    color: #16a085;
    margin: 8px 0;
  }
}

.row {
  gap: 16px;
}
</style>
