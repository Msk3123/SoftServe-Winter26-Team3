import type { ReactNode } from "react";
import  styles from  "./TableCell.module.css"

interface TableCellProps{
    children: ReactNode;
    className?: string;
    handleClick?:()=>void;
}

const TableCell = ({children,className,handleClick}:TableCellProps)=>{
    const style = `${styles.tableCell} ${className??""}`;

    return(<td className={style} onClick={handleClick}>
            {children}
            </td> )
};

export default TableCell;