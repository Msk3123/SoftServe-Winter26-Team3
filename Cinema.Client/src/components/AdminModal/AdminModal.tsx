import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./AdminModal.module.css";
import Button from "../Button/Button";

interface AdminModalProps {
    children: React.ReactNode;
    title?: string;
    onClose?:()=>void;
}

const AdminModal = ({ children, title,onClose }: AdminModalProps) => {
    const navigate = useNavigate();
    const AdminModalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            navigate("..");
        }
    }, [navigate, onClose]);

    useEffect(() => {

        const handleEsc = (e: KeyboardEvent) => {
            if(e.key==="Escape"){
                const allAdminModals = document.querySelectorAll(`.${styles.overlay}`);
                
                if (allAdminModals[allAdminModals.length - 1] === AdminModalRef.current) {
                    handleClose();
                }
            }

        };

        window.addEventListener("keydown", handleEsc);
        
        return () => {
            window.removeEventListener("keydown", handleEsc);
        }
    }, [handleClose]);

    return createPortal(
        <div className={styles.overlay} ref={AdminModalRef} onClick={handleClose}>
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

export default AdminModal;