import { DataTableContainer } from './components/DataTableContainer';

export const SongListPage = () => {

    return (
        <div className='page-container'>
            <div className="col-12 content-header">
                <h2>Listado de Canciones</h2>
            </div>
            <DataTableContainer />
        </div>
    )
}
