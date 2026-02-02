import { useLoaderData, useNavigate, useOutletContext} from "react-router";
import { putActor } from "../../../../api/actorApi";
import toast from "react-hot-toast";
import ActorForm from "../ActorForm/ActorForm";
import type { Actor, ActorCreate, ActorShort } from "../../../../types/actor.types";
import type { AdminModalContext } from "../../../../types/admin.types";


interface EditActorFormProps {onClose?:()=>void};
const EditActorForm = ({onClose}:EditActorFormProps)=>{
    const initialState = useLoaderData() as Actor;

    const {editItem} = useOutletContext<AdminModalContext<ActorShort>>();
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

            }catch{
                toast.error("Can`t add this actor");
            }
        }

    return <ActorForm initialState={initialState} onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default EditActorForm;