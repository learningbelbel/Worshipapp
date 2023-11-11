import { FinancesControl } from './FinancesControl';
import { PlanDisplay } from './components/Component.ContributionPlan';
import { useAuthContext } from "../../context/Context.Auth";

export const ContributionsPage = () => {
    const { loggedUserData: { user } } = useAuthContext()!;

    return (
        <div className="page-container">
            <div className="page-content">
                {
                    user.profile.includes('TREASURER') && (
                        <PlanDisplay />
                    )
                }
                {
                    user.profile.includes('SECRETARY') && (
                        <FinancesControl />
                    )
                }
            </div>
        </div>
    );
}
