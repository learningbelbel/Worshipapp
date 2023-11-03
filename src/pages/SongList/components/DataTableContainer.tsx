import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongService } from "../../../services/Service.Song";
import { useState } from 'react';
import { useEffect } from 'react';
import { SongModel } from "../../../models/Model.Song";
import { RatingBarTemplate } from "../../../components/Component.RatingBarTemplate";
import { ChordTamplate } from "../../../components/Component.ChordTamplate";

export const DataTableContainer = () => {

    const songService = new SongService();

    const [songList, setSongList] = useState<SongModel[]>([]);
    const [listAmount, setListAmount] = useState(0);

    useEffect(() => {
        getSongService();
    }, [])

    const getSongService = async () => {
        const resp = await songService.getAllSong();
        setSongList(resp.data.result);
        setListAmount(resp.data.listCount)
    }

    const chordTemplate = (rowData: any) => {
        return <ChordTamplate rowData={rowData} />
    }

    const ratingBodyTemplate = (rowData: any, i: any) => {
        return <RatingBarTemplate rowData={rowData} i={i} amount={listAmount} />
    }
    return (
        <div className="card">
            <DataTable
                value={songList}
                paginator
                rows={20}>
                <Column field="name" header="Nombre" sortable />
                <Column field="chord" header="Nota" body={chordTemplate} sortable />
                <Column field="usage" header="Uso" body={ratingBodyTemplate} sortable />
            </DataTable>
        </div>
    )
}
