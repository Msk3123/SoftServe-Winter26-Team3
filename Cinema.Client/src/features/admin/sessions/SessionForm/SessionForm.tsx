import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import useForm from "../../../../hooks/useForm";
import type { CreateSessionsBatch } from "../../../../types/session.types";
import sessionValidator from "../../validators/sessionValidator";
import { getAllMovies } from "../../../../api/movieApi";
import toast from "react-hot-toast";
import type { MovieShort } from "../../../../types/movie.types";
import Button from "../../../../components/Button/Button";
import styles from "./SessionForm.module.css"
import type { HallShort } from "../../../../types/hall.types";
import { getAllHalls } from "../../../../api/hallApi";
import { SelectableInput } from "../../../../components/Form/SelectableInput/SelectableInput";
import MovieOption from "../../movies/MovieOption/MovieOption";
import HallOption from "../../halls/HallOption";
import BaseInput from "../../../../components/Form/BaseInput/BaseInput";
import { dateToYearFirst } from "../../../../helpers/textHelpers";
import { Checkbox } from "../../../../components/Form/CheckBox/CheckBox";

import { AiOutlineDelete } from "react-icons/ai";
import checkIsDayInPeriod from "./checkIsDayInWeek";

interface SessionFormProps{
    initialState?:CreateSessionsBatch;
    onSubmitAction:(data: CreateSessionsBatch) => Promise<void>;
    onClose:()=>void;
}

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const initialData = {
    movieId: 0,
    hallId: 0,
    startDate: dateToYearFirst(new Date()),
    endDate: dateToYearFirst(new Date()),
    dailySchedule: [],
    weekDays: [],
}
const SessionForm =  ({initialState,onSubmitAction,onClose}:SessionFormProps) => {
    const {formData,errors,isSubmitting,handleChange,handleSubmit} = useForm<CreateSessionsBatch>(initialState??initialData,sessionValidator);
    const [isPending, setIsPending] = useState(false);
    const [movies, setMovies] = useState<MovieShort[]>([]);
    const [halls, setHalls] = useState<HallShort[]>([]);
    const [time,setTime] = useState<string>("");

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

    const handleAddTime = (newTime: string) => {
        if (!newTime) return;

        if (formData.dailySchedule.includes(newTime)) {
            return;
        }

        handleChange("dailySchedule",[...formData.dailySchedule, newTime]);

    };

    const removeTime = (indexToRemove: number) => {
        handleChange("dailySchedule", formData.dailySchedule.filter((_, index) => index !== indexToRemove));
    }


    useEffect(() => {
    
        if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            toast.error("Please select valid start and end dates");
            return;
        }

        if (start > end) {
            toast.error("Start date cannot be after end date");
            return;
        }

        const selectedDays = new Set<number>();
        const current = new Date(start);

        const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
        if (daysDiff >= 6) {
            handleChange("weekDays", [1, 2, 3, 4, 5, 6, 0]);
            return;
        }

        while (current <= end) {
            selectedDays.add(current.getDay());
            current.setDate(current.getDate() + 1);
        }

        handleChange("weekDays", Array.from(selectedDays));
    }
}, [formData.startDate, formData.endDate]);


    return (
        <form onSubmit={onSubmit} className={isPending ? styles.pendingForm:""} noValidate>

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
                onSelect={(item)=>handleChange("hallId",item.id)}
                onRemove={(item)=>handleChange("hallId",0)}
                getLabel={(item)=>item.hallName}
                renderOption={(item)=><HallOption item={item} />}
                multiple={false}
            />
            <div className={styles.datesContainer}>
                <BaseInput
                    value={dateToYearFirst(new Date(formData.startDate))}
                    error={errors.startDate}
                    onValueChange={(v)=>handleChange("startDate",v)}
                    type="date"
                    label="First Date"
                    required
                />
                
                <BaseInput
                    value={dateToYearFirst(new Date(formData.endDate))}
                    error={errors.endDate}
                    onValueChange={(v)=>handleChange("endDate",v)}
                    type="date"
                    label="Last Date"
                    required
                />
            </div>
            <div className={styles.datesContainer}>
            {[1,2,3,4,5,6,0].map(v=>{
                const isAvailable = checkIsDayInPeriod(v, formData.startDate, formData.endDate);

                return <Checkbox
                            key={v}
                            label={weekDays[v]}
                            checked={formData.weekDays.includes(v)}
                            error={errors.weekDays}
                            disabled={!isAvailable}
                            onChange={(checked) => {
                                const nextValue = checked
                                    ? [...formData.weekDays, v]
                                    : formData.weekDays.filter((day) => day !== v);
        
                            handleChange("weekDays", nextValue);
                            }}
                        />
            })}
            </div>

            <div className={styles.dailyScheduleContainer}>
                {formData.dailySchedule.map((v,i)=>
                    <div key={v} className={styles.dailySchedule}>
                        {v}
                        <Button  action={()=>removeTime(i)}><AiOutlineDelete /></Button>
                    </div>
                )}
            </div>

            <div className={styles.timeForm} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddTime(time);
                }
            }}>
                <BaseInput
                    type="time"
                    label="Time"
                    error={errors.dailySchedule}
                    onValueChange={setTime}
                    step="600"
                    />
                <Button action={() => handleAddTime(time)}>Add</Button>
            </div>
            
            <div className={styles.actions}>
                <Button bgColor="var(--button-cancel)" action={onClose}>Cancel</Button>
                <Button htmlType="submit" disabled={isSubmitting}>Submit</Button>
            </div>
        </form>
        );
}

export default SessionForm ;