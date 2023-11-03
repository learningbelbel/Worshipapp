import { DataTable, DataTableExpandedRows } from "primereact/datatable"
import { useState } from 'react';
import { useEffect } from 'react';
import { SongListService } from "../../services/Service.ListService";
import { Column } from "primereact/column";
import { format, parseISO } from "date-fns";
import esLocale from 'date-fns/locale/es';

export const ListPage = () => {

    const listService = new SongListService();
    const [lists, setLists] = useState([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | any[]>([]);

    useEffect(() => {
        getLists()
    }, [])
    const getLists = async () => {
        const res = await listService.getAllList();
        setLists(res.data.result);
    }

    const dateTemplate = (rowData: any) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale });

        return <>{formatedDate}</>
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            < >
                {
                    data.songs.map((song: any, i: number) => {
                        return <li className="p-3" key={i}>{song.name}</li>
                    })
                }
            </>
        );
    };
    const allowExpansion = (rowData: any) => {
        return rowData.songs.length > 0;
    };

    return (
        <div className="page-container">
            <h2>Listados de Canciones</h2>

            <div className="card">
                <DataTable
                    value={lists}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="_id"
                    style={{ zIndex: '0' }}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="date" header="Fecha" body={dateTemplate} />
                </DataTable>
            </div>
        </div>
    )
}
