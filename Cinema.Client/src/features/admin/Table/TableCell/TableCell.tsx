import type { ReactNode } from "react";
import  styles from  "./TableCell.module.css"
interface Props{
    children: ReactNode;
    className?: string;
}
const TableCell : React.FC<Props> = ({children,className})=>{
    const style = `${styles.tableCell} ${className??""}`;
    
    return(<td className={style}>
            {children}
            </td> )
};

export default TableCell;