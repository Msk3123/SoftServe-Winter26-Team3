import { useLoaderData, useNavigate, useOutletContext} from "react-router";
import toast from "react-hot-toast";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import { handleError } from "../../../../helpers/handleError";
import type { SeatType, SeatTypeCreate } from "../../../../types/seatType.types";
import { putSeatType } from "../../../../api/seatTypeApi";
import SeatTypeForm from "../SeatTypeForm/SeatTypeForm";

interface EditSeatTypeFormProps {
    onClose?:()=>void;
}
const EditSeatTypeForm = ({onClose}:EditSeatTypeFormProps)=>{
    const initialState = useLoaderData() as SeatType;

    const {editItem} = useOutletContext<AdminAdminModalContext<SeatType>>();
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
                await putSeatType(initialState.id,formData);
                    
                editItem({
                        id:initialState.id,
                        ...formData
                    });
                
                toast.success("News succesfully updated!")
                handleClose();

            }catch(e){
                handleError(e,"Can`t edit this news");
            }
        }

    return <SeatTypeForm initialState={{...initialState}} onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default EditSeatTypeForm;