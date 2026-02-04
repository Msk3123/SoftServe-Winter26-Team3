export interface SeatShort{
    id:number;
    row:number;
    seatNo:number;
    seatTypeName:string;
    hallName: string;
}

export interface SeatDetails{
    id:number;
    row:number;
    seatNo:number;
    seatTypeId: number;
    seatTypeName:string;
    basePrice:number;
    hallId:number;
}

export interface SeatCreate{
    Row: number;
    SeatNo: number;
    SeatTypeId: number;
    HallId: number;
}