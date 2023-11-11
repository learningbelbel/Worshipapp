import { DOMAIN } from "../config/Config.EndPoints";
import { HttpProvider } from "./HttpProvider";

export class ExpensesService {

    http = new HttpProvider();

    async createExpense(data: any) {
        return await this.http.post(`${DOMAIN}/expenses`, data)
    }

}