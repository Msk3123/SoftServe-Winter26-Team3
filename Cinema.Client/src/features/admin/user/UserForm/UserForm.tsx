import styles from "./UserForm.module.css";
import useForm from "../../../../hooks/useForm";
import Button from "../../../../components/Button/Button";
import {useEffect, useState, type FormEvent } from "react";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import type { UserCreate } from "../../../../types/user.types";
import userValidator from "../../validators/userValidator";
import { getAllRoles } from "../../../../api/roleApi";
import { handleError } from "../../../../helpers/handleError";
import Select from "../../../../components/Form/Select/Select";
import { USER_ROLE_ID } from "../../../../types/role.types";



const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    roleId: USER_ROLE_ID,
}

interface UserFormProps{
    initialState?:UserCreate;
    onSubmitAction:(data: UserCreate) => Promise<void>;
    onClose:()=>void;
}
const UserForm = ({initialState,onSubmitAction,onClose}:UserFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<UserCreate>(initialState??initialData,userValidator);
    const [isPending, setIsPending] = useState(false);
    const [roles,setRoles] = useState<{value:number|string, label: string}[]>([])
        
    useEffect(() => {
        getAllRoles()
            .then((response)=>response.items)
            .then(items=>
                setRoles(items.map((v)=>({value:v.id, label: v.roleName}))))
            .catch(err =>{
                handleError(err,"Can`t upload roles")
            });
    }, []);


    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(onSubmitAction)
        setIsPending(false);
    }

    return(
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>
                <BaseInput
                    value={formData.firstName}
                    error={errors.firstName}
                    onValueChange={(v)=>handleChange("firstName",v)}
                    label="First name"
                    placeholder="First name"
                    required
                />

                <BaseInput
                    value={formData.lastName}
                    error={errors.lastName}
                    onValueChange={(v)=>handleChange("lastName",v)}
                    label="Last name"
                    placeholder="Last name"
                    required
                />
                <hr></hr>
                <BaseInput
                    value={formData.email}
                    error={errors.email}
                    onValueChange={(v)=>handleChange("email",v)}
                    label="Email"
                    type="email"
                    placeholder="example@example.com"
                    required
                />
                <BaseInput
                    value={formData.phone}
                    error={errors.phone}
                    onValueChange={(v)=>handleChange("phone",v)}
                    label="Phone number"
                    type="tel"
                    placeholder="+123456789012"
                    required
                />
                <hr></hr>

                <BaseInput
                    value={formData.password}
                    error={errors.password}
                    onValueChange={(v)=>handleChange("password",v)}
                    label="Pasword"
                    placeholder="password"
                    type="password"
                    required
                />

                <Select
                    options={roles}
                    value={formData.roleId}
                    onChange={(v)=>handleChange("roleId",Number(v))}
                    label="Role"
                    error={errors.roleId}
                    required
            />

            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default UserForm;