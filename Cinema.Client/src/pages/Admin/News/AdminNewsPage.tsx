import { Outlet } from "react-router-dom";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { NewsShort } from "../../../types/news.types";
import type { ColumnDef } from "../../../types/common.types";
import { deleteNews, getAllNews } from "../../../api/newsApi";
import { dateToDayFirst } from "../../../helpers/textHelpers";
import styles from "./AdminNewsPage.module.css";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";

const AdminNewsPage = ()=>{

    const {data,pagination,sortParams,status,actions} = useQueryTable<NewsShort>(getAllNews);
    
    const columns:ColumnDef<NewsShort>[] = [
        { key: "id", title: "№" },
        {key:"imageUrl",title:"Image",render:(item)=><img src={item.imageUrl} alt={`${item.title} image`} className={styles.imageCell}/>},
        {key:"title",title:"Title"},
        {key:"shortContent",title:"Content"},
        { key: "publishedDate", title: "Date" , render:(item)=>dateToDayFirst(new Date(item.publishedDate))}
    ];

    return (<>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    deleteFn={deleteNews} />
                <Outlet context={{createItem:actions.createItem,editItem:actions.editItem}}/>
            </>)
};

export default AdminNewsPage;