<template>
  <div>
    <v-data-table :headers="headers" :items="groups" :loading="loading">
      <template v-slot:top>
        <v-row>
          <v-col>
            <v-btn color="success" @click="openModal">
              <v-icon>mdi-plus</v-icon>
              <span class="ml-1">Add Group</span>
            </v-btn>
          </v-col>
        </v-row>
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
import GroupModal from '@/components/Modals/GroupModal';
import { consoleError } from '@/helpers/logger';

export default {
  name: 'GroupsPage',
  data() {
    return {
      loading: false,
      showDialog: false,
      editModel: null,
      headers: [
        {
          text: 'Name',
          value: 'name',
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
    if (this.groups.length === 0) {
      this.fetchData();
    }
  },
  computed: {
    ...mapState(['groups']),
  },
  methods: {
    ...mapActions(['deleteGroup', 'fetchGroups']),
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchGroups();
        this.loading = false;
      } catch (err) {
        consoleError(err);
        this.loading = false;
        this.$root.notification.error(err?.response?.data?.message);
      }
    },
    edit(group) {
      this.$showModal(
        GroupModal,
        {
          group,
        },
        {
          close: this.onModalClose,
        },
      );
    },
    onModalClose() {
      this.editModel = null;
      this.showDialog = false;
    },
    openModal() {
      this.$showModal(
        GroupModal,
        {},
        {
          close: this.onModalClose,
        },
      );
    },
    deleteItem(group) {
      this.$showConfirmModal(
        {},
        {
          confirm: () => {
            this.deleteGroup(group);
          },
        },
      );
    },
  },
};
</script>

<style></style>
