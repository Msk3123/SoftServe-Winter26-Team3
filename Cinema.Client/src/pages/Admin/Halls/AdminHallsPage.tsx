import { Outlet} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { HallShort } from "../../../types/hall.types";
import { deleteHall, getAllHalls } from "../../../api/hallApi";

const AdminMoviesPage = ()=>{

    const columns:ColumnDef<HallShort>[] =  [
    { key: "id", title: "№" },
    { key: "hallName", title: "Hall Name" },
    { key: "capacity", title: "Capacity (Seats)" },
];
    return( <>
                <AdminTablePage columns={columns} queryFn={getAllHalls} deleteFn={deleteHall}/>
                <Outlet />
            </>)
};

export default AdminMoviesPage;