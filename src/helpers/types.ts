export interface CreatedCar {
    name: string;
    color: string;
}

export interface SingleCar extends CreatedCar {
    id: number;
}

export type CarsData = Array<SingleCar>;

type GarageOrWinners = 'garage' | 'winners';

export interface StateData {
    currentPage: GarageOrWinners;
    garagePage: number;
    winnersPage: number;
    winnersTotal: number;
    winnersData: CarsData;
    carsData: CarsData;
    carsTotal: number;
    sortBy: string | null;
    sortOrder: string | null;
    selectedCar: number | null;
    animation: Record<number, { id?: number }>;
    controller: AbortController;
}

export interface GetCarsData {
    data: CarsData;
    carsTotal: number;
}

export type TSort = 'id' | 'wins' | 'time';
export type TOrder = 'ASC' | 'DESC';

export interface IWinnersRequest {
    page: number;
    limit?: number;
    sort?: TSort;
    order?: TOrder;
}

export interface ICarVelocity {
    velocity: number;
    distance: number;
}

export interface ISuccessDrive {
    success: boolean;
}
