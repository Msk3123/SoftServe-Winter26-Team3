import { Outlet} from "react-router";
import { getAllMovies } from "../../../api/movieApi";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { MovieShort } from "../../../types/movie.types";
import type { ColumnDef } from "../../../types/common.types";


const AdminMoviesPage = ()=>{
    const columns: ColumnDef<MovieShort>[] = [
        {key:"id",title:"№"},
        {key:"title",title:"Title"},
        {key:"posterUrl",title:"Poster"},
        {key:"releaseDate",title:"Release Date"},
    ]

    return(
        <>
            <AdminTablePage columns={columns} queryFn={getAllMovies}/>
            <Outlet />
        </>
    )
};

export default AdminMoviesPage;