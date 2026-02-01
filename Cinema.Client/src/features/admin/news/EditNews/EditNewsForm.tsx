import { useLoaderData, useNavigate, useOutletContext} from "react-router";
import toast from "react-hot-toast";
import type { AdminModalContext } from "../../../../types/admin.types";
import type { News, NewsCreate, NewsShort } from "../../../../types/news.types";
import { putNews } from "../../../../api/newsApi";
import NewsForm from "../NewsForm/NewsForm";

const EditNewsForm = ()=>{
    const initialState = useLoaderData() as News;

    const {editItem} = useOutletContext<AdminModalContext<NewsShort>>();
    const navigate = useNavigate();
    
    const handleClose = ()=>{
        navigate("..");
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

    return <NewsForm onSubmitAction={onSubmit}/>
}

export default EditNewsForm;