import { useEffect, useState, type FormEvent } from "react";
import useForm from "../../../../hooks/useForm";
import type { MovieCreate } from "../../../../types/movie.types";
import styles from "./MovieForm.module.css";
import movieValidator from "../../validators/movieValidator";
import Button from "../../../../components/Button/Button";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import ImageInput from "../../../../components/Form/ImageInput/ImageInput";
import { dateToYearFirst } from "../../../../helpers/textHelpers";
import Select from "../../../../components/Form/Select/Select";
import TextArea from "../../../../components/Form/TextArea/TextArea";
import { getAllActors } from "../../../../api/actorApi";
import toast from "react-hot-toast";
import type { ActorShort } from "../../../../types/actor.types";
import type { Genre } from "../../../../types/genre.types";
import { getAllGenres } from "../../../../api/genreApi";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import ActorOption from "../../actors/ActorOption/ActorOption";
import GenreOption from "../../../../components/Form/GenreOption/GenreOption";


export const LANGUAGE_OPTIONS = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'uk', label: '🇺🇦 Українська' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'de', label: '🇩🇪 Deutsch' },
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'pl', label: '🇵🇱 Polski' },
];

const initialData = {
    duration: 0,
    rating: 0,
    description: "",
    title: "",
    posterUrl: "",
    trailerUrl: "",
    language: "uk",
    releaseDate: "",
    startDate: "",
    endDate: "",
    genreIds: [],
    actorIds: [],
}

interface MovieFormProps{
    initialState?:MovieCreate;
    onSubmitAction:(data: MovieCreate) => Promise<void>;
}
const MovieForm = ({initialState,onSubmitAction}:MovieFormProps)=>{
    
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<MovieCreate>(initialState??initialData,movieValidator);
    const [isPending, setIsPending] = useState(false)
    const [actors, setActors] = useState<ActorShort[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getAllActors()
            .then((response)=>setActors(response.items))
            .catch(err =>{
                console.error(err)
                toast.error("Actors error")
            });
    }, []);

    useEffect(() => {
        getAllGenres()
            .then((response)=>setGenres(response.items))
            .catch(err =>{
                console.error(err)
                toast.error("Actors error")
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
                value={formData.title}
                error={errors.title}
                onValueChange={(v)=>handleChange("title",v)}
                label="Title"
                placeholder="Title"
                required
            />

            <div className={styles.datesContainer}>
                <BaseInput
                    value={formData.rating}
                    error={errors.rating}
                    onValueChange={(v)=>handleChange("rating",Number(v))}
                    type="number"
                    label="Rating(10)"
                    min={0}
                    max={10}
                    required
                />
                
                <BaseInput
                    value={formData.duration}
                    error={errors.duration}
                    onValueChange={(v)=>handleChange("duration",Number(v))}
                    type="number"
                    min={0}
                    label="Duration (in minutes) "
                    required
                />
            </div>

            <Select
                label="Language"
                options={LANGUAGE_OPTIONS}
                value={formData.language}
                onChange={(v)=>handleChange("language",v)}
                error={errors.language}
                required
            />
                
            <div className={styles.datesContainer}>
                <BaseInput
                    value={dateToYearFirst(new Date(formData.releaseDate))}
                    error={errors.releaseDate}
                    onValueChange={(v)=>handleChange("releaseDate",v)}
                    type="date"
                    label="Release Date"
                    required
                />

                <BaseInput
                    value={dateToYearFirst(new Date(formData.startDate))}
                    error={errors.startDate}
                    onValueChange={(v)=>handleChange("startDate",v)}
                    type="date"
                    label="First Date of rental"
                    required
                />
                
                <BaseInput
                    value={dateToYearFirst(new Date(formData.endDate))}
                    error={errors.endDate}
                    onValueChange={(v)=>handleChange("endDate",v)}
                    type="date"
                    label="Last Date of rental"
                    required
                />
            </div>

            <ImageInput
                value={formData.posterUrl}
                error={errors.posterUrl}
                onValueChange={(v)=>handleChange("posterUrl",v)}
                onValueClear={()=>handleChange("posterUrl","")}
                label="Poster Url"
                placeholder="Put Poster URL here.."
                className={styles.ImageInput}
                required
            />

            <ImageInput
                value={formData.trailerUrl}
                error={errors.trailerUrl}
                onValueChange={(v)=>handleChange("trailerUrl",v)}
                onValueClear={()=>handleChange("trailerUrl","")}
                label="Trailer"
                placeholder="Put trailer URL here.."
                className={styles.ImageInput}
                required
            />

            <div className={styles.datesContainer}>
                <SelectableInput
                    title="Genres"
                    error={errors.genreIds}
                    items={genres}
                    selectedIds={formData.genreIds}
                    onSelect={(item)=>handleChange("genreIds",[...formData.genreIds,Number(item.id)])}
                    onRemove={(item)=>handleChange("genreIds",formData.actorIds.filter(i=>i!==item))}
                    getLabel={(item)=>item.name}
                    renderOption={(item)=><GenreOption item={item} />}
                />

                <SelectableInput
                    title="Actors"
                    error={errors.actorIds}
                    items={actors}
                    selectedIds={formData.actorIds}
                    onSelect={(item)=>handleChange("actorIds",[...formData.actorIds,Number(item.id)])}
                    onRemove={(item)=>handleChange("actorIds",formData.actorIds.filter(i=>i!==item))}
                    getLabel={(item)=>`${item.firstName} ${item.lastName}`}
                    renderOption={(item)=><ActorOption item={item} />}
                />
            </div>
            <TextArea
                    value={formData.description}
                    error={errors.description}
                    onValueChange={(v)=>handleChange("description",v)}
                    label="Description"
                    required
                />

            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" to="..">Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
    )
}
export default MovieForm;