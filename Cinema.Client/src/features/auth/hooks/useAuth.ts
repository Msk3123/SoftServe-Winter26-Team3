import { useContext } from 'react';
import { AuthContext } from '../model/AuthContext';

export function useAuth() {
    return useContext(AuthContext);
}
