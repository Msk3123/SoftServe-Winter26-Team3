import type { ReactNode } from "react";
import  styles from  "./TableCell.module.css"

interface TableCellProps{
    children: ReactNode;
    className?: string;
    handleClick?:()=>void;
}

const TableCell = ({children,className,handleClick}:TableCellProps)=>{
    let style = `${styles.tableCell} ${className??""}`;
    let value = children;
        
    if(typeof value=="string"){
        if(value.startsWith("http")){
            value = <img src={value} alt="table-img"/>
            style = style + ` ${styles.imageCell}`
        }else if(value.includes("GMT")){
            value = new Date(value).toDateString();
        }
    }

    return(<td className={style} onClick={handleClick}>
            {value}
            </td> )
};

export default TableCell;