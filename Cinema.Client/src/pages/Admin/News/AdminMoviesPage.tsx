import { Outlet} from "react-router";
import { deleteMovie, getAllMovies } from "../../../api/movieApi";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { MovieShort } from "../../../types/movie.types";
import type { ColumnDef } from "../../../types/common.types";
import styles from "./AdminMoviesPage.module.css"
import { dateToString } from "../../../helpers/textHelpers";

const AdminMoviesPage = ()=>{

    const columns: ColumnDef<MovieShort>[] = [
        {key:"id",title:"№"},
        {key:"posterUrl",title:"Poster",render:(item)=><img src={item.posterUrl} alt={`${item.title} poster`} className={styles.imageCell}/>},
        {key:"title",title:"Title"},
        {key:"releaseDate",title:"Release Date",render:(item)=>dateToString(item.releaseDate),}
    ]

    return(
        <>
            <AdminTablePage
                columns={columns}
                queryFn={getAllMovies}
                deleteFn={deleteMovie}/>
            <Outlet />
        </>
    )
};

export default AdminMoviesPage;