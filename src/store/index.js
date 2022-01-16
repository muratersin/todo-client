import Vue from 'vue';
import Vuex from 'vuex';

import todoService from '@/services/todo.service';
import { ITEM_TYPE } from '@/constants/item';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    todos: [],
    groups: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    ADD_ITEM(state, payload) {
      const { itemType, item } = payload;
      state[itemType].push(item);
    },
    SET_ITEMS(state, payload) {
      const { itemType, items } = payload;
      state[itemType] = items;
    },
    REMOVE_ITEM(state, payload) {
      const { itemType, id } = payload;
      state[itemType] = state[itemType].filter((item) => item.id !== id);
    },
    UPDATE_ITEM(state, payload) {
      const { itemType, item } = payload;
      const index = state[itemType].findIndex((t) => t.id === item.id);
      Vue.set(state[itemType], index, item);
    },
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('access_token');
      commit('SET_USER', null);
    },
    async login({ dispatch }, payload) {
      const { data } = await todoService.login(payload);

      if (data.accessToken) {
        localStorage.setItem('access_token', data.accessToken);
      }

      await dispatch('fetchUser');
    },
    register(_, payload) {
      return todoService.register(payload);
    },
    async fetchUser({ commit }) {
      const { data } = await todoService.fetchUser();
      commit('SET_USER', data);
    },
    async fetchTodos({ commit }, payload) {
      const { params } = payload;
      const { data } = await todoService.fetchTodos(params);

      commit('SET_ITEMS', {
        itemType: ITEM_TYPE.TODO,
        items: data,
      });
    },
    async addTodo({ commit }, payload) {
      const { data } = await todoService.addTodo(payload);

      commit('ADD_ITEM', {
        itemType: ITEM_TYPE.TODO,
        item: data,
      });
    },
    async deleteTodo({ commit }, payload) {
      const { id } = payload;

      await todoService.deleteTodo(id);
      commit('REMOVE_ITEM', {
        itemType: ITEM_TYPE.TODO,
        id,
      });
    },
    async updateTodo({ commit }, payload) {
      const { data } = await todoService.updateTodo(payload);

      commit('UPDATE_ITEM', {
        itemType: ITEM_TYPE.TODO,
        item: data.data,
      });
    },
    async fetchGroups({ commit }) {
      const { data } = await todoService.fetchGroups();

      commit('SET_ITEMS', {
        itemType: ITEM_TYPE.GROUP,
        items: data,
      });
    },
    async addGroup({ commit }, payload) {
      const { data } = await todoService.addGroup(payload);

      commit('ADD_ITEM', {
        itemType: ITEM_TYPE.GROUP,
        item: data,
      });
    },
    async deleteGroup({ commit }, payload) {
      const { id } = payload;
      const { data } = await todoService.deleteGroup(id);

      commit('REMOVE_ITEM', {
        itemType: ITEM_TYPE.TODO,
        item: data.data,
      });
    },
    async updateGroup({ commit }, payload) {
      const { data } = await todoService.updateGroup(payload);

      commit('UPDATE_ITEM', {
        itemType: ITEM_TYPE.GROUP,
        item: data.data,
      });
    },
  },
  getters: {
    getIsAuthenticated(state) {
      return Boolean(state.user);
    },
  },
});
