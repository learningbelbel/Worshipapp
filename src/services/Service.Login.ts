import { HttpProvider } from './HttpProvider';
import { LOGINROUTE } from '../config/Config.EndPoints'

export class LoginService {
    httpProvider = new HttpProvider();

    async post(data: any) {
        return await this.httpProvider.post(LOGINROUTE, data);
    }
}