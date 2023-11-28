// import { environment } from '../environment/Enviroment';
import { BaseService } from './Service.Base';

// const env = environment.END_POINTS.USER_ROUTE;
// console.log(env);
export class UserService extends BaseService {    
    async getUsers() {
        return this.http.get(`${this.env.USER_ROUTE}/list`);
    }
    async getUsersById() {
        return this.http.get(`${this.env.USER_ROUTE}/userInformation`);
    }
    async getUserContributions() {
        return this.http.get(`${this.env.USER_ROUTE}/finances/contribution`);
    }
    async getUsersFinancesControl() {
        return this.http.get(`${this.env.USER_ROUTE}/finances/control`);
    }
    async getFinancesByUser() {
        return this.http.get(`${this.env.USER_ROUTE}/userFinances`);
    }
    async getUserProfiles(userId: string) {
        return this.http.get(`${this.env.USER_ROUTE}/userProfiles/${userId}`);
    }
    async updateUserInformation(data: object){ 
        return this.http.put(`${this.env.USER_ROUTE}/userInformation`, data);
    }

    async updateProfilePicture(data: any) {
        return this.http.post(this.env.UPLOADS, data);
    }
}