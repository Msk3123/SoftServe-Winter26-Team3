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
    const safeTotalPages = pagination.pageSize > 0
        ? Math.ceil(pagination.total / pagination.pageSize)
        : 1;

    return (
        <div className={styles.controlPanel}>
            <BaseInput
                type="number"
                min={1}
                max={pagination.total}
                value={pagination.pageSize === 0 ? "" : pagination.pageSize}
                onValueChange={(v) => {
                    if (v === "") {
                        setPageSize(0);
                        return;
                    }

                    const newValue = Number(v);
                    if (newValue <= pagination.total) {
                        setPageSize(newValue);
                    }
                }}
                label="Page Size"
                className={styles.pageSizeInput}
            />
            <Pagination
                currentPage={pagination.current}
                totalPages={safeTotalPages}
                onPageChange={handlePageChange}
            />
            <Button className={styles.createButton} to="./create">Create</Button>
        </div>
    )
    
}

export default ControlPanel;