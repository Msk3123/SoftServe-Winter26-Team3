import { Outlet } from "react-router";
import  styles from  "./AdminMoviesPage.module.css"

const AdminMoviesPage : React.FC = ()=>{
    return(<div className={styles.container}>
                MoviesPage
                <Outlet />
            </div>)
};

export default AdminMoviesPage;