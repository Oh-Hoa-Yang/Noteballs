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
import { onMounted } from 'vue';
import NavBar from '@/components/Layout/NavBar.vue';
import { useStoreAuth } from './stores/storeAuth';

/* store */
const storeAuth = useStoreAuth()

/* mounted */
onMounted(() => {
  storeAuth.init()
})
</script>

<style>
@import '/node_modules/bulma/css/bulma.min.css';
</style>