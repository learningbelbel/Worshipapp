import { FinancesControl } from './components/FinancesControl';
import { ContributionPlan } from './components/ContributionPlan';
import { useAuthContext } from "../../context/Context.Auth";
import { SECRETARY, TREASURER } from '../../utils/Util.Constants';

export const ContributionsPage = () => {
    const { loggedUserData: { user } } = useAuthContext()!;

    return (
        <div className="page-container">
            {
                user.profile.includes(TREASURER.toString()) && (
                    <ContributionPlan />
                )
            }
            {
                user.profile.includes(SECRETARY) && (
                    <FinancesControl />
                )
            }
        </div>
    );
}
