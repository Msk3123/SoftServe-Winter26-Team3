import type { BaseEntity } from "../../../types/api.types";
import type { ColumnDef } from "../../../types/common.types";
import TableCell from "../TableCell/TableCell";
import  styles from  "./TableHead.module.css"
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

interface TableHeadProps<T>{
    columns:ColumnDef<T>[];
    handleSort:(key:keyof T)=>void;
    sortParams:{
            sortBy: keyof T,
            order: "asc"|"desc",
        }
}
const TableHead= <T extends BaseEntity>({columns,handleSort,sortParams}:TableHeadProps<T>)=>{
    return(<thead className={styles.tableHead}>
                <tr>
                    {columns.map(({key,title})=><TableCell key={String(key)} handleClick={()=>handleSort(key)}>
                        {title}
                        <span className={styles.arrow}>{sortParams.sortBy === key && (sortParams.order === "asc" ? <AiFillCaretUp/> :<AiFillCaretDown/> )}</span>
                        </TableCell>)}
                    <td></td>
                    <td></td>
                </tr>
            </thead> )
};

export default TableHead;