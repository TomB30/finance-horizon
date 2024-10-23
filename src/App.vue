<template>
  <section class="app">
    <app-side-nav v-if="!$route.meta.hideMenu" />
    <main class="app-content">
      <app-header v-if="$route.meta.requiresAuth" />
      <div class="page">
        <RouterView />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppSideNav } from './components/app-side-nav'
import { AppHeader } from './components/app-header'
import { useAuthStore } from './stores/auth.store'

export default defineComponent({
  name: 'App',
  components: {
    AppSideNav,
    AppHeader
  },
  async created() {
    await useAuthStore().getAuthenticatedUser()
  },
  computed: {
    mainHeight(): string {
      return `calc(100vh - ${this.$route.meta.requiresAuth ? 60 : 0}px)`
    }
  }
})
</script>

<style lang="scss" scoped>
.app {
  display: flex;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    .page {
      height: v-bind(mainHeight);
      overflow: scroll;
    }
  }
}
</style>
