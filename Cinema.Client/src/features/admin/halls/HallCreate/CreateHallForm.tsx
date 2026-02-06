import { useNavigate, useOutletContext,} from "react-router";
import toast from "react-hot-toast";
import HallForm from "../HallForm/HallForm";
import type { HallCreate, HallShort } from "../../../../types/hall.types";
import { deleteHall, postHall } from "../../../../api/hallApi";
import { useState } from "react";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import HallMapSceleton from "../../../../components/HallMap/HallMapSceleton/HallMapSceleton";
import HallMapEdit from "../HallMapEdit/HallMapEdit";
import { saveHallMap } from "../api/saveHallMap";
import Button from "../../../../components/Button/Button";
import styles from "../HallForm/HallForm.module.css"
import { handleError } from "../../../../helpers/handleError";
import { handleCloseAttempt } from "./handleCloseAttempt";

interface CreateHallFormProps {
    onClose?:()=>void;
}
type WithDelete<T> = T & {
    deleteItem: (id: number|string) => void;
};
const CreateHallForm = ({onClose}:CreateHallFormProps)=>{

    const navigate = useNavigate();
    const [hall,setHall] = useState<HallShort|null>(null);
    const [formData,setFormData] = useState<HallCreate|null>(null)
    const [isPending,setIsPending] = useState<boolean>(false);
    const [canSave, setCanSave] = useState(false);
    
    const {createItem,deleteItem} = useOutletContext<WithDelete<AdminAdminModalContext<HallShort>>>();
    
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmitHall = async (formData:HallCreate)=>{
        try{
            setFormData(formData);
            setIsPending(true);
            
            const hall = await postHall(formData);
            setHall(hall);
            createItem(hall)

            setCanSave(true)
            toast.success("Hall successfuly created");
        }catch(e){
            handleError(e,"Hall didn`t created");
        }finally{
            setIsPending(false)
        }
    }
    
    const onSubmitHallMap = async (changes:{
                id: number,
                seatTypeId: string | number,}[])=>{
        try{
            setIsPending(true);
            await saveHallMap(changes)

        }finally{
            setIsPending(false)
        }
    }

    const handleDelete = async ()=>{
        if(!hall){
                handleClose();
                return
            }

        try{
            setIsPending(true);
            
            await deleteHall(hall.id);
            deleteItem(hall.id);
        }catch(e){
            handleError(e)
        }finally{
            handleClose();
            setIsPending(false)
        }
    }

    const handleSubmitAttempt = () => {
        if (hall && !isPending) {
            
            handleCloseAttempt(handleClose)
            return;
        }

        handleClose();
    };

    const sceleton =  <HallMapSceleton
                                rows={formData?.rows ?? 8}
                                seatsPerRow={formData?.seatsPerRow ?? 12}
                            />

    return  <>
                <HallForm onSubmitAction={onSubmitHall} onClose={handleClose}/>
                {isPending
                ? sceleton
                : hall && <HallMapEdit id={hall.id} sceleton={sceleton} onSubmit={onSubmitHallMap}/>}
                <div className={styles.actions}>
                    <Button bgColor="var(--color-danger)" action={handleDelete}>Cancel</Button>
                    <Button
                        htmlType="submit"
                        action={handleSubmitAttempt}
                        disabled={!canSave || isPending}
                        bgColor={ (!canSave || isPending) ? "var(--button-disabled)":"var(--color-primary)"}
                    >
                        Save
                    </Button>
                </div>
            </>
}

export default CreateHallForm;