import { DOMAIN } from "../config/Config.EndPoints";
import { HttpProvider } from "./HttpProvider";


export class FinancialRecords {
    httpProvider = new HttpProvider();

    async getPlanContributionTotal(){
        return await this.httpProvider.get(`${DOMAIN}/contribution/total`);
    }

    async getTotalIncomes(){
        return await this.httpProvider.get(`${DOMAIN}/incomes/total`);
    }

    async getTotalExpenses(){
        return await this.httpProvider.get(`${DOMAIN}/expenses/total`);
    }
}