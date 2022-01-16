<template>
  <v-dialog :value="true" width="500" @click:outside="close">
    <v-card>
      <v-card-title class="text-h6 grey lighten-2">{{ submitText }} Group</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field :rules="nameRules" label="Grouo Name" v-model="name"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" text small color="red" :disabled="loading" @click="close">Close</v-btn>
        <v-btn v-text="submitText" small color="primary" @click="submit" :loading="loading"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { consoleError } from '@/helpers/logger';

export default {
  name: 'GroupModal',
  props: {
    group: Object,
  },
  data() {
    return {
      valid: false,
      loading: false,
      name: null,
      nameRules: [(v) => (v && v.length >= 2 && v.length <= 50) || 'Group name must be between 2-50 characters long'],
    };
  },
  mounted() {
    if (this.group) {
      this.name = this.group.name;
    }
  },
  computed: {
    submitText() {
      return this.group ? 'Update' : 'Create';
    },
  },
  methods: {
    ...mapActions(['addGroup', 'updateGroup']),
    close() {
      if (!this.loading) {
        this.$emit('close');
        this.$modal.close();
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    async submit() {
      try {
        if (!this.validateForm()) {
          return;
        }

        this.loading = true;
        if (this.group) {
          await this.updateGroup({ id: this.group.id, name: this.name });
        } else {
          await this.addGroup({ name: this.name });
        }
        this.loading = false;
        this.close();
      } catch (err) {
        consoleError(err);
        this.loading = false;
        this.$root.notification.error(err?.response?.data?.message);
      }
    },
  },
};
</script>
