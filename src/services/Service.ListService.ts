import { SONG_LIST_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class SongListService {
    httpProvider = new HttpProvider();

    async createList(data: any) {
        return await this.httpProvider.post(SONG_LIST_ROUTE, data)
    }
    async getCurrentList() {
        return await this.httpProvider.get(`${SONG_LIST_ROUTE}/current`)
    }
    async getAllList() {
        return await this.httpProvider.get(SONG_LIST_ROUTE)
    }
    async getListByUser() {
        return await this.httpProvider.get(`${SONG_LIST_ROUTE}/userLists`);
    }
}