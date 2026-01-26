import styles from "./TableSceleton.module.css"

interface Props{
    headers:{value:string,visibleValue:string}[];
}

const TableSceleton:React.FC<Props>=({headers})=>{
    return <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr>
                    {headers.map(({value,visibleValue})=><th key={value} className={styles.headCell}>
                        {visibleValue}
                        </th>)}
                    <th className={styles.emptyHeadCells}></th>
                    <th className={styles.emptyHeadCells}></th>
                </tr>
            </thead>
            {Array.from({length:10}).map((v,i)=>{
                return <tr key={i} className={styles.tableRow}>
                    {headers.map(v=><td key={`${i} ${v.value}`} className={styles.sceletonCell}></td>)}
                    <td key={`${i} empty 1 `} className={styles.sceletonCell}></td>
                    <td key={`${i} empty 2`} className={styles.sceletonCell}></td>
                </tr>

            })}
    
        </table>
}

export default TableSceleton;