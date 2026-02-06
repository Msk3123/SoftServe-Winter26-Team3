import { useNavigate, useOutletContext } from "react-router";
import toast from "react-hot-toast";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import { handleError } from "../../../../helpers/handleError";
import type { SeatType, SeatTypeCreate } from "../../../../types/seatType.types";
import { postSeatType } from "../../../../api/seatTypeApi";
import SeatTypeForm from "../SeatTypeForm/SeatTypeForm";

interface CreateSeatTypeProps {
    onClose?:()=>void;
}

const CreateSeatType = ({onClose}:CreateSeatTypeProps)=>{

    const {createItem} = useOutletContext<AdminAdminModalContext<SeatType>>();
    const navigate = useNavigate();
    
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    

    const onSubmit = async (formData:SeatTypeCreate)=>{
            
            try{
                const seatType = await postSeatType(formData);
                if(seatType){
                    createItem(seatType);
                    toast.success("Seat typesuccesfully added!")
                    handleClose();
                }
            }catch(e){
                handleError(e,"Can`t add this seat type");
            }
        }

    return <SeatTypeForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateSeatType;