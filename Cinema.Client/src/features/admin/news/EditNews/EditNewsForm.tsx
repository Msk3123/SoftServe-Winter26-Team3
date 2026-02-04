import { useLoaderData, useNavigate, useOutletContext} from "react-router";
import toast from "react-hot-toast";
import type { AdminAdminModalContext } from "../../../../types/admin.types";
import { mapNewsToCreate, type News, type NewsCreate, type NewsShort } from "../../../../types/news.types";
import { putNews } from "../../../../api/newsApi";
import NewsForm from "../NewsForm/NewsForm";

interface EditNewsFormProps {
    onClose?:()=>void;
}
const EditNewsForm = ({onClose}:EditNewsFormProps)=>{
    const initialState = useLoaderData() as News;

    const {editItem} = useOutletContext<AdminAdminModalContext<NewsShort>>();
    const navigate = useNavigate();
    
        
    const handleClose = ()=>{
        if(onClose){
            onClose();
        }else{
            navigate("..");
        }
        
    }
    
    const onSubmit = async (formData:NewsCreate)=>{
            
            try{
                await putNews(initialState.id,formData);
                    
                editItem({
                        id:initialState.id,
                        title: formData.title,
                        shortContent: formData.newsContent.slice(0, 150),
                        imageUrl: formData.imageUrl,
                        publishedDate: formData.publishedDate,
                    });
                
                toast.success("News succesfully updated!")
                handleClose();

            }catch{
                toast.error("Can`t add this news");
            }
        }

    return <NewsForm initialState={mapNewsToCreate(initialState)} onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default EditNewsForm;