import { useNavigate, useOutletContext,} from "react-router";
import type { CreateSessionsBatch, SessionShort } from "../../../../types/session.types";
import { createSessionBatch } from "../../../../api/sessionApi";
import toast from "react-hot-toast";
import SessionForm from "../SessionForm/SessionForm";
import { handleError } from "../../../../helpers/handleError";
import type { AdminModalContextWithRefresh } from "../../../../types/admin.types";

interface CreateSessionFormProps {
    onClose?:()=>void;
}

const CreateSessionForm = ({onClose}:CreateSessionFormProps)=>{

    const navigate = useNavigate();
    
    const {refresh} = useOutletContext<AdminModalContextWithRefresh<SessionShort>>();
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

            
            }catch(e){
                handleError(e,"Sessions didn`t created");
            }
        }

    return <SessionForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateSessionForm;