import { useNavigate, useOutletContext } from "react-router";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import type { MovieCreate, MovieShort } from "../../../../types/movie.types";
import toast from "react-hot-toast";
import MovieForm from "../MovieForm/MovieForm";
import { postMovie } from "../../../../api/movieApi";
import { handleError } from "../../../../helpers/handleError";

interface CreateMovieFormProps {
    onClose?:()=>void;
}

const CreateMovieForm = ({onClose}:CreateMovieFormProps)=>{

    const {createItem} = useOutletContext<AdminAdminModalContext<MovieShort>>();
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
                const movie = await postMovie({...formData,duration: Number(formData.duration)*60});
                if(movie){
                    createItem({
                        id: movie.id,
                        title: movie.title,
                        posterUrl: movie.posterUrl,
                        releaseDate: movie.releaseDate
                    });
                    toast.success("Movie succesfully added!")
                    handleClose();
                }
            }catch(e){
                handleError(e,"Can`t add this movie");
            }
        }

    return <MovieForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateMovieForm;