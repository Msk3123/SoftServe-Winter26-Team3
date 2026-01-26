import { Outlet} from "react-router";
import  styles from  "./AdminHallsPage.module.css"
import ControlPanel from "../../../components/ControlPanel/ControlPanel";
import Table from "../../../components/Table/Table";
import TableSceleton from "../../../components/Table/TableSceleton/TableSceleton";
import type { ReduserState } from "../../../features/DataList/reduser.types";
import useDataList from "../../../features/DataList/useDataList";
import { getAllHalls, type HallShortDto } from "../../../api/HallApi";

const initialState: ReduserState<HallShortDto>= {
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
    
    const {data : movies,pagination,sortParams,status,actions} = useDataList<HallShortDto>(getAllHalls,initialState);

    const headers =  [
    { value: "id", visibleValue: "№" },
    { value: "hallName", visibleValue: "Hall Name" },
    { value: "capacity", visibleValue: "Capacity (Seats)" },
];
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