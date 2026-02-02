export interface AdminModalContext<T>{
    createItem: (item: T) => void;
    editItem:(item: T) => void;
}