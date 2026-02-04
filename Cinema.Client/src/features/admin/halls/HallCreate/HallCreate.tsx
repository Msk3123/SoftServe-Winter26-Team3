import { useNavigate, useOutletContext,} from "react-router";
import toast from "react-hot-toast";
import HallForm from "../HallForm/HallForm";
import type { HallCreate, HallShort } from "../../../../types/hall.types";
import { postHall } from "../../../../api/hallApi";
import { useState } from "react";
import type { AdminModalContext } from "../../../../types/admin.types";
import HallMapSceleton from "../../../../components/HallMap/HallMapSceleton/HallMapSceleton";

interface CreateHallFormProps {
    onClose?:()=>void;
}

const CreateHallForm = ({onClose}:CreateHallFormProps)=>{

    const navigate = useNavigate();
    const [hall,setHall] = useState<HallShort|null>(null);
    const [formData,setFormData] = useState<HallCreate|null>(null)
    const [isPending,setIsPending] = useState<boolean>(false)
    
    const {createItem} = useOutletContext<AdminModalContext<HallShort>>();
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = async (formData:HallCreate)=>{
            try{
                setFormData(formData);
                setIsPending(true);
                
                const hall = await postHall(formData);
                setHall(hall);
                createItem(hall)

                toast.success("Hall successfuly created");
            }catch(e){
                console.log(e);
                toast.error("Hall didn`t created");
            }finally{
                setIsPending(false)
            }
        }

    return  <>
                <HallForm onSubmitAction={onSubmit} onClose={handleClose}/>
                {isPending ? <HallMapSceleton
                                rows={formData?.rows ?? 8}
                                seatsPerRow={formData?.seatsPerRow ?? 12}
                            />
                            : hall && <span>hall map</span>}
            </>
}

export default CreateHallForm;