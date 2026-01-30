import { useState, type FormEvent } from "react";
import Button from "../../../components/Button/Button";
import BaseInput from "../../../components/Form/BaseInput/BaseInput";
import TextArea from "../../../components/Form/TextArea/TextArea";
import Select from "../../../components/Form/Select/Select";
import { Checkbox } from "../../../components/Form/CheckBox/CheckBox";

const SessionForm =  () => {
    const [inputValue,setInputValue] = useState<string>("");
    const [category, setCategory] = useState('');
    const [error, setError] = useState<string|undefined>(undefined);
    const [isActive, setIsActive] = useState(false);

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("wrong value")
    }
    const categories = [
    { value: 'coding', label: 'Coding' },
    { value: 'design', label: 'Design' },
    { value: 'meeting', label: 'Meeting' },
  ];

    return (
        <form onSubmit={handleSubmit}>
            <BaseInput
            value={inputValue}
            onValueChange={(v)=>setInputValue(v)}
            label="Session Name"
            error={error}
            />
            <TextArea error={error}/>
            <Select
                label="Category"
                placeholder="Choose category"
                options={categories}
                value={category}
                onChange={setCategory}
                error={error}
            />

        <Checkbox
            label="Make this session private" 
            checked={isActive} 
            onChange={setIsActive} 
            error={error}
/>  

            <Button htmlType="submit">Submit</Button>
        </form>
        );
}

export default SessionForm ;