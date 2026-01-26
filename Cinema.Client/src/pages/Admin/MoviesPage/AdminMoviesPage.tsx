import { Outlet} from "react-router";
import  styles from  "./AdminMoviesPage.module.css"
import ControlPanel from "../../../components/ControlPanel/ControlPanel";
import Table from "../../../components/Table/Table";
import useMovies from "../../../features/admin/Movies/useFetch";
import TableSceleton from "../../../components/Table/TableSceleton/TableSceleton";
import type { MovieShort } from "../../../types/Movie.types";
import type { ReduserState } from "../../../features/admin/Movies/reduser.types";
import { getAllMovies } from "../../../api/movieApi";

const initialState: ReduserState<MovieShort>= {
    data: undefined,
    loading: false,
    error: null,

    currentPage: 1,
    pageSize: 10,
    totalCount: 0,

    sortBy: "id",
    order: "asc",
};
const AdminMoviesPage : React.FC = ()=>{
    
    const {movies,pagination,sortParams,status,actions} = useMovies<MovieShort>(getAllMovies,initialState);

    const headers = [
        {value:"id",visibleValue:"№"},
        {value:"title",visibleValue:"Title"},
        {value:"posterUrl",visibleValue:"Poster"},
        {value:"releaseDate",visibleValue:"Release Date"},
    ]
    return(<div className={styles.container}>
                <ControlPanel
                    currentPage={pagination.current}
                    totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                    handlePageChange={actions.setPage}
                    />
                {status.isLoading
                    ?
                <TableSceleton headers={headers}/>
                    :
                    (status.error || !movies)
                        ?
                    <div>Error</div>
                        :
                        
                    <Table
                        data={movies}
                        headers={headers}
                        sortParams={sortParams}
                        handleSort={actions.toggleSort as (key: string) => void}
                        pagination={pagination}
                        handleDelete={actions.deleteItem}
                    />
                    }
                
                <Outlet />
            </div>)
};

export default AdminMoviesPage;