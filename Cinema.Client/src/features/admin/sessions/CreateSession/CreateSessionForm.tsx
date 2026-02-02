import { useNavigate, useOutletContext,} from "react-router";
import type { CreateSessionsBatch } from "../../../../types/session.types";
import { createSessionBatch } from "../../../../api/sessionApi";
import toast from "react-hot-toast";
import SessionForm from "../SessionForm/SessionForm";
import type { MovieShort } from "../../../../types/movie.types";

interface CreateSessionFormProps {
    onClose?:()=>void;
}

const CreateSessionForm = ({onClose}:CreateSessionFormProps)=>{

    const navigate = useNavigate();
    
    const {refresh} = useOutletContext<{refresh:()=>void,editItem:(item: MovieShort) => void;}>();
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = async (formData:CreateSessionsBatch)=>{
            
            try{
                const session = await createSessionBatch(formData);
                await refresh();

                toast.success(session.message)
                handleClose();

            
            }catch{
                toast.error("Sessions didn`t created");
            }
        }

    return <SessionForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateSessionForm;