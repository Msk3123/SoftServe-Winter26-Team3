import { useState } from "react";
import  styles from  "./Table.module.css"
import TableHead from "./TableHead/TableHead";
import TableRow from "./TableRow/TableRow";

interface TableProps<T> {
    data: readonly T[];
}

const Table = <K extends string | number, T extends { id: K }>({ data }: TableProps<T>) => {
    
    const [selectedId, setSelectedId] = useState<K | null>(null);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    
    return(<table className={styles.table}>
            <TableHead headers={headers}/>
            <tbody>
                {data.map(row => <TableRow
                                    key={row.id}
                                    rowData={row}
                                    selectedId={selectedId}
                                    setSelectedId={()=>setSelectedId(row.id)}
                />)}
            </tbody>
            </table>)
};

export default Table;