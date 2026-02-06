export interface SeatShort{
    id:number|string;
    row:number;
    seatNo:number;
    seatTypeName:string;
    hallName: string;
}

export interface SeatDetails{
    id:number;
    row:number;
    seatNo:number;
    seatTypeId: number|string;
    seatTypeName:string;
    basePrice:number;
    hallId:number|string;
}

export interface SeatCreate{
    Row: number;
    SeatNo: number;
    SeatTypeId: number|string;
    HallId: number|string;
}