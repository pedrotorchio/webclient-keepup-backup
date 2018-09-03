import * as urljoin from 'url-join';
import axios from 'axios';

export class Api {

  constructor() {
    this.previousResponse = null;
    this.baseUrl = "";
    this.axios = axios.create();
    this.axios.interceptors.response.use(this.responseInterceptor.bind(this), this.responseErrorInterceptor.bind(this));    
  }

  setBaseUrl(url) {
    this.axios.defaults.baseURL = url;

  }
  async login(username, password) {
    let { access_token, token_type, expires_at } = await this.create('auth/login', {
      email: username,
      password
    });
    
    this.axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;

    return true;
  }
  async create(resource, data){
    return this.axios.post(resource, data);
  }
  async read(resource, id) {
    let url = resource;
    
    if (id) {
      id = ''+ id;
      url = urljoin(url, id);
    }
    
    return this.axios.get(url);
  }
  async update(resource, id, data) {
    let url = urljoin(resource, id);

    return this.axios.put(url, data);
  }
  async delete(resource, id) {

    let url = urljoin(resource, id);

    return this.axios.delete(url);
  }

  responseInterceptor(response) {
    this.previousResponse = response;
    
    const { data } = response;

    return data;
  }
  responseErrorInterceptor({ response: { status, statusText, data } }) {
    throw {
      status,
      statusText,
      data
    };
  }
}