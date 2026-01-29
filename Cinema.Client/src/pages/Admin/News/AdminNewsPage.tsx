import { Outlet } from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { NewsShort } from "../../../types/news.types";
import type { ColumnDef } from "../../../types/common.types";
import { deleteNews, getAllNews } from "../../../api/newsApi";
import { dateToString } from "../../../helpers/textHelpers";
import styles from "./AdminNewsPage.module.css";

const AdminNewsPage = ()=>{
    
    const columns:ColumnDef<NewsShort>[] = [
        { key: "id", title: "№" },
        {key:"imageUrl",title:"Image",render:(item)=><img src={item.imageUrl} alt={`${item.title} image`} className={styles.imageCell}/>},
        {key:"title",title:"Title"},
        {key:"shortContent",title:"Content"},
        { key: "publishedDate", title: "Date" , render:(item)=>dateToString(new Date(item.publishedDate))}
    ];

    return (<>
                <AdminTablePage columns={columns} queryFn={getAllNews} deleteFn={deleteNews} />
                <Outlet />
            </>)
};

export default AdminNewsPage;