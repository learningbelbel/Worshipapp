import { UPLOADS, USER_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class UserService {
    httpProvider = new HttpProvider()
    
    async getUsers(){
        return this.httpProvider.get(`${USER_ROUTE}/list`);
    }
    async getUsersById(){
        return this.httpProvider.get(`${USER_ROUTE}/userProfile`);
    }
    async getUserContributions(){
        return this.httpProvider.get(`${USER_ROUTE}/finances/contribution`);
    }
    async getUsersFinancesControl(){
        return this.httpProvider.get(`${USER_ROUTE}/finances/control`);
    }
    async getFinancesByUser(){
        return this.httpProvider.get(`${USER_ROUTE}/userFinances`);
    }
    async updateProfilePicture(data: any){
        return this.httpProvider.post(UPLOADS, data);
    }
}