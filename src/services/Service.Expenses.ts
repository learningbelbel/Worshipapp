import { DOMAIN } from "../config/Config.EndPoints";
import { HttpProvider } from "./HttpProvider";

export class IncomeService {
    http = new HttpProvider();

    async createIncome(data: any) {
        return await this.http.post(`${DOMAIN}/incomes`, data)
    }
}