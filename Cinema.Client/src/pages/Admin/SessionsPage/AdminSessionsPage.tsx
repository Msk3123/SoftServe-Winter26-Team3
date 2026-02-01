import { Outlet} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { SessionShort } from "../../../types/session.types";
import { deleteSession, getAllSessions } from "../../../api/sessionAPI";
import styles from "./AdminSessionsPage.module.css"
import { dateToDayFirst } from "../../../helpers/textHelpers";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";

const AdminMoviesPage : React.FC = ()=>{
    const {data,pagination,sortParams,status,actions} = useQueryTable<SessionShort>(getAllSessions);
    
    const columns:ColumnDef<SessionShort>[] = [
    { key: "id", title: "№" },
    { key: "posterUrl", title: "Poster",render:(item)=>{
        return <img src={item.posterUrl} alt={`${item.movieTitle} poster`} className={styles.imageCell}/>
    } },
    { key: "movieTitle", title: "Movie" },
    { key: "sessionDate", title: "Date" , render:(item)=>dateToDayFirst(new Date(item.sessionDate))},
    { key: "sessionTime", title: "Time", render:(item)=> item.sessionTime.slice(0,5)},
    { key: "hallName", title: "Hall" }
];
    return( <>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    deleteFn={deleteSession}/>
                <Outlet />
            </>)
};

export default AdminMoviesPage;