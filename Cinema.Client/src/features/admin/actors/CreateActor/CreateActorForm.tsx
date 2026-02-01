import { useNavigate, useOutletContext } from "react-router";
import { postActor } from "../../../../api/actorApi";
import toast from "react-hot-toast";
import ActorForm from "../ActorForm/ActorForm";
import type { ActorCreate, ActorShort } from "../../../../types/actor.types";
import type { AdminModalContext } from "../../../../types/admin.types";

const CreateActorForm = ()=>{

    const {createItem} = useOutletContext<AdminModalContext<ActorShort>>();
    const navigate = useNavigate();
    
    const handleClose = ()=>{
        navigate("..");
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
            }catch{
                toast.error("Can`t add this actor");
            }
        }

    return <ActorForm onSubmitAction={onSubmit}/>
}

export default CreateActorForm;