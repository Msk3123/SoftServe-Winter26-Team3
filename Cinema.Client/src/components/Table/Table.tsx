import { useState } from "react";
import  styles from  "./Table.module.css"
import TableHead from "./TableHead/TableHead";
import TableRow from "./TableRow/TableRow";

interface TableProps<T> {
    data: readonly T[];
    headers:{value:string,visibleValue:string}[];
    handleSort:(key:string)=>void;
    handleDelete:(id: number) => void,
    sortParams:{
            sortBy: string,
            order: "asc"|"desc",
        }
    pagination: {
        current: number;
        total: number;
        pageSize: number;
}
}


const Table = <K extends string | number, T extends { id: K }>(
    {   data ,
        headers,
        handleSort,
        sortParams,
        pagination,
        handleDelete}: TableProps<T>) => {
    const [selectedId, setSelectedId] = useState<K | null>(null);
    
    return(<table className={styles.table}>
            <TableHead headers={headers} sortParams={sortParams} handleSort={handleSort}/>
            <tbody>
                {data.map((row,i) => <TableRow
                                    key={row.id}
                                    index={(pagination.current-1)*pagination.pageSize+i}
                                    headers={headers}
                                    rowData={row}
                                    selectedId={selectedId}
                                    setSelectedId={()=>setSelectedId(id => id===row.id ? null : row.id)}
                                    handleDelete={handleDelete}
                />)}
            </tbody>
            </table>)
};

export default Table;