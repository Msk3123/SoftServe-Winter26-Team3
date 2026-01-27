import  styles from  "./TableRow.module.css"
import TableCell from "../TableCell/TableCell";
import type { BaseEntity } from "../../../types/api.types";
import type { ColumnDef } from "../../../types/common.types";

interface TableRowProps<T extends BaseEntity> {
    rowData: T;
    selectedId: string | number | null;
    setSelectedId: () => void;
    columns:ColumnDef<T>[];
    index:number;
}

const TableRow = <T extends BaseEntity>({
    rowData,
    selectedId,
    setSelectedId,
    columns,
    index,
}: TableRowProps<T>) => {
    
    const {id} = rowData;
    const isSelected = selectedId === id;
    
    return(
                <tr className={`${styles.tableRow} ${isSelected && styles.selected}`} onClick={setSelectedId}>
                    {columns.map((col) => (
                        <TableCell key={`${id} ${String(col.key)}`}>
                            {col.render
                                ? col.render(rowData)
                                : col.key=="id" ? index + 1 : String(rowData[col.key as keyof T])
                            }
                        </TableCell>
                    ))}

                </tr>
    )
};

export default TableRow;