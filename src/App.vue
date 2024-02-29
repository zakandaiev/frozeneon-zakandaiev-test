<script setup>
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <v-app>
    <div class="page-content pt-6">
      <v-container>
        <Search />
      </v-container>
    </div>

    <Footer />
  </v-app>
</template>

<style lang="scss">
@import "@/sass/main.scss";
</style>
