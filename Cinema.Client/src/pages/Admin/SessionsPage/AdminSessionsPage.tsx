import { Outlet } from "react-router-dom";
import  styles from  "./AdminSessionsPage.module.css"
import { Outlet} from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import type { SessionShort } from "../../../types/session.types";
import { deleteSession, getAllSessions } from "../../../api/sessionAPI";
import styles from "./AdminSessionsPage.module.css"
import { dateToDayFirst } from "../../../helpers/textHelpers";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";

const AdminSessionsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminSessionsPage
                <Outlet />
            </div>)
};

export default AdminSessionsPage;