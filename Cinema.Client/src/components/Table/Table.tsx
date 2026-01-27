import { useState } from "react";
import  styles from  "./Table.module.css"
import TableHead from "./TableHead/TableHead";
import TableRow from "./TableRow/TableRow";
import type { BaseEntity } from "../../types/api.types";
import type { ColumnDef } from "../../types/common.types";

interface TableProps<T> {
    data: readonly T[];
    columns:ColumnDef<T>[];
    handleSort:(key: keyof T)=>void;
    handleDelete:(id: number|string) => void,
    sortParams:{
            sortBy: keyof T,
            order: "asc"|"desc",
        }
    pagination: {
        current: number;
        total: number;
        pageSize: number;
    }
}


const Table = <T extends BaseEntity>(
    {   data ,
        columns,
        handleSort,
        sortParams,
        pagination,
        handleDelete}: TableProps<T>) => {
    const [selectedId, setSelectedId] = useState<number | string | null>(null);
    
    return(<table className={styles.table}>
            <TableHead columns={columns} sortParams={sortParams} handleSort={handleSort}/>
            <tbody>
                {data.map((row,i) => <TableRow
                                    key={row.id}
                                    index={(pagination.current-1)*pagination.pageSize+i}
                                    columns={columns}
                                    rowData={row}
                                    selectedId={selectedId}
                                    setSelectedId={()=>setSelectedId(id => id===row.id ? null : row.id)}
                                    handleDelete={handleDelete}
                />)}
            </tbody>
            </table>)
};

export default Table;