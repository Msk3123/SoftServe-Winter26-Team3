import toast from "react-hot-toast";
import confirmDelete from "./ConfirmDelete/confirmDelete";
import type { DeleteFunction } from "../../../types/api.types";
interface DeleteItem{
    deleteAsync: DeleteFunction;
    deleteLocal:(id:number|string)=>void;
}
export default function deleteItem({deleteAsync,deleteLocal}:DeleteItem) {
        return async (id:number|string)=>{
            
            const isConfirmed = await confirmDelete();
            
            if (!isConfirmed) return;
            
            try{
                const success = await deleteAsync(Number(id));
                
                if(success){
                    toast.success('Successfully deleted!')
                    deleteLocal(Number(id))
                }else{
                    toast.error("This didn't work.")
                }
            }catch(e){
                console.error(e);
                toast.error("This didn't work.")
        }
    }

    }