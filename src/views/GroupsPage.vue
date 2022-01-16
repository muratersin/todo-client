<template>
  <v-data-table :headers="headers" :items="groups" :loading="loading" v-model="selecteds" single-select>
    <template v-slot:top>
      <v-row>
        <v-col>
          <v-btn small color="success">
            <v-icon>mdi-plus</v-icon>
            <span class="ml-1">Add</span>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'GroupsPage',
  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Name',
          value: 'name',
          width: 400,
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.fetchGroups();
  },
  computed: {
    ...mapState(['groups']),
  },
  methods: {
    ...mapActions(['addGroup', 'deleteGroup', 'updateGroup', 'fetchGroups']),
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchGroups();
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
