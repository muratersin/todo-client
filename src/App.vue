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
        this.$router.push('actives');
      } catch (err) {
        this.$router.push('auth');
      }
    },
  },
};

// TODO: Get a generic method for getting field rules
// TODO: 404
// TODO: logger
// TODO: mixin for commons
// TODO: Table order

// FIXME: Auth Route
// FIXME: Logout
</script>
