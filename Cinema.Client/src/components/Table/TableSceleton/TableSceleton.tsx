import type { BaseEntity } from "../../../types/api.types";
import type { ColumnDef } from "../../../types/common.types";
import styles from "./TableSceleton.module.css"

interface TableSceletonProps<T>{
    columns: ColumnDef<T>[];
}

const TableSceleton = <T extends BaseEntity,>({columns}:TableSceletonProps<T>)=>{
    return <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr>
                    {columns.map(({key,title})=><th key={String(key)} className={styles.headCell}>
                        {title}
                        </th>)}
                </tr>
            </thead>
            <tbody>
            {Array.from({length:10}).map((_,i)=>{
                return <tr key={i} className={styles.tableRow}>
                    {columns.map(v=><td key={`${i} ${String(v.key)}`} className={styles.sceletonCell}></td>)}
                    <td key={`${i}-empty-cell`} className={styles.sceletonCell}></td>
                </tr>

            })}
            </tbody>
        </table>
}

export default TableSceleton;