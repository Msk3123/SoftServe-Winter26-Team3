import styles from "./NewsForm.module.css";
import useForm from "../../../../hooks/useForm";
import Button from "../../../../components/Button/Button";
import { useEffect, useState, type FormEvent } from "react";
import { GENERAL_TAG_ID, type NewsCreate } from "../../../../types/news.types";
import newsValidator from "../../validators/newsValidator";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import TextArea from "../../../../components/Form/TextArea/TextArea";
import ImageInput from "../../../../components/Form/ImageInput/ImageInput";
import { Checkbox } from "../../../../components/Form/CheckBox/CheckBox";
import { getAllMovies } from "../../../../api/movieApi";
import type { MovieShort } from "../../../../types/movie.types";
import type { ActorShort } from "../../../../types/actor.types";
import { getAllTags, postTag } from "../../../../api/tagApi";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import MovieOption from "../../movies/MovieOption/MovieOption";
import { getAllActors } from "../../../../api/actorApi";
import ActorOption from "../../actors/ActorOption/ActorOption";
import { dateToYearFirst } from "../../../../helpers/textHelpers";
import { handleError } from "../../../../helpers/handleError";
import type { Tag } from "../../../../types/tags.types";

const initialData = {
    title: "",
    newsContent: "",
    imageUrl: "",
    publishedDate: dateToYearFirst(new Date()),
    tagId: GENERAL_TAG_ID,
    isActive: false,
    movieId: undefined,
    actorId: undefined,
}

interface NewsFormProps{
    initialState?:NewsCreate;
    onSubmitAction:(data: NewsCreate) => Promise<void>;
    onClose:()=>void;
}
const NewsForm = ({initialState,onSubmitAction,onClose}:NewsFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<NewsCreate>(initialState??initialData,newsValidator);
    const [isPending, setIsPending] = useState(false);

    const [tags, setTags] = useState<Tag[]>([]);
    const [movies, setMovies] = useState<MovieShort[]>([]);
    const [actors, setActors] = useState<ActorShort[]>([]);

    useEffect(() => {
        getAllTags()
            .then((response)=>setTags(response.items))
            .catch(err =>{
                handleError(err,"Tags error")
            });
    }, []);

    useEffect(() => {
        getAllMovies()
            .then((response)=>setMovies(response.items))
            .catch(err =>{
                handleError(err,"Movies error")
            });
    }, []);

    useEffect(() => {
        getAllActors()
            .then((response)=>setActors(response.items))
            .catch(err =>{
                handleError(err,"Actors error")
            });
    }, []);


    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsPending(true);
        await handleSubmit(onSubmitAction)
        setIsPending(false);
    }

    const createTag = async (q:string)=>{
        try{
            const newTag = await postTag({tagName:q});
            handleChange("tagId",newTag.id);
            setTags(tags=>[...tags,newTag]);
        }catch(e){
            handleError(e,"Couldn't create new tag")
        }
    }

    return(
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>
                <BaseInput
                    value={formData.title}
                    error={errors.title}
                    onValueChange={(v)=>handleChange("title",v)}
                    label="Title"
                    placeholder="Title"
                    required
                />

                <BaseInput
                    value={dateToYearFirst(new Date(formData.publishedDate))}
                    error={errors.publishedDate}
                    onValueChange={(v)=>handleChange("publishedDate",v)}
                    type="date"
                    label="Published Date"
                    required
                />

                <ImageInput
                    value={formData.imageUrl}
                    error={errors.imageUrl}
                    onValueChange={(v)=>handleChange("imageUrl",v)}
                    onValueClear={()=>handleChange("imageUrl","")}
                    label="Image"
                    placeholder="Put image URL here.."
                    required
                />

                <TextArea
                    value={formData.newsContent}
                    error={errors.newsContent}
                    onValueChange={(v)=>handleChange("newsContent",v)}
                    label="Content"
                    required
                />

                <Checkbox
                    label="Active"
                    checked = {formData.isActive}
                    onChange={(v)=>handleChange("isActive",v)}
                    error={errors.isActive}
                />

                <SelectableInput
                    title="Tag"
                    error={errors.tagId}
                    items={tags}
                    selectedIds={formData.tagId?[formData.tagId]:[]}
                    onSelect={(item)=>handleChange("tagId",item.id)}
                    onRemove={()=>handleChange("tagId",GENERAL_TAG_ID)}
                    getLabel={(item)=>item.tagName}
                    renderOption={(item)=> <div key={item.id} className={styles.tagOption}>{item.tagName}</div>}
                    onCreateNew={createTag}
                    multiple={false}
                />

                <SelectableInput
                    title="Movie (optional)"
                    error={errors.movieId}
                    items={movies}
                    selectedIds={formData.movieId? [formData.movieId] : []}
                    onSelect={(item)=>handleChange("movieId",item.id)}
                    onRemove={()=>handleChange("movieId",undefined)}
                    getLabel={(item)=>item.title}
                    renderOption={(item)=><MovieOption item={item} />}
                />

                <SelectableInput
                    title="Actor (optional)"
                    error={errors.actorId}
                    items={actors}
                    selectedIds={formData.actorId ? [formData.actorId] :[]}
                    onSelect={(item)=>handleChange("actorId",item.id)}
                    onRemove={()=>handleChange("actorId",undefined)}
                    getLabel={(item)=>`${item.firstName} ${item.lastName}`}
                    renderOption={(item)=><ActorOption item={item} />}
                />


            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default NewsForm;