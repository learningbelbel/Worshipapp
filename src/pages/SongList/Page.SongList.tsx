import { DataTableContainer } from './components/DataTableContainer';

export const SongListPage = () => {

    return (
        <div className='page-container'>
            <div className="card mb-2">
                <h2>Listado de Canciones</h2>
            </div>
            <DataTableContainer />
        </div>
    )
}
