import { useLoaderData, useNavigate, useOutletContext, } from "react-router";
import toast from "react-hot-toast";
import { getSession, putSession } from "../../../../api/sessionApi";
import { mapSessionToCreate, mapSessionToShort, type Session, type SessionCreate, type SessionShort } from "../../../../types/session.types";
import SingleSessionForm from "../SingleSessionForm/SingleSessionForm";

interface EditSessionFormProps {
    onClose?:()=>void;
}

const EditSessionForm = ({onClose}:EditSessionFormProps)=>{

    const initialState = useLoaderData() as Session;

    console.log(initialState);

    const {editItem} = useOutletContext<{refresh:()=>void,editItem:(item: SessionShort) => void;}>();
    const navigate = useNavigate();
    
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = async (formData:SessionCreate)=>{
            
            try{

                await putSession(initialState.id,{...formData});
                
                const session = await getSession(initialState.id);
                editItem({...mapSessionToShort(session)});
                    
                toast.success("Session succesfully edited!")
                handleClose();
            }catch{
                toast.error("Can`t edit this session");
            }
        }

    return <SingleSessionForm initialState={mapSessionToCreate(initialState)} onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default EditSessionForm;