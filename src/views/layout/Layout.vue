<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list v-if="user">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ user.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link v-for="item in navigationItems" :key="item.to" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="px-2 py-2">
          <v-btn block color="warning" elevation="0" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
    <Notification ref="notification" />
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notification from '@/components/Notification';

export default {
  name: 'Layout',
  data() {
    return {
      navigationItems: [
        { title: 'Actives', to: '/actives', icon: 'mdi-format-list-numbered' },
        { title: 'Completeds', to: '/completeds', icon: 'mdi-check-outline' },
        { title: 'Groups', to: '/groups', icon: 'mdi-group' },
      ],
    };
  },
  components: { Notification },
  mounted() {
    this.$root.notification = this.$refs.notification;
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
