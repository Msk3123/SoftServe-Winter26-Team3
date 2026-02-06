export interface AdminAdminModalContext<T>{
    createItem: (item: T) => void;
    editItem:(item: T) => void;
}