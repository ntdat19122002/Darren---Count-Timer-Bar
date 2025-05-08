<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <div class="content">
      <nav>
        <ui-nav-menu>
          <a @click="handleNavigation('dashboard')" href="/" rel="home">Dasboard</a>
        </ui-nav-menu>
      </nav>
      
      <RouterView />
    </div>

  </div>
</template>

<script>
import Header from './components/header/Header.vue'
export default {
  components: { Header }
}
</script>