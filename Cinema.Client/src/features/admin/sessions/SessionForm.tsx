import { useState, type FormEvent } from "react";
import Button from "../../../components/Button/Button";
import BaseInput from "../../../components/Form/BaseInput/BaseInput";
import TextArea from "../../../components/Form/TextArea/TextArea";

const SessionForm =  () => {
    const [inputValue,setInputValue] = useState<string>("");
    const [error, setError] = useState<string|undefined>(undefined);

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("wrong value")
    }
    return (
        <form onSubmit={handleSubmit}>
            <BaseInput
            value={inputValue}
            onValueChange={(v)=>setInputValue(v)}
            label="Session Name"
            error={error}
            />
            <TextArea/>

            <Button htmlType="submit">Submit</Button>
        </form>
        );
}

export default SessionForm ;