import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalProps {
    children: React.ReactNode;
    title?: string;
}

const Modal = ({ children, title }: ModalProps) => {
    const navigate = useNavigate();

    const handleClose =useCallback(() => {
        navigate("..");
    },[navigate]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    return createPortal(
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    {title && <h2>{title}</h2>}
                    <Button action={handleClose} variant="text-only" className={styles.closeBtn} color="var(--text-main-dark)"><IoClose /></Button>
                </div>
                
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;