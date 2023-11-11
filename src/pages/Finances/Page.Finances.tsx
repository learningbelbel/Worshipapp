import { PrimaryTitle } from "../../styledComponents/PrimaryTitle"
import { ContributionPlan } from "./components/Component.ContributionPlan"
import { FinanceActivity } from "./components/Component.FinancesActivity"

export const FinancesPage = () => {
    //23386565:9755

    return (
        <div className="page-container">
            <div className="text-center mt-5">
                <PrimaryTitle title="FINANZAS"/>
            </div>
            <ContributionPlan/>
            <FinanceActivity/>
        </div>
    )
}
