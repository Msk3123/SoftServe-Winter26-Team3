import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalProps {
    children: React.ReactNode;
    title?: string;
    onClose?:()=>void;
}

const Modal = ({ children, title,onClose }: ModalProps) => {
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            navigate("..");
        }
    }, [navigate, onClose]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            const allModals = document.querySelectorAll(`.${styles.overlay}`);
            
            if (allModals[allModals.length - 1] === modalRef.current) {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    return createPortal(
        <div className={styles.overlay} ref={modalRef} onClick={handleClose}>
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