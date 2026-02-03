import { useEffect, useState, type FormEvent } from "react";
import useForm from "../../../../hooks/useForm";
import type { SessionCreate} from "../../../../types/session.types";
import { getAllMovies } from "../../../../api/movieApi";
import toast from "react-hot-toast";
import type { MovieShort } from "../../../../types/movie.types";
import Button from "../../../../components/Button/Button";
import styles from "./SingleSessionForm.module.css"
import type { HallShort } from "../../../../types/hall.types";
import { getAllHalls } from "../../../../api/hallApi";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import MovieOption from "../../movies/MovieOption/MovieOption";
import HallOption from "../../halls/HallOption";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import { dateToYearFirst } from "../../../../helpers/textHelpers";
import singleSessionValidator from "../../validators/singleSessionValidator";

interface SingleSessionFormProps{
    initialState?:SessionCreate;
    onSubmitAction:(data: SessionCreate) => Promise<void>;
    onClose?:()=>void;
}


const initialData = {
    movieId: 0,
    hallId: 0,
    sessionDate: dateToYearFirst(new Date()),
    sessionTime: "",
}
const SingleSessionForm =  ({initialState,onSubmitAction,onClose}:SingleSessionFormProps) => {
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<SessionCreate>(initialState??initialData,singleSessionValidator);
    const [isPending, setIsPending] = useState(false);
    const [movies, setMovies] = useState<MovieShort[]>([]);
    const [halls, setHalls] = useState<HallShort[]>([]);

    useEffect(() => {
        getAllMovies({pageSize:50,page:1,sortBy:"releaseDate",order:"desc"})
            .then((response)=>setMovies(response.items))
            .catch(err =>{
                console.error(err)
                toast.error("Movies error")
            });
    }, []);

    useEffect(() => {
        getAllHalls()
            .then((response)=>setHalls(response.items))
            .catch(err =>{
                console.error(err)
                toast.error("Halls error")
            });
    }, []);

    const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            setIsPending(true);
            await handleSubmit(onSubmitAction)
            setIsPending(false);
        }

    return (
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""}>

            <SelectableInput
                title="Movie"
                error={errors.movieId}
                items={movies}
                selectedIds={formData.movieId?[formData.movieId]:[]}
                onSelect={(item)=>handleChange("movieId",item.id)}
                onRemove={()=>handleChange("movieId",0)}
                getLabel={(item)=>item.title}
                renderOption={(item)=><MovieOption item={item} />}
                multiple={false}
            />

            <SelectableInput
                title="Hall"
                
                error={errors.hallId}
                items={halls}
                selectedIds={formData.hallId?[formData.hallId]:[]}
                onSelect={(item)=>handleChange("hallId",Number(item.id))}
                onRemove={(item)=>handleChange("hallId",0)}
                getLabel={(item)=>item.hallName}
                renderOption={(item)=><HallOption item={item} />}
                multiple={false}
            />
            <div className={styles.datesContainer}>
                <BaseInput
                    value={dateToYearFirst(new Date(formData.sessionDate))}
                    autoComplete="bday-day"
                    error={errors.sessionDate}
                    onValueChange={(v)=>handleChange("sessionDate",v)}
                    type="date"
                    label="Date"
                    required
                />
                
                <BaseInput
                    type="time"
                    label="Time"
                    autoComplete="one-time-code"
                    error={errors.sessionTime}
                    value={formData.sessionTime}
                    onValueChange={(v)=>handleChange("sessionTime",v)}
                    step="600"
                    />
            </div>

            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
        );
}

export default SingleSessionForm ;