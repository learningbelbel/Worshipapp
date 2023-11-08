import { Column } from "primereact/column"
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable"
import { useState } from "react";
import { TableTemplate } from "../../../components/Component.TableTemplate";

export const TitheControl = ({ user }: any) => {

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    const allowExpansion = (rowData: any) => {
        return rowData.tithes!.length > 0;
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-0">
                <TableTemplate data={data.tithes} timeHeader={"Mes"} timeField="month" />
            </div>
        );
    };

    return (
        <div className="card mb-2">
            <div className="page-header">
                <h1>Control de Diezmos</h1>
            </div>
            <DataTable
                value={user}
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
