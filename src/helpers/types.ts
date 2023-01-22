export interface CreatedCar{
    name: string;
    color: string
}

export interface SingleCar extends CreatedCar{
    id: number
}

export type CarsData = Array<SingleCar>