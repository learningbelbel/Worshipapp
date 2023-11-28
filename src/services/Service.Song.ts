import { BaseService } from './Service.Base';

export class SongService extends BaseService{

    async getRandomSong(params: any) {
        return await this.http.getWithParams(this.env.SONG_ROUTE, params);
    }
    async getAllSong(){
        // fetch('https://www.primefaces.org/data/customers?').then((res) => res.json());
        return await this.http.get(this.env.SONG_ROUTE);
    }
}