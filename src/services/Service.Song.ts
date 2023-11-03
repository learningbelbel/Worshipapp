import { SONG_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class SongService {
    httpProvider = new HttpProvider();

    async getRandomSong(params: any) {
        return await this.httpProvider.getWithParams(SONG_ROUTE, params);
    }
    async getAllSong(){
        // fetch('https://www.primefaces.org/data/customers?').then((res) => res.json());
        return await this.httpProvider.get(SONG_ROUTE);
    }
}