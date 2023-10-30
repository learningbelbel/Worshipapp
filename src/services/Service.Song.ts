import { SONG_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class SongService {
    httpProvider = new HttpProvider();

    async getRandomSong(params: any) {
        return await this.httpProvider.getWithParams(SONG_ROUTE, params);
    }
    async getAllSong(){
        return await this.httpProvider.get(SONG_ROUTE);
    }
}