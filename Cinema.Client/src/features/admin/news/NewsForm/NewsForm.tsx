import styles from "./NewsForm.module.css";
import useForm from "../../../../hooks/useForm";
import Button from "../../../../components/Button/Button";
import { useEffect, useState, type FormEvent } from "react";
import type { NewsCreate } from "../../../../types/news.types";
import newsValidator from "../../validators/newsValidator";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import TextArea from "../../../../components/Form/TextArea/TextArea";
import ImageInput from "../../../../components/Form/ImageInput/ImageInput";
import { Checkbox } from "../../../../components/Form/CheckBox/CheckBox";
import Select from "../../../../components/Form/Select/Select";
import { getAllMovies } from "../../../../api/movieApi";
import type { MovieShort } from "../../../../types/movie.types";
import type { ActorShort } from "../../../../types/actor.types";
import toast from "react-hot-toast";
import { getAllTags } from "../../../../api/tagApi";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import MovieOption from "../../movies/MovieOption/MovieOption";
import { getAllActors } from "../../../../api/actorApi";
import ActorOption from "../../actors/ActorOption/ActorOption";


const initialData = {
    title: "",
    newsContent: "",
    imageUrl: "",
    publishedDate: "",
    tagId:1,//general tag
    isActive: false,
    movieId: undefined,
    actorId: undefined,
}

interface NewsFormProps{
    initialState?:NewsCreate;
    onSubmitAction:(data: NewsCreate) => Promise<void>;
}
const NewsForm = ({initialState,onSubmitAction}:NewsFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<NewsCreate>(initialState??initialData,newsValidator);
    const [isPending, setIsPending] = useState(false);

    const [tags, setTags] = useState<{value:number|string , label:string}[]>([]);
    const [movies, setMovies] = useState<MovieShort[]>([]);
    const [actors, setActors] = useState<ActorShort[]>([]);

    useEffect(() => {
        getAllTags()
            .then((response)=>response.items)
            .then(items=>
                setTags(items.map((v)=>({value:v.id, label: v.tagName}))))
            .catch(err => toast.error("Tag error"));
    }, []);

    useEffect(() => {
        getAllMovies().then((response)=>setMovies(response.items)).catch(err => toast.error("Movies error"));
    }, []);

    useEffect(() => {
        getAllActors().then((response)=>setActors(response.items)).catch(err => toast.error("Actors error"));
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
                    value={formData.title}
                    error={errors.title}
                    onValueChange={(v)=>handleChange("title",v)}
                    label="Title"
                    placeholder="Title"
                    required
                />

                <BaseInput
                    value={formData.publishedDate}
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

                <Select
                    value={formData.tagId}
                    options={tags}
                    error={errors.tagId}
                    onChange={(v)=>handleChange("tagId",Number(v))}
                    label="Tag"
                    required
                />

                <SelectableInput
                    title="Movie (optional)"
                    error={errors.movieId}
                    items={movies}
                    selectedIds={formData.movieId?[formData.movieId]:[]}
                    onSelect={(item)=>handleChange("movieId",item.id)}
                    onRemove={(item)=>handleChange("movieId",undefined)}
                    getLabel={(item)=>item.title}
                    renderOption={(item)=><MovieOption item={item} />}
                />

                <SelectableInput
                    title="Actor (optional)"
                    error={errors.actorId}
                    items={actors}
                    selectedIds={formData.actorId?[formData.actorId]:[]}
                    onSelect={(item)=>handleChange("actorId",item.id)}
                    onRemove={(item)=>handleChange("actorId",undefined)}
                    getLabel={(item)=>`${item.firstName} ${item.lastName}`}
                    renderOption={(item)=><ActorOption item={item} />}
                />


            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" to="..">Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default NewsForm;