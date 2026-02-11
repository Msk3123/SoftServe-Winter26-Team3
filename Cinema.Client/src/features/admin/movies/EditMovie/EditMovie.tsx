import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import { mapMovieToCreate, type Movie, type MovieCreate, type MovieShort } from "../../../../types/movie.types";
import toast from "react-hot-toast";
import MovieForm from "../MovieForm/MovieForm";
import { putMovie } from "../../../../api/movieApi";
import { handleError } from "../../../../helpers/handleError";

interface EditMovieFormProps {
    onClose?:()=>void;
}

const EditMovieForm = ({onClose}:EditMovieFormProps)=>{

    const initialState = useLoaderData() as Movie;

    const {editItem} = useOutletContext<AdminAdminModalContext<MovieShort>>();
    const navigate = useNavigate();
    
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = async (formData:MovieCreate)=>{
            
            try{

                await putMovie(initialState.id,{...formData,duration: Number(formData.duration)*60});
                    editItem({
                        id: initialState.id,
                        title: formData.title,
                        posterUrl: formData.posterUrl,
                        releaseDate: formData.releaseDate
                    });
                    toast.success("Movie succesfully edited!")
                    handleClose();
            }catch(e){
                handleError(e,"Can`t edit this movie");
            }
        }

    return <MovieForm onSubmitAction={onSubmit} onClose={handleClose} initialState={mapMovieToCreate(initialState)}/>
}

export default EditMovieForm;