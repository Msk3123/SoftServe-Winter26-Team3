import styles from "./SeatTypeForm.module.css";
import useForm from "../../../../hooks/useForm";
import Button from "../../../../components/Button/Button";
import {useState, type FormEvent } from "react";
import type { SeatTypeCreate } from "../../../../types/seatType.types";
import seatTypeValidator from "../../validators/seatTypeValidator";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";



const initialData = {
    name:"",
    basePrice:50
}

interface SeatTypeFormProps{
    initialState?: SeatTypeCreate;
    onSubmitAction:(data: SeatTypeCreate) => Promise<void>;
    onClose:()=>void;
}
const SeatTypeForm = ({initialState,onSubmitAction,onClose}:SeatTypeFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<SeatTypeCreate>(initialState ?? initialData,seatTypeValidator);
    const [isPending, setIsPending] = useState(false);


    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(onSubmitAction)
        setIsPending(false);
    }

    return(
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>

            <BaseInput
                label="Name"
                placeholder="New seat type"
                value={formData.name}
                onValueChange={ (v) => handleChange("name", String(v)) }
                error={errors.name}

            />
            <BaseInput
                type="number"
                min={30}
                label="Price"
                value={formData.basePrice}
                onValueChange={ (v) => handleChange("basePrice", Number(v)) }
                error={errors.basePrice}

            />

            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default SeatTypeForm;