import  styles from  "./TableRow.module.css"
import TableCell from "../TableCell/TableCell";
import Button from "../../../../components/Button/Button";

interface TableRowProps<T extends { readonly id: K }, K extends string | number> {
    rowData: T;
    selectedId: K | null;
    setSelectedId: () => void;
}

const TableRow = <K extends string | number, T extends { id: K }>({
    rowData,
    selectedId,
    setSelectedId
}: TableRowProps<T, K>) => {
    
    const {id} = rowData;
    const isSelected = selectedId === id;
    
    return(
                <tr className={`${styles.tableRow} ${isSelected && styles.selected}`} onClick={setSelectedId}>
                    {Object.entries(rowData).map(([key, val]) => (
                        <TableCell key={`${id} ${key}`}>
                            {String(val)}
                        </TableCell>
                    ))}
                        <TableCell key={`${id} edit`} className={styles.controlCell}>
                            <Button variant="fill" bgColor="var(--color-primary)" color="var(--text-main)">Edit</Button>
                        </TableCell>
                        <TableCell key={`${id} delete`} className={styles.controlCell}>
                            <Button variant="fill" bgColor="var(--color-danger)" color="var(--text-main)">Delete</Button>
                        </TableCell>
                </tr>
    )
};

export default TableRow;