import { Outlet} from "react-router";
import  styles from  "./AdminSessionsPage.module.css"
import ControlPanel from "../../../components/ControlPanel/ControlPanel";
import Table from "../../../components/Table/Table";
import TableSceleton from "../../../components/Table/TableSceleton/TableSceleton";
import type { ReduserState } from "../../../features/DataList/reduser.types";
import useDataList from "../../../features/DataList/useDataList";
import { getAllSessions, type SessionShortDto } from "../../../api/sessionAPI";

const initialState: ReduserState<SessionShortDto>= {
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
    
    const {data:sessions,pagination,sortParams,status,actions} = useDataList<SessionShortDto>(getAllSessions,initialState);

    const headers = [
    { value: "id", visibleValue: "№" },
    { value: "movieTitle", visibleValue: "Movie" },
    { value: "sessionDate", visibleValue: "Date" },
    { value: "sessionTime", visibleValue: "Time" },
    { value: "hallName", visibleValue: "Hall" },
    { value: "posterUrl", visibleValue: "Poster" },
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
                    (status.error || !sessions)
                        ?
                    <div>Error</div>
                        :
                        
                    <Table
                        data={sessions}
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