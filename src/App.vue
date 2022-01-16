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
    this.fetchUserInfo();
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
    async fetchUserInfo() {
      try {
        await this.fetchUser();
      } catch (err) {
        console.log('Unauthorized');
      }
    },
  },
  watch: {
    user(user) {
      if (user) {
        this.$router.push('/actives');
      } else {
        this.$router.push('/auth');
      }
    },
  },
};
</script>
