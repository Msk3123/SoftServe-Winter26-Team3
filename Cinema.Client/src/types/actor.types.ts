export interface ActorShort{
    id: number|string,
    firstName: string,
    lastName: string,
    photoUrl: string,
}

export interface Actor{
    id: number|string,
    firstName: string,
    lastName: string,
    photoUrl: string,
    biography: string,
    birthday: string,
    movies:string[],
}