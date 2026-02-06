export interface SeatTypeCreate{
    name:string;
    basePrice:number;
}

export interface SeatType extends SeatTypeCreate{
    id: number|string;
}
export interface SeatTypeWithColor{seatType:SeatType,color:string};