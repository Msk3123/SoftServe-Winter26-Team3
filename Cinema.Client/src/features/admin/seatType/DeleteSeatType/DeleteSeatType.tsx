import { useLoaderData, useNavigate, useOutletContext, useParams } from "react-router";
import type {AdminModalContextWithRefresh } from "../../../../types/admin.types";
import type { SeatType, SeatTypeCreate } from "../../../../types/seatType.types";
import { useState, type FormEvent } from "react";
import { deleteSeatType, postSeatType } from "../../../../api/seatTypeApi";
import { handleError } from "../../../../helpers/handleError";
import Button from "../../../../components/Button/Button";
import styles from "./DeleteSeatType.module.css"
import { type PaginatedResponse } from "../../../../types/api.types";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import SeatTypeOption from "../SeatTypeOption/SeatTypeOption";
import AdminModal from "../../../../components/AdminModal/AdminModal";
import SeatTypeForm from "../SeatTypeForm/SeatTypeForm";
import toast from "react-hot-toast";


interface LoaderResponse{
    usage: number,
    seatTypes: PaginatedResponse<SeatType>;
}

const DeleteSeatType = ()=>{
    const {seatId} = useParams();
    const { usage, seatTypes :  loaderSeatTypes} = useLoaderData() as LoaderResponse;
    
    const navigate = useNavigate();
    const {refresh,createItem} = useOutletContext<AdminModalContextWithRefresh<SeatType>>();

    const [replacementId,setReplacementId] = useState<string | number|undefined>();
    const [isPending,setisPending] = useState<boolean>(false);
    const [seatTypes,setSeatTypes] = useState<SeatType[]>(loaderSeatTypes.items);
    const [IsAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false)

    const handleDelete = async  (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (isPending) return;

        try{
            setisPending(true);
            
            if (!replacementId) {
                throw new Error("Please select a new type to reassign existing seats.");
            }
            
            if (String(seatId) === String(replacementId)) {
                throw new Error("The replacement type cannot be the same as the one being deleted.");
            }

            await deleteSeatType(String(seatId),replacementId)
            
            refresh();
            navigate("..");

        }catch(e){
            handleError(e, "Could not delete this seat type");
        }finally{
            setisPending(false);
        }
    }

    const handleCreateSeatType = async (formData:SeatTypeCreate)=>{
            
            try{
                const seatType = await postSeatType(formData);
                if(seatType){
                    createItem(seatType);
                    toast.success("Seat typesuccesfully added!")
                    
                    setSeatTypes(types=>[...types,seatType]);
                    setReplacementId(seatType.id)
                    
                    setIsAdminModalOpen(false);
                }
            }catch(e){
                handleError(e,"Can`t add this seat type");
            }
        }
    
    return( <div className={styles.wrapper}>
                <form onSubmit={handleDelete}>
                    <label className={styles.title}>Can't delete: {usage} seats of this type exist</label>
                    
                    <SelectableInput
                        title="Select seat type to replace"
                        multiple={false}
                        items={seatTypes}
                        selectedIds={replacementId?[replacementId]:[]}
                        getLabel={(item)=>item.name}
                        renderOption={item=><SeatTypeOption key={item.id} item={item}/>}
                        onSelect={item=>setReplacementId(item.id)}
                        onRemove={item=>setReplacementId(selected=> selected == item ? undefined: selected)}
                        onCreateNew={()=>setIsAdminModalOpen(true)}
                    />
                
                
                    <div className={styles.actions}>
                        <Button bgColor="var(--button-cancel)" to="..">Cancel</Button>
                        <Button
                            htmlType="submit"
                            disabled={!replacementId}
                            bgColor={ !replacementId ? "var(--button-disabled)":"var(--color-primary)"}
                        >
                            Save
                        </Button>
                    </div>
                </form>

                {IsAdminModalOpen
                && <AdminModal title="Create Seat Type" onClose={()=>setIsAdminModalOpen(false)}>
                    <SeatTypeForm onClose={()=>setIsAdminModalOpen(false)} onSubmitAction={handleCreateSeatType}/>
                </AdminModal>}

            </div>)
};

export default DeleteSeatType;
;