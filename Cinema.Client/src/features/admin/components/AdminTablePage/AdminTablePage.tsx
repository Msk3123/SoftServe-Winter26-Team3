import styles from "./AdminTablePage.module.css"
import useQueryTable from "../../../../hooks/useQueryTable/useQueryTable";
import ControlPanel from "../../../../components/ControlPanel/ControlPanel";
import TableSceleton from "../../../../components/Table/TableSceleton/TableSceleton";
import Table from "../../../../components/Table/Table";
import type { BaseEntity, DeleteFunction, FetchFunction } from "../../../../types/api.types";
import type { ColumnDef } from "../../../../types/common.types";
import Button from "../../../../components/Button/Button";
import deleteItem from "../../deleteItem/deleteItem";
import { useMemo } from "react";
import Error from "../../../../components/Error/Error";


interface AdminTablePageProps<T extends BaseEntity>{
    columns: ColumnDef<T>[];
    queryFn: FetchFunction<T>;
    deleteFn?: DeleteFunction;
    isActions?:boolean;
}

const AdminTablePage = <T extends BaseEntity>({columns,queryFn,deleteFn,isActions=true}:AdminTablePageProps<T>)=>{
    
    const {data,pagination,sortParams,status,actions} = useQueryTable<T>(queryFn);

    const tableColumns = useMemo(() => {
        if (!isActions) return columns;

        let handleDelete: ((id: number | string) => Promise<void>) | null = null;
        
        if (deleteFn) {
            handleDelete = deleteItem({
                deleteAsync: deleteFn,
                deleteLocal: actions.deleteItem,
            });
        }

        const actionsColumn: ColumnDef<T> = {
            key: "actions",
            title: "",
            render: (item) => (
                <div className={styles.actionCell}>
                    <Button
                        to={`./${item.id}/edit`}
                        variant="fill"
                        bgColor="var(--color-primary)"
                        color="var(--text-main)"
                    >
                        Edit
                    </Button>
            
                {handleDelete && <Button
                        action={()=>handleDelete(item.id)}
                        variant="fill"
                        bgColor="var(--color-danger)"
                        color="var(--text-main)">
                            Delete
                    </Button>}
                </div>
            )
        };

        return [...columns, actionsColumn];
    }, [columns, isActions, deleteFn, actions]);

    let result;

    if(status.isLoading){
        result = <>
            <ControlPanel
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                handlePageChange={actions.setPage}
            />
            <TableSceleton columns={tableColumns}/>
        </>
    }else if(status.error || !data){
        result = <Error
                    title={"The request could not be completed"}
                    message={status.error??"We couldn’t load the data from the server. Please check your connection or try again later."}/>

    }else{

        result = <>
            <ControlPanel
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                handlePageChange={actions.setPage}
            />
            <Table
                data={data}
                columns={tableColumns}
                sortParams={sortParams}
                handleSort={actions.toggleSort}
                pagination={pagination}
            />
        </>
    }


    return(<div className={styles.container}>
                {result}
            </div>)
};

export default AdminTablePage;