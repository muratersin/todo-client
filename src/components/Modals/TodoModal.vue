<template>
  <v-dialog :value="true" width="500" persistent>
    <v-card>
      <v-card-title class="text-h6 grey lighten-2">{{ submitText }} Todo</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field :rules="nameRules" label="Content" v-model="content"></v-text-field>
          <v-select v-model="groupId" :items="groups" item-text="name" item-value="id" label="Group"></v-select>
          <v-row>
            <v-col>
              <v-select v-model="priority" :items="priorities" label="Priority"></v-select>
            </v-col>
            <v-col>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dueDate" label="Due Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dueDate" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
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
import { PRIORITIES } from '@/constants/todo';

export default {
  name: 'TodoModal',
  props: {
    todo: Object,
    groups: Array,
  },
  data() {
    return {
      priorities: PRIORITIES,
      dueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu: false,
      valid: false,
      loading: false,
      content: null,
      priority: null,
      groupId: null,
      nameRules: [(v) => (v && v.length >= 2 && v.length <= 50) || 'Group name must be between 2-50 characters long'],
    };
  },
  mounted() {
    if (this.todo) {
      this.content = this.todo.content;
      this.priority = Number(this.todo.priority);
      this.groupId = this.todo.group.id;
      this.dueDate = this.todo.dueDate;
    }
  },
  computed: {
    submitText() {
      return this.todo ? 'Update' : 'Create';
    },
  },
  methods: {
    ...mapActions(['addTodo', 'updateTodo', 'fetchGroups']),
    close() {
      this.$modal?.close();
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    async submit() {
      try {
        if (!this.validateForm()) {
          return;
        }

        const todo = {
          content: this.content,
          priority: this.priority,
          dueDate: this.dueDate,
          groupId: this.groupId,
        };

        this.loading = true;
        if (this.todo) {
          await this.updateTodo({ id: this.todo.id, ...todo });
        } else {
          await this.addTodo(todo);
        }
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
