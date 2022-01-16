<template>
  <div class="home-page">
    <div>
      <div class="mb-2 px-4"><AppLogo /></div>
      <v-progress-linear indeterminate color="green darken-2"></v-progress-linear>
    </div>
  </div>
</template>

<script>
import AppLogo from '../components/AppLogo.vue';
export default {
  name: 'HomePage',
  components: { AppLogo },
};
</script>

<style lang="scss">
.home-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
