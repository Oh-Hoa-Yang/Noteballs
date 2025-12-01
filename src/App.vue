<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>

</template>

<script setup>
/* 
  imports 
*/
import NavBar from '@/components/Layout/NavBar.vue';
</script>

<style>
@import '/node_modules/bulma/css/bulma.min.css';
</style>