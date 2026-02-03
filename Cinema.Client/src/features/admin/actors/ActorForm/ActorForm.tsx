import styles from "./ActorForm.module.css";
import type { ActorCreate } from "../../../../types/actor.types";
import useForm from "../../../../hooks/useForm";
import actorValidator from "../../validators/actorValidator";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import Button from "../../../../components/Button/Button";
import TextArea from "../../../../components/Form/TextArea/TextArea";
import { useState, type FormEvent } from "react";
import ImageInput from "../../../../components/Form/ImageInput/ImageInput";
import { dateToYearFirst } from "../../../../helpers/textHelpers";


const initialData = {
    firstName: "",
    lastName: "",
    biography: "",
    birthday: dateToYearFirst(new Date("2000-01-01")),
    photoUrl: "",
}

interface ActorFormProps{
    initialState?:ActorCreate;
    onSubmitAction:(data: ActorCreate) => Promise<void>;
    onClose:()=>void;
}
const ActorForm = ({initialState,onSubmitAction,onClose}:ActorFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<ActorCreate>(initialState??initialData,actorValidator);
    const [isPending, setIsPending] = useState(false)

    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(onSubmitAction)
        setIsPending(false);
    }

    return(
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>
                <ImageInput
                    value={formData.photoUrl}
                    error={errors.photoUrl}
                    onValueChange={(v)=>handleChange("photoUrl",v)}
                    onValueClear={()=>handleChange("photoUrl","")}
                    label="Actor Photo"
                    placeholder="Put photo URL here.."
                    required
                />

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
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default ActorForm;