import { Column } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableRowToggleEvent } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { ContributionService } from '../../../services/Service.Contribution';
import { format, parseISO } from 'date-fns';
import esLocale from 'date-fns/locale/es'
interface User {
    name: string;
}

interface Contribution {
    _id: string;
    user: User;
    date: string,
    amount: 5,
}

export const TableComponent = () => {

    const contributionService = new ContributionService();

    const [customers, setCustomers] = useState<Contribution[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | Contribution[]>([]);

    useEffect(() => {
        contributionService.getContributionList().then((data) => {
            console.log(data.data.result);
            setCustomers(data.data.result)
        });
    }, []);

    const headerTemplate = (data: Contribution) => {
        console.log(data)
        return (
            <React.Fragment>
                <span className="vertical-align-middle ml-2 font-bold line-height-3">{data.user.name}</span>
            </React.Fragment>
        );
    };

    const dateTemplate = (rowData: Contribution) => {
        console.log(rowData)
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale});

        return <>{formatedDate}</>
    };

    const rowExpansionTemplate = (data: Contribution) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.amount}</h5>
                <DataTable
                    value={data}
                    paginator
                    rows={10}
                >
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={customers} rowGroupMode="subheader"
                groupRowsBy="user.name"
                sortMode="single"
                sortField="user.name"
                sortOrder={1}
                expandableRowGroups
                expandedRows={expandedRows}
                onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={headerTemplate}
                tableStyle={{ minWidth: '50rem' }}
                rowExpansionTemplate={rowExpansionTemplate}

            >
                {/* <Column field="" header="Nombre" style={{ width: '20%' }}></Column> */}
                {/* <Column field="date" header="Fecha" body={dateTemplate} style={{ width: '20%' }}></Column> */}
                {/* <Column field="amount" header="Monto" style={{ width: '20%' }}></Column> */}
                {/* <Column field="status" header="Estado" body={statusBodyTemplate} style={{ width: '20%' }}></Column> */}
            </DataTable>
        </div>
    );;
}
