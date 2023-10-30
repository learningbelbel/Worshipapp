import axios from "axios";

export class HttpProvider {

    post(url: string, data: any) {
        return axios.post(url, data)
    }
    get(url: string) {
        return axios.get(url)
    }
    getWithParams(url: string, params: any){
        return axios.post(url, params);
    }
}