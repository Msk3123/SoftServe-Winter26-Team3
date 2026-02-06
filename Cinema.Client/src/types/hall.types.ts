export interface HallShort{
    id: number|string;
    hallName: string;
    capacity: number;
}

export interface  HallCreate{
    hallName:string;
    rows:number
    seatsPerRow:number;
}
export const mapHallToCreate = (hall:HallShort,dimensions:{rows:number,seatsPerRow:number}):HallCreate=>{
    return {
        hallName:hall.hallName,
        rows:dimensions.rows,
        seatsPerRow:dimensions.seatsPerRow
    }
}