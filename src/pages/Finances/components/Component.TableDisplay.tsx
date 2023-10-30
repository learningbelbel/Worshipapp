import { Column } from "primereact/column"
import { useState, useEffect} from 'react';
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { ProductService } from "../../../services/DataService";

interface Order {
    date: string;
    amount: number,
    customer: string;
}

interface Product {
    name: string;
    orders?: Order[];
}

export const TableDisplay = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    useEffect(() => {
        ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data));
    }, []);

    const allowExpansion = (rowData: Product) => {
        return rowData.orders!.length > 0;
    };

    const rowExpansionTemplate = (data: Product) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.name}</h5>
                <DataTable
                    value={data.orders}
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
            <DataTable
                value={products}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                tableStyle={{ minWidth: '60rem' }}
            >
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Name" sortable />
            </DataTable>
        </div>
    );
}
