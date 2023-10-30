import { CONTRIBUTION_ROUTE } from '../config/Config.EndPoints';
import { HttpProvider } from './HttpProvider';

export class ContributionService {
    httpProvider = new HttpProvider();

    async createContribution(data: any) {
        return await this.httpProvider.post(`${CONTRIBUTION_ROUTE}/create`, data)
    }
    async getContributionList(){
        return await this.httpProvider.get(`${CONTRIBUTION_ROUTE}/get`)
    }
    getCustomersMedium() {
        return Promise.resolve(this.getContributionList());
    }
}