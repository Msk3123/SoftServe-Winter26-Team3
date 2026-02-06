import { useLoaderData, useNavigate, useOutletContext,} from "react-router";
import toast from "react-hot-toast";
import HallForm from "../HallForm/HallForm";
import { mapHallToCreate, type HallCreate, type HallShort } from "../../../../types/hall.types";
import { getHall, putHall } from "../../../../api/hallApi";
import { useMemo, useState } from "react";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import HallMapSceleton from "../../../../components/HallMap/HallMapSceleton/HallMapSceleton";
import HallMapEdit from "../HallMapEdit/HallMapEdit";
import { saveHallMap } from "../api/saveHallMap";
import Button from "../../../../components/Button/Button";
import styles from "../HallForm/HallForm.module.css"
import { handleError } from "../../../../helpers/handleError";
import { handleCloseAttempt } from "../HallCreate/handleCloseAttempt";

interface EditHallFormProps {
    onClose?:()=>void;
}
type WithDelete<T> = T & {
    deleteItem: (id: number|string) => void;
};
const EditHallForm = ({onClose}:EditHallFormProps)=>{
    const initialState = useLoaderData() as HallShort;
    const navigate = useNavigate();

    const [formData,setFormData] = useState<HallCreate|null>(null);
    const [isPending,setIsPending] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<{ rows: number; seatsPerRow: number } | null>(null);
    const [canSave, setCanSave] = useState(false);
    
    const {editItem} = useOutletContext<WithDelete<AdminAdminModalContext<HallShort>>>();
    
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("/admin/halls");
        }
        
    }

    const mappedInitialState = useMemo(() => {
    return dimensions ? mapHallToCreate(initialState, dimensions) : undefined;
}, [initialState, dimensions]);
    
    const onSubmitHall = async (formData:HallCreate)=>{
        try{
            setFormData(formData);
            setIsPending(true);
            
            await putHall(initialState.id,formData);
            
            const hall = await getHall(initialState.id);
            editItem(hall)

            setCanSave(true);
            toast.success("Hall successfuly updated");
        }catch(e){
            handleError(e,"Hall wasn't updated");
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
            setCanSave(true);
        }finally{
            setIsPending(false)
        }
    }

    const handleSubmitAttempt = () => {
            if (!isPending) {
                handleCloseAttempt(handleClose)
                return;
            }
    
            handleClose();
        };


    const sceleton =  <HallMapSceleton
                                rows={formData?.rows ?? 8}
                                seatsPerRow={formData?.seatsPerRow ?? 12}
                            />

    {/* We use a 'key' to force a remount of the HallForm component.
        This is necessary because the 'useForm' hook initializes its internal state only once.
        Since hall dimensions (rows/seats) are loaded asynchronously, changing the key 
        forces React to re-create the form with the correct 'initialState' once the 
        dimensions are available, avoiding manual state syncing or infinite loops.
*/}
    return  <div>
                <HallForm
                    key={dimensions ? "edit-mode" : "loading-mode"} // 
                    onSubmitAction={onSubmitHall}
                    onClose={handleClose}
                    initialState={ mappedInitialState}
                    isLoadingDimensions={!dimensions}
                />
                {isPending
                ? sceleton
                : <HallMapEdit
                        id={initialState.id}
                        sceleton={sceleton}
                        onSubmit={onSubmitHallMap}
                        setDimensions={(rows) => {
                            const capacity = Number(initialState.capacity);
                            setDimensions({
                                rows: rows,
                                seatsPerRow: Math.floor(capacity / rows)
                            });
                        }}
                />}
                <div className={styles.actions}>
                    <Button bgColor="var(--color-danger)" action={handleClose}>Cancel</Button>
                    <Button
                        htmlType="submit"
                        action={handleSubmitAttempt}
                        disabled={!canSave || isPending}
                        bgColor={ (!canSave || isPending) ? "var(--button-disabled)":"var(--color-primary)"}
                    >
                        Save
                    </Button>
                </div>
            </div>
}

export default EditHallForm;