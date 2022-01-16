<template>
  <v-snackbar :color="color" :timeout="3000" v-model="showSnackbar" bottom right>
    <v-icon left>{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      showSnackbar: false,
      message: '',
      color: 'success',
      icon: 'mdi-check',
    };
  },
  methods: {
    success(message) {
      this.message = message;
      this.color = 'success';
      this.icon = 'mdi-check';
      this.showSnackbar = true;
    },
    error(message) {
      this.message = message || 'Something went wrong';
      this.color = 'error';
      this.icon = 'mdi-alert-octagon';
      this.showSnackbar = true;
    },
    warning(message) {
      this.message = message;
      this.color = 'warning';
      this.icon = 'mdi-alert';
      this.showSnackbar = true;
    },
    info(message) {
      this.message = message;
      this.color = 'info';
      this.icon = 'mdi-information';
      this.showSnackbar = true;
    },
  },
};
</script>
