import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import type { AdminModalContext } from "../../../../types/admin.types";
import type { NewsCreate, NewsShort } from "../../../../types/news.types";
import { postNews } from "../../../../api/newsApi";
import NewsForm from "../NewsForm/NewsForm";

interface CreateNewsFormProps {
    onClose?:()=>void;
}

const CreateNewsForm = ({onClose}:CreateNewsFormProps)=>{

    const {createItem} = useOutletContext<AdminModalContext<NewsShort>>();
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
                const news = await postNews(formData);
                if(news){
                    createItem({
                        id:news.id,
                        title: news.title,
                        shortContent: news.newsContent.slice(0, 150),
                        imageUrl: news.imageUrl,
                        publishedDate: news.publishedDate,
                    });
                    toast.success("News succesfully added!")
                    handleClose();
                }
            }catch{
                toast.error("Can`t add this news");
            }
        }

    return <NewsForm onSubmitAction={onSubmit} onClose={handleClose}/>
}

export default CreateNewsForm;