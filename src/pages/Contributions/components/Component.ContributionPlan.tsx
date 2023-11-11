import { Column } from "primereact/column"
import { useState, useEffect } from 'react';
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { UserService } from '../../../services/Service.User';
import { Button } from "primereact/button";
import { ContributionCreation } from "./Component.CreateContribution";
import { ContributionTables } from "../../../components/Component.ContributionTable";
import { PrimaryTitle } from "../../../styledComponents/PrimaryTitle";
import { FinancesCreation } from "./Component.FinancesCreation";

interface Contribution {
    date: string;
    amount: number,
}

interface User {
    name: string;
    contributions?: Contribution[];
}

export const PlanDisplay = () => {

    const userService = new UserService();

    const [userData, setUserDat] = useState<User[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const [dialogVisibility, setDialogVisibility] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const resp = await userService.getUserContributions();
        if (resp.status === 200) {
            setUserDat(resp.data.result)
        }
    }

    const allowExpansion = (rowData: User) => {
        return rowData.contributions!.length > 0;
    };

    const rowExpansionTemplate = (data: User) => {
        return (
            <div className="p-0">
                <ContributionTables data={data.contributions} />
            </div>
        );
    };

    return (
        <div className="mb-2">

            <FinancesCreation/>
    
            <div className="card">
                <div className="page-header">
                    <PrimaryTitle title="Plan 5" />
                    <Button
                        className='header-btn'
                        label="Nuevo"
                        onClick={() => setDialogVisibility(true)} />
                </div>
                <DataTable
                    value={userData}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id">
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="name" header="Nombre" sortable></Column>
                </DataTable>
            </div>
            <ContributionCreation
                dialogVisibility={dialogVisibility}
                setDialogVisibility={setDialogVisibility} />
        </div>
    );
}
