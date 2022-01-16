<template>
  <div>
    <v-data-table :headers="headers" :items="todos" :loading="loading">
      <template v-slot:top>
        <v-row>
          <v-col>
            <v-btn color="success" @click="openModal">
              <v-icon>mdi-plus</v-icon>
              <span class="ml-1">Add Task</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select hide-details outlined dense v-model="priority" :items="priorities" clearable label="Priority"></v-select>
          </v-col>
          <v-col>
            <v-select hide-details outlined dense v-model="groupId" :items="groups" clearable item-text="name" item-value="id" label="Group"></v-select>
          </v-col>
          <v-col>
            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  hide-details
                  outlined
                  dense
                  v-model="dateRange"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateRange" range @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.group`]="{ item }">
        {{ item.group.name }}
      </template>
      <template v-slot:[`item.group`]="{ item }">
        {{ item.group.name }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn s icon color="red accent-1">
          <v-icon size="20" @click="deleteItem(item)">mdi-delete</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="edit(item)">
          <v-icon size="20">mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TodoModal from '@/components/Modals/TodoModal';
import { consoleError } from '@/helpers/logger';
import { PRIORITIES } from '@/constants/todo';

export default {
  name: 'ActivesPage',
  data() {
    return {
      priorities: PRIORITIES,
      loading: false,
      groupId: null,
      priority: null,
      dateRange: null,
      headers: [
        {
          text: 'Content',
          value: 'content',
          sortable: false,
        },
        {
          text: 'Priority',
          value: 'priority',
          sortable: false,
        },
        {
          text: 'Group',
          value: 'group',
          sortable: false,
        },
        {
          text: 'Due Date',
          value: 'dueDate',
          sortable: false,
        },
        {
          value: 'actions',
          width: 150,
          sortable: false,
        },
      ],
    };
  },
  created() {
    if (this.todos.length === 0) {
      this.fetchData();
    }

    if (this.groups.length === 0) {
      this.fetchGroups();
    }
  },
  computed: {
    ...mapState(['todos', 'groups']),
    params() {
      const params = {};

      if (this.groupId) {
        params.groupId = this.groupId;
      }

      if (this.priority) {
        params.priority = this.priority;
      }

      if (this.dateRange) {
        [params.minDueDate, params.maxDueDate] = this.dateRange;
      }

      return params;
    },
  },
  methods: {
    ...mapActions(['deleteTodo', 'fetchTodos', 'fetchGroups']),
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchTodos({ params: this.params });
        this.loading = false;
      } catch (err) {
        consoleError(err);
        this.loading = false;
        this.$root.notification.error(err?.response?.data?.message);
      }
    },
    edit(todo) {
      this.$showModal(TodoModal, {
        todo,
        groups: this.groups,
      });
    },
    onModalClose() {
      this.editModel = null;
    },
    openModal() {
      this.$showModal(TodoModal, {
        groups: this.groups,
      });
    },
    deleteItem(todo) {
      this.$showConfirmModal(
        {},
        {
          confirm: () => {
            this.deleteTodo(todo);
          },
        },
      );
    },
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.fetchData();
      },
    },
  },
};
</script>

<style></style>
