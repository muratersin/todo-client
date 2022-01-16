<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cancel">
          {{ cancelText }}
        </v-btn>
        <v-btn color="green darken-1" text @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',
  data() {
    return {
      dialog: true,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Confirm',
    },
    text: {
      type: String,
      default: 'Are you sure?',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.dialog = false;
      this.$modal.close();
    },
    cancel() {
      this.$emit('cancel');
      this.dialog = false;
      this.$modal.close();
    },
  },
};
</script>
