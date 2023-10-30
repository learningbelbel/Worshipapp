import { USER_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class UserService {
    httpProvider = new HttpProvider()
    
    async getUsers(){
        return this.httpProvider.get(`${USER_ROUTE}/list`);
    }
}