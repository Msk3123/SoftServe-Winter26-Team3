export interface ActorShort{
    id: number|string,
    firstName: string,
    lastName: string,
    photoUrl: string,
}

export interface ActorCreate {
    firstName: string;
    lastName: string;
    biography: string;
    birthday: string;
    photoUrl: string;
}


export interface Actor extends ActorCreate{
    id: number|string;
    movies:string[];
}