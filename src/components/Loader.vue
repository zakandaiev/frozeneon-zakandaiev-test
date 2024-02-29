<script setup>
</script>

<template>
  <span class="loader" />
</template>

<style lang="scss" scoped>
.loader {
  width: 4rem;
  height: 4rem;
  border: 0.5rem solid rgb(var(--v-theme-primary));
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
