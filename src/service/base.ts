import { Params } from '@/types';
import Axios, { RawAxiosRequestHeaders } from 'axios';

class HttpClient {
    static _instance: HttpClient | null = null;

    private _accessToken: string;

    private constructor() {
        this._accessToken = '';
    }

    static instance(): HttpClient  {
        if (!HttpClient._instance) {
            HttpClient._instance = new HttpClient();
        }

        return HttpClient._instance;
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(token: string) {
        this._accessToken = token;
    }

    prepareHeader = (headers: RawAxiosRequestHeaders = {}): RawAxiosRequestHeaders => {
        if (this._accessToken) return headers;

        return {
            ...headers,
            Authorization: `Beareer ${this._accessToken}`,
        };
    }

    get = async <T>(url: string, params: Params = {}, headers: RawAxiosRequestHeaders = {}): Promise<T> => {
        const { data } = await Axios.get(url, { params, headers: this.prepareHeader(headers) });
        return data;
    }

    post = async <T>(url: string, body: any = {}, params: Params = {}, headers: RawAxiosRequestHeaders = {}): Promise<T> => {
        const { data } = await Axios.post(url, body, { params, headers: this.prepareHeader(headers) });
        return data;
    }

    put = async <T>(url: string, body: any, params: Params = {}, headers: RawAxiosRequestHeaders = {}): Promise<T> => {
        const { data } = await Axios.put(url, body, { params, headers: this.prepareHeader(headers) });
        return data;
    }

    delete = async (url: string, params: Params = {}, headers: RawAxiosRequestHeaders = {}) => {
        await Axios.delete(url, { params, headers: this.prepareHeader(headers) });
    }
}

export const httpClient = HttpClient.instance();
