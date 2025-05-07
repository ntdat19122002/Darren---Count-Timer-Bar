<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="main">
    <div class="content">
      <Header></Header>
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    
        <div class="wrapper">
          <HelloWorld msg="You did it!" />
    
          <nav>
            <ui-nav-menu>
              <a @click="handleNavigation('dashboard')" href="/shopify/tiktok_pixel/dashboard" rel="home">Dasboard</a>
              <a @click="handleNavigation('pixel_management')" href="/about">Pixel
                Management</a>
              <a @click="handleNavigation('pixel_analytics')" href="/shopify/tiktok_pixel/pixel_analytics">Pixel
                analytics</a>
              <a @click="handleNavigation('setting')" href="/shopify/tiktok_pixel/setting">Setting</a>
            </ui-nav-menu>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>
      <RouterView />
    </div>

  </div>
</template>

<script>
import Header from './components/header/Header.vue'
export default {
  components:{Header}
}
</script>