import  styles from  "./TableRow.module.css"
import TableCell from "../TableCell/TableCell";
import Button from "../../Button/Button";
import { deleteMovie } from "../../../api/movieApi";
import toast from "react-hot-toast";
import confirmDelete from "../../ConfirmDelete/confirmDelete";

interface TableRowProps<T extends { readonly id: K }, K extends string | number> {
    rowData: T;
    selectedId: K | null;
    setSelectedId: () => void;
    headers:{value:string|number,visibleValue:string}[];
    index:number;
    handleDelete:(id: number) => void;
}

const TableRow = <K extends string | number, T extends { id: K }>({
    rowData,
    selectedId,
    setSelectedId,
    headers,
    index,
    handleDelete
}: TableRowProps<T, K>) => {
    
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
                    {headers.map(({value}
                    ) => (
                        <TableCell key={`${id} ${value}`}>
                            {value=="id"?index+1:String(rowData[value as keyof T])}
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