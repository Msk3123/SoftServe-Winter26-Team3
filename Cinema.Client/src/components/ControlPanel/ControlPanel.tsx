import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import styles from "./ControlPanel.module.css";

interface ControlPanelProps{
    currentPage:number,
    totalPages:number,
    handlePageChange:(pageNumber: number) => void,
}

const ControlPanel =({currentPage,totalPages,handlePageChange}:ControlPanelProps)=>{
    
    return(
        <div className={styles.controlPanel}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            <Button className={styles.createButton} to="./create">Create</Button>
        </div>
    )
    
}

export default ControlPanel;