import Button from "../Button/Button";
import BaseInput from "../Form/BaseInput/BaseInput";
import Pagination from "../Pagination/Pagination";
import styles from "./ControlPanel.module.css";

interface ControlPanelProps{
    pagination: {
        current: number;
        total: number;
        pageSize: number;
    },
    setPageSize:(page: number) => void;
    handlePageChange:(pageNumber: number) => void,
}

const ControlPanel =({pagination,setPageSize,handlePageChange}:ControlPanelProps)=>{
    
    return(
        <div className={styles.controlPanel}>
            <BaseInput
                type="number"
                min={Math.min(10,pagination.total)}
                max={pagination.total}
                value={pagination.pageSize}
                onValueChange={(v)=>setPageSize(Number(v))}
                label="Page Size"
            />
            <Pagination
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total/pagination.pageSize)}
                onPageChange={handlePageChange}
            />
            <Button className={styles.createButton} to="./create">Create</Button>
        </div>
    )
    
}

export default ControlPanel;