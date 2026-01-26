import { Outlet } from "react-router";
import  styles from  "./AdminSessionsPage.module.css"
import Table from "../../../components/Table/Table";
import ControlPanel from "../../../components/ControlPanel/ControlPanel";
const data =[
    {id:0,value:"action",role:"main",admin:true},
    {id:1,value:"drama",role:"secondary",admin:true},
    {id:2,value:"romantic",role:"main",admin:false},
    {id:3,value:"asd",role:"secondary",admin:false},
    {id:4,value:"rasd",role:"main",admin:true},
    {id:5,value:"rasd",role:"main",admin:false},
] as const;

const AdminSessionsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                <ControlPanel/>
                <Table data={data}/>
                <Outlet />
            </div>)
};

export default AdminSessionsPage;