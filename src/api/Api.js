import * as urljoin from 'url-join';
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
  async login(username, password) {
    let { access_token, token_type, expires_at } = await this.post('auth/login', {
      email: username,
      password
    });
    this.token = {
      hash: access_token,
      type: token_type,
      expiration: expires_at
    };

    this.axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;

    return true;
  }
  async signup(data) {
    return this.post('auth/signup', data);
  }
  async post(resource, data){
    return this.axios.post(resource, data);
  }
  async get(resource, id) {
    let url = resource;
    
    if (id) {
      id = ''+ id;
      url = urljoin(url, id);
    }
    
    return this.axios.get(url);
  }
  async put(resource, id, data) {
    let url = urljoin(resource, id);

    return this.axios.put(url, data);
  }
  async delete(resource, id) {

    let url = urljoin(resource, id);

    return this.axios.delete(url);
  }
}