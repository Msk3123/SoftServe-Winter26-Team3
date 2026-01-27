import { Outlet } from "react-router";
import styles from "./AdminTablePage.module.css"
import useQueryTable from "../../../../hooks/useQueryTable/useQueryTable";
import ControlPanel from "../../../../components/ControlPanel/ControlPanel";
import TableSceleton from "../../../../components/Table/TableSceleton/TableSceleton";
import Table from "../../../../components/Table/Table";
import type { BaseEntity, FetchFunction } from "../../../../types/api.types";
import type { ColumnDef } from "../../../../types/common.types";


interface AdminTablePageProps<T extends BaseEntity>{
    columns: ColumnDef<T>[];
    queryFn: FetchFunction<T>

}

const AdminTablePage = <T extends BaseEntity>({columns,queryFn}:AdminTablePageProps<T>)=>{
    
    const {data,pagination,sortParams,status,actions} = useQueryTable<T>(queryFn);

    let result;

    if(status.isLoading){
        result = <>
            <ControlPanel
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                handlePageChange={actions.setPage}
            />
            <TableSceleton columns={columns}/>
        </>
    }else if(status.error || !data){
        result = <div>Error</div>

    }else{

        result = <>
            <ControlPanel
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                handlePageChange={actions.setPage}
            />
            <Table
                data={data}
                columns={columns}
                sortParams={sortParams}
                handleSort={actions.toggleSort}
                pagination={pagination}
                handleDelete={actions.deleteItem}
            />
        </>
    }


    return(<div className={styles.container}>
                {result}
                <Outlet />
            </div>)
};

export default AdminTablePage;