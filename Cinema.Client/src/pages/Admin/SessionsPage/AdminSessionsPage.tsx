import { Outlet} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { SessionShort } from "../../../types/session.types";
import { getAllSessions } from "../../../api/sessionAPI";

const AdminMoviesPage : React.FC = ()=>{
    
    const columns:ColumnDef<SessionShort>[] = [
    { key: "id", title: "№" },
    { key: "movieTitle", title: "Movie" },
    { key: "sessionDate", title: "Date" },
    { key: "sessionTime", title: "Time" },
    { key: "hallName", title: "Hall" },
    { key: "posterUrl", title: "Poster" },
];
    return( <>
                <AdminTablePage columns={columns} queryFn={getAllSessions}/>
                <Outlet />
            </>)
};

export default AdminMoviesPage;