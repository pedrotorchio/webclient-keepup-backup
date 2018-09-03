import { urljoin } from 'url-join';
import axios from 'axios';

export class Api {
    constructor() {
        this.baseUrl = '';
        this.axios = axios;
    }
    setBaseUrl(url) {
        this.axios.baseUrl = url;
    }
    create(endpoint, data) {
    }
    read(endpoint, id) {
        let url = endpoint;
        if (id) {
            id = '' + id;
            url = urljoin(url, id);
        }
        console.log(url);
    }
}
//# sourceMappingURL=Api.js.map