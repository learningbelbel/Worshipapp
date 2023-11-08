import { FINANCE_CONTROL_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class FinanceControlService {
    httpProvider = new HttpProvider()
    
    async createFinanceControl(data: any){
        return this.httpProvider.post(FINANCE_CONTROL_ROUTE, data);
    }
}