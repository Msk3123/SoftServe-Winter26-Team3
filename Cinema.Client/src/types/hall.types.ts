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
// export const mapHallToCreate = (hall:HallShort):HallCreate=>{
//     return {
//         hallName:hall.hallName,
//         rows:number;
//         seatsPerRow:number;
//     }
// }