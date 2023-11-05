import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongListService } from "../../../services/Service.ListService";
import { useState, useEffect } from 'react';
import { Button } from "primereact/button";

interface Props {
    setRandomDialogVisible: any;
    randomDialogVisible: boolean;
    setRegularDialogVisible: any;
    regularDialogVisible: boolean;
}

export const DisplayList = ({ setRandomDialogVisible, randomDialogVisible,
    setRegularDialogVisible, regularDialogVisible }: Props) => {

    const listService = new SongListService();

    const [currentSongList, setCurrentSongList] = useState<SongListModel>();

    useEffect(() => { getCurrentSongList() }, [])

    const getCurrentSongList = async () => {
        const list = await listService.getCurrentList();
        setCurrentSongList(list.data.result)
    }

    return (
        <div>
            <div className="content-header align-items-center mb-2 ">
                <h1>Listado Actual</h1>
                <div className="">
                    <Button className="mr-2" label="Random" onClick={() => setRandomDialogVisible(!randomDialogVisible)} />
                    <Button className="ml-2" label="Manual" onClick={() => setRegularDialogVisible(!regularDialogVisible)} />
                </div>
            </div>

            <div className="card">
                <DataTable
                    value={currentSongList?.songs}>
                    <Column field='name' header='Nombre' />
                    <Column field='chord' header='Nota' />
                </DataTable>
            </div>
        </div>
    )
}
