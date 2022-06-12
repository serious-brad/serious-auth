import axios from "axios";
import { makeAutoObservable } from "mobx"
import { createContext } from "react";
import { baseURL } from "../http";
import { login, logout, getUsers, register } from "../services";

class Store {
  user = null;
  loggedIn = false;
  users = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user) {
    this.user = user;
  }

  setAuth(value) {
    this.loggedIn = value;
  }

  setUsers(users) {
    this.users = users;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async getLogin(email, password) {
    const data = await login(email, password);

    localStorage.setItem('token', data.accessToken);
    console.log('%cindex.js line:30 this', 'color: white; background-color: #007acc;', this);
    this.setAuth(true);
    this.setUser(data.user);
  }

  async register(user) {
    const data = await register(user);

    localStorage.setItem('token', data.accessToken);
    this.setAuth(true);
    this.setUser(data.user);
  }

  async getLogout(email, password) {
    await logout(email, password);
    localStorage.removeItem('token');

    this.setAuth(false);
    this.setUser(null);
  }

  async getAllUsers() {
    if (this.loggedIn) {
      const usersData = await getUsers();
      this.setUsers(usersData);
    }
  }

  async checkAuth() {
    this.setIsLoading(true);

    try {
      const res = await axios.get(`${baseURL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.error(e.response.data);
    } finally {
      this.setIsLoading(false);
    }
  }
}

export const store = new Store();
export const Context = createContext({ store });
