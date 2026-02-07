import { Outlet } from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import styles from "./AdminUsersPage.module.css";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import { getAllUsers, patchUser } from "../../../api/userApi";
import type { User } from "../../../types/user.types";
import Select from "../../../components/Form/Select/Select";
import { useEffect, useState } from "react";
import { handleError } from "../../../helpers/handleError";
import { getAllRoles } from "../../../api/roleApi";
import toast from "react-hot-toast";
import Button from "../../../components/Button/Button";

const AdminUsersPage= ()=>{
    const {data,pagination,sortParams,status,actions} = useQueryTable<User>(getAllUsers);
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
    
    const columns:ColumnDef<User>[] = [
    { key: "id", title: "№" },
    {key:"firstName",title:"First Name"},
    {key:"lastName",title:"Last Name"},
    {key:"email",title:"email"},
    {key:"phone",title:"phone"},
    {key:"roleName",title:"Role",render:(item)=>{
    
    const selectedRole = roles.find(v=>v.label===item.roleName);

    const handleChange = async (v:string)=>{
        try{
            toast.loading("Changing role",{id:v})
            await patchUser(item.id,{roleId:Number(v)})
            actions.editItem({...item,roleName:v})

        }catch(e){
            handleError(e,"Can't change role for this user")
        }finally{
            toast.remove(v)
        }
    }
    
    return <Select
                options={roles}
                value={!selectedRole ? item.roleName : selectedRole.value}
                onChange={handleChange}
                className={styles.select}
            />

    }},

    {key:"actions",title:"",render:(item)=>(
            
            <div className={styles.actionCell}>
                <Button
                    to={`${item.id}/details`}
                    variant="fill"
                    bgColor="var(--button-save)"
                    color="var(--text-main)"
                >
                    Orders
                </Button>
            </div>)
        }

];
    return( <>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    isActions={false}
                />
                <Outlet  context={{createItem:actions.createItem,editItem:actions.editItem}}/>
            </>)
};

export default AdminUsersPage;