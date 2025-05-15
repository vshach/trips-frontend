export interface StopOBJ{
    dayorder : number;
    id : number;	
	name : string;
	latitude : number;	
	longitude : number;
}

export interface StopsByDateResponse {
  date: string;
  listStops: StopOBJ[];
}