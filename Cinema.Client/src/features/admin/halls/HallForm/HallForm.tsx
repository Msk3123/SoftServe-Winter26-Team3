import { useState, type FormEvent } from "react";
import useForm from "../../../../hooks/useForm";
import type { HallCreate } from "../../../../types/hall.types";
import styles from "./HallForm.module.css";
import hallValidator from "../../validators/hallValidator";
import Button from "../../../../components/Button/Button";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import HallMapSceleton from "../../../../components/HallMap/HallMapSceleton/HallMapSceleton";

interface HallFormProps{
    initialState?:HallCreate;
    onSubmitAction:(data: HallCreate) => Promise<void>;
    onClose:()=>void;
}


const initialData = {
    hallName:"New Hall",
    rows: 8,
    seatsPerRow: 20,
}
const HallForm =  ({initialState,onSubmitAction,onClose}:HallFormProps) => {
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<HallCreate>(initialState??initialData,hallValidator);
    const [isPending, setIsPending] = useState(false);
    const [isSceleton,setIsSceleton] = useState(true);

    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(await onSubmitAction)
        setIsPending(false);
        setIsSceleton(false);
    }
    
    return (
    <>
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""} noValidate>
            <BaseInput
                label="Hall Name"
                value={formData.hallName}
                onValueChange={(v)=>handleChange("hallName",v)}
                autoComplete="off"
                error={errors.hallName}
                required
            />
            
            <div className={styles.datesContainer}>
                <BaseInput
                    label="Rows"
                    value={formData.rows}
                    onValueChange={(v)=>handleChange("rows",Number(v))}
                    type="number"
                    autoComplete="off"
                    min={1}
                    error={errors.rows}
                    required
                />

                <BaseInput
                    label="Seats per row"
                    value={formData.seatsPerRow}
                    onValueChange={(v)=>handleChange("seatsPerRow",Number(v))}
                    type="number"
                    min={1}
                    autoComplete="off"
                    error={errors.seatsPerRow}
                    required
                />
            </div>
            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Save</Button>
            </div>
        </form>

        {isSceleton &&
            <div className={styles.sceletonContainer}>
                <div className={styles.sceletonHover}> Save hall first</div>
                <HallMapSceleton rows={formData.rows} seatsPerRow={formData.seatsPerRow} />
            </div>
        }

        </>
    )
}
export default HallForm