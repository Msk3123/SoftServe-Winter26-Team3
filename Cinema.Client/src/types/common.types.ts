import type { ReactNode } from "react";

export interface ColumnDef<T>{
    key:keyof T | "actions";
    title:string;
    render?: (item: T) => ReactNode;
}
