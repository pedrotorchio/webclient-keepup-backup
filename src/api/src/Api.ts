import { urljoin } from 'url-join';
import axios from 'axios';

export class Api {
  baseUrl: string = '';
  axios: any;

  constructor() {
    this.axios = axios;
  }

  setBaseUrl(url: string) {
    this.axios.baseUrl = url;
  }


  create(endpoint: string, data: object){

  }
  read(endpoint: string, id?: number | string) {
    let url = endpoint;
    
    if (id) {
      id = ''+ id;
      url = urljoin(url, id);
    }

    console.log(url);
  }
}