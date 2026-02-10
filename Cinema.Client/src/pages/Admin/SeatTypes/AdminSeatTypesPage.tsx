import { Outlet, useNavigate} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import type { SeatType } from "../../../types/seatType.types";
import { deleteSeatType, getAllSeatTypes,getSeatTypeUsage } from "../../../api/seatTypeApi";
import { useCallback, useMemo } from "react";
import { ApiError, type DeleteFunction } from "../../../types/api.types";
import { handleError } from "../../../helpers/handleError";

const AdminSeatTypesPage = ()=>{

    const navigate = useNavigate();

    const {data,pagination,sortParams,status,actions} = useQueryTable<SeatType>(getAllSeatTypes);
    
    const columns:ColumnDef<SeatType>[] =useMemo(()=> [
        { key: "id", title: "№" },
        {key:"name",title:"Name"},
        {key:"basePrice",title:"Basic Price"}
    ],[]);

    const handleDelete:DeleteFunction = useCallback(async (id) => {
        try{
            const response = await getSeatTypeUsage(id);
            console.log(response.count)
    
            if (response.count > 0) {
                navigate(`${id}/delete`);
                //throw new ApiError(`Can't delete:${response} seats of this type have been identified`,409)
            } else {
                await deleteSeatType(id);
            }
        }catch(e){
            handleError(e,"Could not delete this seatType")
        }
    }, [navigate]);

    return (<>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    deleteFn={handleDelete} />
                <Outlet context={{createItem:actions.createItem, editItem:actions.editItem , refresh: actions.refresh}}/>
            </>)
};

export default AdminSeatTypesPage;