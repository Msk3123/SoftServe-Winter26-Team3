import type { ChangeEvent, ComponentProps } from "react";
import Button from "../../Button/Button";
import styles from "./ImageInput.module.css";
import BaseInput from "../BaseInput/BaseInput";
import { AiOutlineDelete } from "react-icons/ai";

interface ImageInputProps extends Omit<ComponentProps<"input">, "onChange"> {
    label?: string;
    error?: string;
    value?:string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
    onValueClear?: () => void;
}
const ImageInput=({
    label,
    error,
    value,
    onValueChange,
    onValueClear,
    className,
    type = "url",
    ...props
}:ImageInputProps)=>{

    return (
        <div className={`${styles.imageInput} ${className?className:""}`}>
                <BaseInput
                    value={value}
                    error={error}
                    onValueChange={onValueChange}
                    type={type}
                    label={label}
                    {...props}
                />
                <Button action={onValueClear} className={styles.clearButton} htmlType="button">< AiOutlineDelete/></Button>
                
                <div className={styles.imagePreviewWrapper}>
                    {value ? (
                        <img
                            src={value}
                            alt="Preview"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                            className={`${styles.imagePreview} ${error?styles.imagePlaceholder:""}`}
                            />
                    ) : (
                        <div className={styles.imagePlaceholder}>{label} will appear here</div>
                    )}
                </div>
            </div>
    )
}
export default ImageInput;