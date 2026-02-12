import { useNavigate, useOutletContext } from "react-router";
import { postActor } from "../../../../api/actorApi";
import ActorForm from "../ActorForm/ActorForm";
import type { ActorCreate, ActorShort } from "../../../../types/actor.types";
import type {AdminModalContext } from "../../../../types/admin.types";
import { handleError } from "../../../../helpers/handleError";
import toast from "react-hot-toast";
interface CreateActorFormProps {onClose?:()=>void}
const CreateActorForm = ({onClose}:CreateActorFormProps)=>{

    const {createItem} = useOutletContext<AdminAdminModalContext<ActorShort>>();
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
                const actor = await postActor(formData);
                if(actor){
                    createItem({
                        id:actor.id,
                        firstName:actor.firstName,
                        lastName:actor.lastName,
                        photoUrl:actor.photoUrl
                    });
                    toast.success("Actor succesfully added!")
                    handleClose();
                }
            }catch(e){
                handleError(e,"Can`t add this actor");
            }
        }

    return <ActorForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateActorForm;