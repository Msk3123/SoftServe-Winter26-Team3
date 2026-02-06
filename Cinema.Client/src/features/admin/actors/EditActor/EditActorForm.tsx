import { useLoaderData, useNavigate, useOutletContext} from "react-router";
import { putActor } from "../../../../api/actorApi";
import ActorForm from "../ActorForm/ActorForm";
import type { Actor, ActorCreate, ActorShort } from "../../../../types/actor.types";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import { handleError } from "../../../../helpers/handleError";
import toast from "react-hot-toast";


interface EditActorFormProps {onClose?:()=>void};
const EditActorForm = ({onClose}:EditActorFormProps)=>{
    const initialState = useLoaderData() as Actor;

    const {editItem} = useOutletContext<AdminAdminModalContext<ActorShort>>();
    const navigate = useNavigate();
    
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    

    const onSubmit = async (formData:ActorCreate)=>{
            
            try{
                await putActor(initialState.id,formData);
                    
                editItem({
                        id:initialState.id,
                        firstName:formData.firstName,
                        lastName:formData.lastName,
                        photoUrl:formData.photoUrl
                    });
                
                toast.success("Actor succesfully updated!")
                handleClose();

            }catch(e){
               handleError(e,"Can`t edit this actor");
            }
        }

    return <ActorForm initialState={initialState} onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default EditActorForm;