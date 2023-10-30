import { HttpProvider } from "./HttpProvider";
import { USER_ROUTE } from '../config/Config.EndPoints'

export class RegisterService {
    httpProvider = new HttpProvider();

    async createUser(data: any) {
        return await this.httpProvider.post(USER_ROUTE, data)
    }
}