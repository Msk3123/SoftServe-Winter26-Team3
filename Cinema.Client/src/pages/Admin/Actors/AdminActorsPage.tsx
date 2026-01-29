import { Outlet} from "react-router";
import { deleteActor, getAllActors } from "../../../api/actorApi";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ActorShort } from "../../../types/actor.types";
import type { ColumnDef } from "../../../types/common.types";
import styles from "./AdminActorsPage.module.css";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";

const AdminActorsPage = ()=>{
    
    const {data,pagination,sortParams,status,actions} = useQueryTable<ActorShort>(getAllActors);

    const columns: ColumnDef<ActorShort>[] = [
        {key:"id",title:"№"},
        {key:"photoUrl",title:"Photo",render:(item)=><img src={item.photoUrl} alt={`${item.firstName} ${item.lastName} photo`} className={styles.imageCell}/>},
        {key:"firstName",title:"First Name"},
        {key:"lastName",title:"Last Name"}
    ]

    return(
        <>
            <AdminTablePage
                columns={columns}
                tableData={{ data, pagination, sortParams, status }}
                tableActions={actions}
                deleteFn={deleteActor}/>
            <Outlet />
        </>
    )
};

export default AdminActorsPage;