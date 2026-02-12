import { Outlet, useNavigate, useOutletContext, useParams } from "react-router";
import type { ColumnDef } from "../../../../types/common.types";
import useQueryTable from "../../../../hooks/useQueryTable/useQueryTable";
import styles from "./DeleteMovie.module.css"
import { useCallback, useMemo } from "react";
import type { FetchParams } from "../../../../types/api.types";
import type { SessionShort } from "../../../../types/session.types";
import { deleteSession, getSessionByMovieId } from "../../../../api/sessionApi";
import AdminTablePage from "../../components/AdminTablePage/AdminTablePage";
import { dateToDayFirst } from "../../../../helpers/textHelpers";
import Button from "../../../../components/Button/Button";
import { deleteMovie } from "../../../../api/movieApi";
import type { AdminModalContextWithDelete } from "../../../../types/admin.types";
import type { MovieShort } from "../../../../types/movie.types";
import { handleError } from "../../../../helpers/handleError";

const DeleteMovie = ()=>{
    const {movieId} = useParams();
    
    const navigate = useNavigate();
    const {deleteItem} = useOutletContext<AdminModalContextWithDelete<MovieShort>>();

    const fetchSessions = useCallback(
        (params: FetchParams<SessionShort>|undefined) => getSessionByMovieId(String(movieId),params),
        [movieId]
    );

    const {data,pagination,sortParams,actions,status} = useQueryTable<SessionShort>(fetchSessions);
    
    const columns:ColumnDef<SessionShort>[] = useMemo(()=>[
        { key: "id", title: "№" },
        { key: "sessionDate", title: "Date" , render:(item)=>dateToDayFirst(new Date(item.sessionDate))},
        { key: "sessionTime", title: "Time", render:(item)=> item.sessionTime.slice(0,5)},
        { key: "hallName", title: "Hall" }
    ],[]);

    const handleDelete = async  ()=>{
        try{
            await deleteMovie(String(movieId));
            deleteItem(String(movieId));
            navigate("..");
        }catch(e){
            handleError(e,"can`t delete this movie");
        }
    }
    
    return( <div className={styles.wrapper}>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    deleteFn={deleteSession}
                    isCreate={false}
                />
                <Outlet context={{refresh:actions.refresh,editItem:actions.editItem}}/>
                <div className={styles.actions}>
                    <Button bgColor="var(--button-cancel)" to="..">Cancel</Button>
                    <Button
                        htmlType="submit"
                        action={handleDelete}
                        disabled={data && data?.length>0}
                        bgColor={ (data && data?.length>0) ? "var(--button-disabled)":"var(--color-danger)"}
                    >
                        Delete
                    </Button>
                </div>
            </div>)
};

export default DeleteMovie
;