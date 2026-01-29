import { Outlet} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { SessionShort } from "../../../types/session.types";
import { deleteSession, getAllSessions } from "../../../api/sessionAPI";
import styles from "./AdminSessionsPage.module.css"
import { dateToString } from "../../../helpers/textHelpers";

const AdminMoviesPage : React.FC = ()=>{
    
    const columns:ColumnDef<SessionShort>[] = [
    { key: "id", title: "№" },
    { key: "movieTitle", title: "Movie" },
    { key: "sessionDate", title: "Date" , render:(item)=>dateToString(new Date(item.sessionDate))},
    { key: "sessionTime", title: "Time", render:(item)=> item.sessionTime.slice(0,5)},
    { key: "hallName", title: "Hall" },
    { key: "posterUrl", title: "Poster",render:(item)=>{
        return <img src={item.posterUrl} alt={`${item.movieTitle} poster`} className={styles.imageCell}/>
    } },
];
    return( <>
                <AdminTablePage columns={columns} queryFn={getAllSessions} deleteFn={deleteSession}/>
                <Outlet />
            </>)
};

export default AdminMoviesPage;