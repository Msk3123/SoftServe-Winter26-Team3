import type { ReactNode } from "react";
import  styles from  "./TableCell.module.css"
interface Props{
    children: ReactNode;
    className?: string;
    handleClick?:()=>void;
}
const TableCell : React.FC<Props> = ({children,className,handleClick})=>{
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