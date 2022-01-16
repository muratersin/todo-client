<template>
  <v-app>
    <v-main>
      <v-container fluid class="public-layout">
        <slot></slot>
      </v-container>
    </v-main>
    <Notification ref="notification" />
  </v-app>
</template>

<script>
import Notification from '@/components/Notification';

export default {
  name: 'PublicLayout',
  components: { Notification },
  mounted() {
    this.$root.notification = this.$refs.notification;
  },
};
</script>

<style lang="scss">
.public-layout {
  height: 100%;
}
</style>
