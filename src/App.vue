<template>
  <section class="app">
    <app-side-nav />
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
      height: calc(100vh - 60px);
      overflow: scroll;
    }
  }
}
</style>
