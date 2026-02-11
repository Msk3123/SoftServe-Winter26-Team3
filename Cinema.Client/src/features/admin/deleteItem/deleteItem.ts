import toast from "react-hot-toast";
import confirmDelete from "./ConfirmDelete/confirmDelete";
import type { DeleteFunction } from "../../../types/api.types";
import { handleError } from "../../../helpers/handleError";
interface DeleteItem{
    deleteAsync: DeleteFunction;
    deleteLocal:(id:number|string)=>void;
}
export default function deleteItem({deleteAsync,deleteLocal}:DeleteItem) {
        return async (id:number|string)=>{
            
            const isConfirmed = await confirmDelete();
            
            if (!isConfirmed) return;
            
            try{
                await deleteAsync(Number(id));

                toast.success('Successfully deleted!')
                deleteLocal(Number(id))

            }catch(e){
                handleError(e,"Something went wrong");
        }
    }

    }