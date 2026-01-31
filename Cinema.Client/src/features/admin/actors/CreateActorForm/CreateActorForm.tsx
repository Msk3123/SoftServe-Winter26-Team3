import styles from "./CreateActorForm.module.css";
import type { ActorCreate } from "../../../../types/actor.types";
import useForm from "../../../../hooks/useForm";
import actorValidator from "../../validators/actorValidator";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import Button from "../../../../components/Button/Button";
import TextArea from "../../../../components/Form/TextArea/TextArea";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, type FormEvent } from "react";
import { postActor } from "../../../../api/actorApi";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router";
import type { AdminActorsPageContext } from "../../../../pages/Admin/Actors/AdminActorsPage";


const initialState = {
    firstName: "",
    lastName: "",
    biography: "",
    birthday: "",
    photoUrl: "",
}

const CreateActorForm = ()=>{
    const {createItem} = useOutletContext<AdminActorsPageContext>();
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<ActorCreate>(initialState,actorValidator);
    const [isPending, setIsPending] = useState(false)
    
    const navigate = useNavigate();
    
    const handleClose = ()=>{
        navigate("..");
    }
    
    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(async (formData)=>{
            
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

            
            
        })
        setIsPending(false);
    }

    return(
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>
            <div className={styles.imageInput}>
                <BaseInput
                    value={formData.photoUrl}
                    error={errors.photoUrl}
                    onValueChange={(v)=>handleChange("photoUrl",v)}
                    type="url"
                    label="Actor Photo"
                    placeholder="Put photo URL here.."
                    required
                />
                <Button action={()=>handleChange("photoUrl","")} className={styles.clearButton}>< AiOutlineDelete/></Button>
                
                <div className={styles.imagePreviewWrapper}>
                    {formData.photoUrl ? (
                        <img
                            src={formData.photoUrl}
                            alt="Preview"
                            className={`${styles.actorPreview} ${errors.photoUrl?styles.imagePlaceholder:""}`}
                            />
                    ) : (
                        <div className={styles.imagePlaceholder}>Avatar will appear here</div>
                    )}
                </div>
            </div>

                <BaseInput
                    value={formData.firstName}
                    error={errors.firstName}
                    onValueChange={(v)=>handleChange("firstName",v)}
                    type="text"
                    label="First name"
                    placeholder="First name ..."
                    required
                />
                
                <BaseInput
                    value={formData.lastName}
                    error={errors.lastName}
                    onValueChange={(v)=>handleChange("lastName",v)}
                    type="text"
                    label="Last name"
                    placeholder="Last name ..."
                    required
                />

                <TextArea
                    value={formData.biography}
                    error={errors.biography}
                    onValueChange={(v)=>handleChange("biography",v)}
                    label="Biography"
                    required
                />

                <BaseInput
                    value={formData.birthday}
                    error={errors.birthday}
                    onValueChange={(v)=>handleChange("birthday",v)}
                    type="date"
                    label="Birthday"
                    placeholder="01.01.2000"
                    required
                />

            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" to="..">Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Create Actor</Button>
            </div>
        </form>
    )
}
export default CreateActorForm;