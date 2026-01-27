import  styles from  "./TableRow.module.css"
import TableCell from "../TableCell/TableCell";
import Button from "../../Button/Button";
import { deleteMovie } from "../../../api/movieApi";
import toast from "react-hot-toast";
import confirmDelete from "../../ConfirmDelete/confirmDelete";
import type { BaseEntity } from "../../../types/api.types";
import type { ColumnDef } from "../../../types/common.types";

interface TableRowProps<T extends BaseEntity> {
    rowData: T;
    selectedId: string | number | null;
    setSelectedId: () => void;
    columns:ColumnDef<T>[];
    index:number;
    handleDelete:(id: number|string) => void;
}

const TableRow = <T extends BaseEntity>({
    rowData,
    selectedId,
    setSelectedId,
    columns,
    index,
    handleDelete
}: TableRowProps<T>) => {
    
    const {id} = rowData;
    const isSelected = selectedId === id;

    async function deleteHandle() {
        const isConfirmed = await confirmDelete();
        if (!isConfirmed) return;
        try{
            const success = await deleteMovie(Number(id));
            if(success){
                toast.success('Successfully deleted!')
                handleDelete(Number(id))
            }else{
                toast.error("This didn't work.")
            }
        }catch(e){
            console.error(e);
            toast.error("This didn't work.")
        }
        

    }
    
    return(
                <tr className={`${styles.tableRow} ${isSelected && styles.selected}`} onClick={setSelectedId}>
                    {columns.map(({key}) => (
                        <TableCell key={`${id} ${String(key)}`}>
                            {key=="id" ? index+1 : String(rowData[key as keyof T])}
                        </TableCell>
                    ))}

                        <TableCell key={`${id} edit`} className={styles.controlCell}>
                            <Button
                                to={`./${id}/edit`}
                                variant="fill"
                                bgColor="var(--color-primary)"
                                color="var(--text-main)">
                                    Edit
                            </Button>
                        </TableCell>

                        <TableCell key={`${id} delete`} className={styles.controlCell}>
                            <Button
                                action={deleteHandle}
                                variant="fill"
                                bgColor="var(--color-danger)"
                                color="var(--text-main)">
                                    Delete
                                </Button>
                        </TableCell>
                </tr>
    )
};

export default TableRow;