import { Outlet, useNavigate} from "react-router";
import { deleteMovie, getAllMovies } from "../../../api/movieApi";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { MovieShort } from "../../../types/movie.types";
import type { ColumnDef } from "../../../types/common.types";
import styles from "./AdminMoviesPage.module.css"
import { dateToDayFirst } from "../../../helpers/textHelpers";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import { useCallback, useMemo } from "react";
import { ApiError, type DeleteFunction } from "../../../types/api.types";
import { getSessionByMovieId } from "../../../api/sessionApi";
const AdminMoviesPage = ()=>{
    const navigate = useNavigate();
    
    const {data,pagination,sortParams,status,actions} = useQueryTable<MovieShort>(getAllMovies);

    const columns: ColumnDef<MovieShort>[] = useMemo(()=> [
        {key:"id",title:"№"},
        {key:"posterUrl",title:"Poster",render:(item)=><img src={item.posterUrl} alt={`${item.title} poster`} className={styles.imageCell}/>},
        {key:"title",title:"Title"},
        {key:"releaseDate",title:"Release Date",render:(item)=>dateToDayFirst(new Date(item.releaseDate))}
    ],[])

const handleDelete: DeleteFunction = useCallback(async (id) => {

        const response = await getSessionByMovieId(id, { page: 1, pageSize: 1, sortBy: "id", order: "asc" });

        if (response && response.items && response.items.length > 0) {
            navigate(`${id}/delete`);
            throw new ApiError("Cannot delete movie: active sessions found.",409)
        } else {
            await deleteMovie(id);
        }

}, [navigate]);

    return(
        <>
            <AdminTablePage
                columns={columns}
                tableData={{ data, pagination, sortParams, status }}
                tableActions={actions}
                deleteFn={handleDelete}/>
            <Outlet context={{createItem:actions.createItem, editItem:actions.editItem, deleteItem:actions.deleteItem}}/>
        </>
    )
};

export default AdminMoviesPage;