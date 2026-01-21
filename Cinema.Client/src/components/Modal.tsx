import type { ReactNode } from "react";
import  styles from  "./Modal.module.css"

interface Props{
    children : ReactNode
}
const Modal : React.FC<Props> = ({children})=>{
    return(<div className={styles.container}>
                {children}
            </div>)
};

export default Modal;