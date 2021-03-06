import axios from 'axios';

class TodoService {
  constructor() {
    this._axios = axios.create({
      baseURL: process.env.VUE_APP_TODO_SERVICE_URL || 'http://localhost:3000',
    });

    this._setupInterceptors();
  }

  _setupInterceptors() {
    this._axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
  }

  login(payload) {
    return this._axios.post('/login', payload);
  }

  register(payload) {
    return this._axios.post('/register', payload);
  }

  fetchUser() {
    return this._axios.get('/user');
  }

  addTodo(payload) {
    return this._axios.post('/todo', payload);
  }

  updateTodo(payload) {
    const { id, ...item } = payload;
    return this._axios.patch(`/todo/${id}`, item);
  }

  deleteTodo(id) {
    return this._axios.delete(`/todo/${id}`);
  }

  fetchTodos(params = {}) {
    return this._axios.get('/todo', { params });
  }

  fetchGroups() {
    return this._axios.get('/group');
  }

  addGroup(payload) {
    return this._axios.post('/group', payload);
  }

  deleteGroup(id) {
    return this._axios.delete(`/group/${id}`);
  }

  updateGroup(payload) {
    const { id, ...item } = payload;
    return this._axios.put(`/group/${id}`, item);
  }
}

export default new TodoService();
