<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PublicLayout from '@/views/layout/PublicLayout';
import Layout from '@/views/layout/Layout';

export default {
  name: 'App',
  created() {
    this.fetchUserAndNavigate();
  },
  computed: {
    ...mapState(['user']),
    layoutComponent() {
      const layout = this.$route.meta?.layout;
      if (layout === 'public') {
        return PublicLayout;
      }
      return Layout;
    },
  },
  methods: {
    ...mapActions(['fetchUser']),
    async fetchUserAndNavigate() {
      try {
        await this.fetchUser();
      } catch (err) {
        this.$router.push('auth');
      }
    },
  },
  watch: {
    user() {
      if (!this.user) {
        this.$router.push('auth');
      }
    },
  },
};
</script>
