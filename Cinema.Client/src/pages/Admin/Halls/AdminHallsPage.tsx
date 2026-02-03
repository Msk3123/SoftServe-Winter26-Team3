import { Outlet } from "react-router-dom";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { HallShort } from "../../../types/hall.types";
import { deleteHall, getAllHalls } from "../../../api/hallApi";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";

const AdminHallsPage = ()=>{

    const {data,pagination,sortParams,status,actions} = useQueryTable<HallShort>(getAllHalls);

    const columns:ColumnDef<HallShort>[] =  [
    { key: "id", title: "№" },
    { key: "hallName", title: "Hall Name" },
    { key: "capacity", title: "Capacity (Seats)" },
];
    return( <>
                <AdminTablePage
                columns={columns}
                tableData={{ data, pagination, sortParams, status }}
                tableActions={actions}
                deleteFn={deleteHall}/>
                <Outlet />
            </>)
};

export default AdminHallsPage;