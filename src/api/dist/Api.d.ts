export declare class Api {
    baseUrl: string;
    axios: any;
    constructor();
    setBaseUrl(url: string): void;
    create(endpoint: string, data: object): void;
    read(endpoint: string, id?: number | string): void;
}
