import styles from "./AdminTablePage.module.css"
import ControlPanel from "../../../../components/ControlPanel/ControlPanel";
import TableSceleton from "../../../../components/Table/TableSceleton/TableSceleton";
import Table from "../../../../components/Table/Table";
import type { BaseEntity, DeleteFunction} from "../../../../types/api.types";
import type { ColumnDef } from "../../../../types/common.types";
import Button from "../../../../components/Button/Button";
import deleteItem from "../../deleteItem/deleteItem";
import { useMemo } from "react";
import Error from "../../../../components/Error/Error";


interface AdminTablePageProps<T extends BaseEntity>{
    columns: ColumnDef<T>[];
    deleteFn?: DeleteFunction;
    isActions?:boolean;
    isCreate?:boolean;
    tableData:{
        data: readonly T[] | undefined;
        pagination: {
            current: number;
            total: number;
            pageSize: number;
        };
        status: {
            isLoading: boolean;
            error: string | null;
        };
        sortParams: {
            sortBy: keyof T;
            order: "asc" | "desc";
        };
    };
    tableActions: {
        setPage: (page: number) => void;
        setPageSize: (size: number) => void;
        setSort: (sortBy: keyof T, order: "asc" | "desc") => void;
        setData: (items: readonly T[]) => void;
        createItem: (item: T) => void;
        deleteItem: (id: number | string) => void;
        toggleSort: (key: keyof T) => void;
    };
}

const AdminTablePage = <T extends BaseEntity>({columns,deleteFn,isActions=true,tableData,tableActions,isCreate=true}:AdminTablePageProps<T>)=>{
    
    const {data,pagination,sortParams,status} = tableData;

    const tableColumns = useMemo(() => {
        if (!isActions) return columns;

        let handleDelete: ((id: number | string) => Promise<void>) | null = null;
        
        if (deleteFn) {
            handleDelete = deleteItem({
                deleteAsync: deleteFn,
                deleteLocal: tableActions.deleteItem,
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
    }, [columns, isActions, deleteFn,tableActions.deleteItem]);

    let result;

    if(status.isLoading && !data){
        result = <>
            <ControlPanel
                pagination={pagination}
                setPageSize={tableActions.setPageSize}
                handlePageChange={tableActions.setPage}
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
                pagination={pagination}
                setPageSize={tableActions.setPageSize}
                handlePageChange={tableActions.setPage}
                isCreate={isCreate}
            />
            <Table
                data={data}
                columns={tableColumns}
                sortParams={sortParams}
                handleSort={tableActions.toggleSort}
                pagination={pagination}
            />
        </>
    }


    return(<div className={styles.container}>
                {result}
            </div>)
};

export default AdminTablePage;