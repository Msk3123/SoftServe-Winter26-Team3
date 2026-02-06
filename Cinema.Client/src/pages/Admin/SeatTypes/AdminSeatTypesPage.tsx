import { Outlet } from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import type { SeatType } from "../../../types/seatType.types";
import { deleteSeatType, getAllSeatTypes } from "../../../api/seatTypeApi";

const AdminSeatTypesPage = ()=>{

    const {data,pagination,sortParams,status,actions} = useQueryTable<SeatType>(getAllSeatTypes);
    
    const columns:ColumnDef<SeatType>[] = [
        { key: "id", title: "№" },
        {key:"name",title:"Name"},
        {key:"basePrice",title:"Basic Price"}
    ];

    return (<>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    deleteFn={deleteSeatType} />
                <Outlet context={{createItem:actions.createItem, editItem:actions.editItem}}/>
            </>)
};

export default AdminSeatTypesPage;