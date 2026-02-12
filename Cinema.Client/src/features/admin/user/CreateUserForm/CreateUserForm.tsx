import { useNavigate, useOutletContext } from "react-router";
import type { AdminModalContextWithRefresh } from "../../../../types/admin.types";
import type { User, UserCreate } from "../../../../types/user.types";
import toast from "react-hot-toast";
import { handleError } from "../../../../helpers/handleError";
import UserForm from "../UserForm/UserForm";
import { authApi } from "../../../../api/authApi";
import { patchUser } from "../../../../api/userApi";
import { jwtDecode} from "jwt-decode";
import type { JwtPayload } from "../../../../helpers/authHelper";
import { USER_ROLE_ID } from "../../../../types/role.types";
import { ApiError } from "../../../../types/api.types";
import PasswordConfirmModal from "../../components/confirmPassword/PasswordConfirmModal";
import { useState } from "react";

interface CreateUserProps {
    onClose?:()=>void;
}

const CreateUser = ({onClose}:CreateUserProps)=>{

    const {refresh} = useOutletContext<AdminModalContextWithRefresh<User>>();
    const navigate = useNavigate();
    const [isConfirmOpen,setIsConfirmOpen] = useState<boolean>(false);
    const [formData,setFormData] = useState<UserCreate|undefined>();
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = (formData:UserCreate)=>{
        setFormData(formData);
        setIsConfirmOpen(true);
    }

    const onCreate = async ()=>{
        if(!formData) return;
        try{
            const response = await authApi.register({...formData,confirmPassword:formData.password});
            
            if(!response){
                throw new ApiError("Failed to get response from server during registration",400)
            }
                
            if(formData.roleId !== USER_ROLE_ID){
                const userId= jwtDecode<JwtPayload>(response.accessToken).nameid;
                
                console.log(userId)
                await patchUser(userId,{roleId:formData.roleId});
            }
                    
            refresh();
            toast.success("User succesfully created!")
            handleClose();
        }catch(e){
                handleError(e,"Can`t create this user");
        }
    }

    return <>
    <UserForm onSubmitAction={onSubmit} onClose={handleClose}/>
        <PasswordConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={onCreate}
        />
    </>
}

export default CreateUser;