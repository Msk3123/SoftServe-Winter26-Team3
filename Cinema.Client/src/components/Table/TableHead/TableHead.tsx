import TableCell from "../TableCell/TableCell";
import  styles from  "./TableHead.module.css"
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
interface Props{
    headers:{value:string,visibleValue:string}[];
    handleSort:(key:string)=>void;
    sortParams:{
            sortBy: string,
            order: "asc"|"desc",
        }
}
const TableHead : React.FC<Props> = ({headers,handleSort,sortParams})=>{
    return(<thead className={styles.tableHead}>
                <tr>
                    {headers.map(({value,visibleValue})=><TableCell key={value} handleClick={()=>handleSort(value)}>
                        {visibleValue}
                        <span className={styles.arrow}>{sortParams.sortBy === value && (sortParams.order === "asc" ? <AiFillCaretUp/> :<AiFillCaretDown/> )}</span>
                        </TableCell>)}
                    <td></td>
                    <td></td>
                </tr>
            </thead> )
};

export default TableHead;