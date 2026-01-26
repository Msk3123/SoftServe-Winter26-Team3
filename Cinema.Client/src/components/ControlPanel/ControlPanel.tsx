import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import styles from "./ControlPanel.module.css";

interface Props{
    currentPage:number,
    totalPages:number,
    handlePageChange:(pageNumber: number) => void,
}

const ControlPanel: React.FC<Props> =({currentPage,totalPages,handlePageChange})=>{
    
    return(
        <div className={styles.controlPanel}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            <Button className={styles.createButton} to="./create">Create</Button>
        </div>
    )
    
}

export default ControlPanel;