<template>
  <section class="app-side-nav column justify-between">
    <section>
      <div class="logo">
        <router-link to="/"> Horizon </router-link>
      </div>
      <nav>
        <ul>
          <li
            :class="$route.path === '/retirement' ? 'active' : ''"
            @click="$router.push('/retirement')"
          >
            <router-link to="/retirement">תכנון פנסיה</router-link>
          </li>
          <li
            :class="$route.path === '/personal-info' ? 'active' : ''"
            @click="$router.push('/personal-info')"
          >
            <router-link to="/personal-info">קרן השתלמות</router-link>
          </li>
          <li
            :class="$route.path === '/investment' ? 'active' : ''"
            @click="$router.push('/investment')"
          >
            <router-link to="/investment">השקעות נוספות</router-link>
          </li>
        </ul>
      </nav>
    </section>
    <nav>
      <ul>
        <li :class="$route.path === '/login' ? 'active' : ''" @click="$router.push('/login')">
          <router-link to="/login">{{ isLoggedIn ? 'התנתקות' : 'התחברות' }}</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-side-nav',
  components: {},
  emits: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  computed: {
    isLoggedIn() {
      return useAuthStore().isLoggedIn
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.app-side-nav {
  background-color: #f5f5f5;
  height: 100vh;
  width: 200px;
  border-left: 1px solid #e0e0e0;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    color: #16a085;
  }

  nav {
    padding: 8px;
    ul {
      list-style-type: none;
      padding: 0;

      li {
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        margin-bottom: 8px;
        transition:
          background-color 0.3s,
          color 0.3s;

        &:hover {
          background-color: #e0e0e0;
        }

        a.router-link-active {
          color: #16a085;
        }

        &.active {
          background-color: #e0e0e0;
        }
      }
    }
  }
}
</style>
