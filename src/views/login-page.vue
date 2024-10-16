<template>
  <section class="login-page">
    <div class="login-card">
      <h5>Horzion</h5>
      <div v-if="!isLoggedIn && !isSignUp" class="login-form">
        <q-card-section class="column q-gutter-md">
          <q-input
            no-error-icon
            outlined
            v-model="email"
            hide-bottom-space
            :rules="[validEmail]"
            label="אימייל"
          />
          <q-input no-error-icon outlined v-model="password" label="סיסמה" type="password" />
          <q-btn label="התחבר" color="primary" @click="login" />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn color="blue-5" flat label="צור משתמש חדש" size="sm" @click="toggleSignUp" />
        </q-card-actions>
      </div>
      <div v-if="isLoggedIn && loggedInUser" class="logout-form">
        <q-card-section class="column q-gutter-md">
          <p>ברוך הבא, {{ loggedInUser.fullName }}</p>
        </q-card-section>
        <q-card-actions class="row">
          <q-btn flat label="התנתק" color="primary" @click="logout" />
        </q-card-actions>
      </div>
      <div v-if="!isLoggedIn && isSignUp" class="signup-form">
        <q-card-section class="column q-gutter-md">
          <q-input no-error-icon outlined v-model="fullName" label="שם מלא" />
          <q-input
            no-error-icon
            outlined
            v-model="email"
            hide-bottom-space
            :rules="[validEmail]"
            label="אימייל"
          />
          <q-input
            no-error-icon
            outlined
            v-model="password"
            :rules="[validPassword]"
            label="סיסמה"
            type="password"
            hide-bottom-space
            debounce="300"
          />
          <q-input
            no-error-icon
            outlined
            v-model="verifyPassword"
            :rules="[validVerifyPassword]"
            reactive-rules
            label="אמת סיסמא"
            type="password"
            hide-bottom-space
            debounce="300"
          />
          <q-btn label="הרשם" color="primary" @click="signUp" />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn label="יש לי כבר משתמש" color="blue-5" flat size="sm" @click="toggleSignUp" />
        </q-card-actions>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useUserStore } from '@/stores/user.store'

export default defineComponent({
  name: 'login-page',
  components: {},
  emits: {},
  props: {},
  data() {
    return {
      email: '',
      password: '',
      verifyPassword: '',
      fullName: '',
      isSignUp: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.authStore.isLoggedIn
    },
    loggedInUser() {
      return this.authStore.loggedInUser
    }
  },
  created() {
    this.authStore.getAuthenticatedUser()
  },
  methods: {
    async login() {
      try {
        await this.authStore.login({ email: this.email, password: this.password })
        this.resetFields()
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    async logout() {
      await this.authStore.logout()
    },
    toggleSignUp() {
      this.isSignUp = !this.isSignUp
      this.resetFields()
    },
    async signUp() {
      try {
        await this.userStore.createUser({
          email: this.email,
          password: this.password,
          fullName: this.fullName
        })
        await this.login()
        this.resetFields()
      } catch (error) {
        console.error('Sign up failed:', error)
      }
    },
    resetFields() {
      this.email = ''
      this.password = ''
      this.verifyPassword = ''
      this.fullName = ''
    },
    validEmail(val: string): boolean | string {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!emailRegex.test(val)) {
        return 'אימייל לא תקין'
      }
      return true
    },
    validPassword(val: string): boolean | string {
      if (val.length < 6) {
        return 'סיסמה חייבת להיות לפחות 6 תווים'
      }
      return true
    },
    validVerifyPassword(val: string): boolean | string {
      if (val !== this.password) {
        return 'הסיסמאות אינן תואמות'
      }
      return true
    }
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    return { authStore, userStore }
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  min-height: calc(100vh - 60px);

  .login-card {
    h5 {
      text-align: center;
      margin: 16px 8px;
    }
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}
</style>
