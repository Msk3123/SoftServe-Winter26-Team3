export interface AdminModalContext<T>{
    createItem: (item: T) => void;
    editItem:(item: T) => void;
}
export type WithDelete<T> = T & {
    deleteItem: (id: number|string) => void;
};
export type WithRefresh<T> = T & {
    refresh:()=>void,
};

export type AdminModalContextWithDelete<T> = WithDelete<AdminModalContext<T>>;
export type AdminModalContextWithRefresh<T> = WithRefresh<AdminModalContext<T>>;