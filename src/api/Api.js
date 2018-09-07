import axios from 'axios';
import { responseInterceptor, responseErrorInterceptor } from './interceptors';

export class Api {

  constructor() {
    this.previousResponse = null;
    this.baseUrl = "";
    this.token = {};
    this.axios = axios.create();
    this.axios.interceptors.response.use(responseInterceptor.bind(this), responseErrorInterceptor.bind(this));
  }

  setBaseUrl(url) {
    this.axios.defaults.baseURL = url;
  }
  getTokenData() {
    return this.token;
  }
  setAuthorizationToken(data) {
    // hash
    // type
    // expiration

    data.type  = data.type || 'Bearer';
    this.token = data;
    this.axios.defaults.headers.common["Authorization"] = `${data.type} ${data.hash}`;
  }
  async login(username, password) {
    let { access_token, token_type, expires_at } = await this.post('auth/login', {
      email: username,
      password
    });
    const token = {
      hash: access_token,
      type: token_type,
      expiration: expires_at
    };

    return token;
  }
  async signup(data) {
    return this.post('auth/signup', data);
  }
  async post(resource, data){
    return this.axios.post(resource, data);
  }
  async get(resource) {
    let url = resource;
    
    return this.axios.get(url);
  }
  async put(resource, data) {
    let url = resource;

    return this.axios.put(url, data);
  }
  async delete(resource) {

    let url = resource;

    return this.axios.delete(url);
  }
}