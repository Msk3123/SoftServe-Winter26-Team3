import { useNavigate, useOutletContext } from "react-router";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import type { User, UserCreate } from "../../../../types/user.types";
import { postUser } from "../../../../api/userApi";
import toast from "react-hot-toast";
import { handleError } from "../../../../helpers/handleError";
import NewsForm from "../../news/NewsForm/NewsForm";
import UserForm from "../UserForm/UserForm";

interface CreateUserProps {
    onClose?:()=>void;
}

const CreateUser = ({onClose}:CreateUserProps)=>{

    const {createItem} = useOutletContext<AdminAdminModalContext<User>>();
    const navigate = useNavigate();
    
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    

    const onSubmit = async (formData:UserCreate)=>{
            
            try{
                const user = await postUser(formData);
                if(user){
                    createItem(user);
                    toast.success("User succesfully created!")
                    handleClose();
                }
            }catch(e){
                handleError(e,"Can`t create this user");
            }
        }

    return <UserForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateUser;