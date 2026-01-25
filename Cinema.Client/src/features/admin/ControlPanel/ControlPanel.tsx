import { useState } from "react";
import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import styles from "./ControlPanel.module.css";
const ControlPanel: React.FC =()=>{

    const [currentPage,setCurrentPage] = useState(1);

    return(
        <div className={styles.controlPanel}>
            <Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage}/>
            <Button className={styles.createButton}>Create</Button>
        </div>
    )
    
}

export default ControlPanel;