import { useState } from "react";
import AdminModal from "../../../components/AdminModal/AdminModal";
import { authApi } from "../../../api/authApi";
import type { ApiError } from "../../../types/api.types";
import Button from "../../../components/Button/Button";
import BaseInput from "../../../components/Form/BaseInput/BaseInput";
import { useNavigate } from "react-router";
interface PasswordConfirmModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
}
const PasswordConfirmModal = ({ isOpen, onClose, onConfirm }:PasswordConfirmModalProps) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleVerify = async () => {
        try {
            await authApi.verifyPassword(password);
            onConfirm();
            onClose();
        } catch (e) {
            
            const err = e as ApiError
            if(err.statusCode==401){
                navigate("/auth/login");
            }else{
                setError(err.message);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AdminModal onClose={onClose}>
            <h3>Confirm action</h3>
            <p>Enter your password to continue</p>
            <BaseInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
            />
            <Button action={handleVerify}>Submit</Button>
            </AdminModal>
    );
};

export default PasswordConfirmModal;