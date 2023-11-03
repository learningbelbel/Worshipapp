import { Column } from "primereact/column"
import { useState, useEffect } from 'react';
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { UserService } from '../../../services/Service.User';
import { format, parseISO } from "date-fns";
import esLocale from 'date-fns/locale/es';

interface Contribution {
    date: string;
    amount: number,
}

interface User {
    name: string;
    contributions?: Contribution[];
}

export const TableDisplay = () => {
    const userService = new UserService();

    const [products, setProducts] = useState<User[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    useEffect(() => {
        userService.getUserContributions().then((data) => {
            setProducts(data.data.result)
        });
    }, []);

    const allowExpansion = (rowData: User) => {
        return rowData.contributions!.length > 0;
    };

    const dateTemplate = (rowData: Contribution) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, MMMM d yyyy', { locale: esLocale });
        return <>{formatedDate}</>
    };

    const amountTemplate = (rowData: Contribution) => {

        return <>Q.{rowData.amount}</>
    }

    const rowExpansionTemplate = (data: User) => {
        return (
            <div className="p-0">
                <DataTable
                    value={data.contributions}>
                    <Column field="date" header="Fecha" body={dateTemplate} sortable></Column>
                    <Column field="amount" header="Monto" body={amountTemplate} ></Column>
                </DataTable>
            </div>
        );
    };


    return (
        <div className="card">
            <DataTable
                value={products}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id">
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Nombre" sortable></Column>
            </DataTable>
        </div>
    );
}
