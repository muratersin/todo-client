<template>
  <div class="home-page">
    <div>
      <div class="mb-2 px-4">TodoApp</div>
      <v-progress-linear indeterminate color="green darken-2"></v-progress-linear>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HomePage',
  created() {
    this.fetchUserAndNavigate();
  },
  methods: {
    ...mapActions(['fetchUser']),
    async fetchUserAndNavigate() {
      try {
        await this.fetchUser();
        this.$router.push('todo');
      } catch (err) {
        this.$router.push('auth');
      }
    },
  },
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
