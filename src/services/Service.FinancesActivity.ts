import { DOMAIN } from "../config/Config.EndPoints";
import { HttpProvider } from "./HttpProvider";

export class FinancesActivity {
    http = new HttpProvider();

    async getActivities(){
        return this.http.get(`${DOMAIN}/activities`)
    }
}