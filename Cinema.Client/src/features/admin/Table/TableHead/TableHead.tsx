import TableCell from "../TableCell/TableCell";
import  styles from  "./TableHead.module.css"
interface Props{
    headers: string[]
}
const TableHead : React.FC<Props> = ({headers})=>{
    return(<thead className={styles.tableHead}>
                <tr>
                    {headers.map(value=><TableCell key={value}>{value}</TableCell>)}
                    <td></td>
                    <td></td>
                </tr>
            </thead> )
};

export default TableHead;