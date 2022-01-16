import axios from 'axios';

class TodoService {
  constructor() {
    this.token = null;
    this._axios = axios.create({
      baseURL: process.env.TODO_SERVICE_URL || 'http://localhost:3000',
    });

    this._setupInterceptors();
  }

  _setupInterceptors() {
    this._axios.interceptors.request.use((config) => {
      this.token = this.token || localStorage.getItem('access_token');

      if (this.token) {
        config.headers.common['Authorization'] = `Bearer ${this.token}`;
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
    return this._axios.post(`/todo/${id}`);
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
    return this._axios.post(`/group/${id}`);
  }

  updateGroup(payload) {
    const { id, ...item } = payload;
    return this._axios.put(`/todo/${id}`, item);
  }
}

export default new TodoService();
