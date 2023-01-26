export interface CreatedCar {
    name: string;
    color: string;
}

export interface SingleCar extends CreatedCar {
    id: number;
}

export type WinnersData = Array<IReceivedAndCreatedWinner>;

export type CarsData = Array<SingleCar>;

type GarageOrWinners = 'garage' | 'winners';

export interface StateData {
    currentPage: GarageOrWinners;
    garagePage: number;
    winnersPage: number;
    winnersTotal: number;
    winnersData: WinnersData;
    carsData: CarsData;
    carsTotal: number;
    sortBy: 'id' | 'wins' | 'time' | null;
    sortOrder: 'ASC' | 'DESC' | null;
    selectedCar: number | null;
    animation: Record<number, { id?: number }>;
    controller: AbortController;
    hasWinner: boolean;
}

export interface GetCarsData {
    data: CarsData;
    carsTotal: number;
}

export interface GetWinnersData {
    data: WinnersData;
    winnersTotal: number;
}

export type TSort = 'id' | 'wins' | 'time' | null;
export type TOrder = 'ASC' | 'DESC' | null;

export interface IWinnersRequest {
    page: number;
    sort?: TSort;
    order?: TOrder;
    limit?: number;
}

export interface ICarVelocity {
    velocity: number;
    distance: number;
}

export interface ISuccessDrive {
    success: boolean;
}

export interface IUpdatedWinner {
    wins: number;
    time: number;
}

export interface IReceivedAndCreatedWinner extends IUpdatedWinner {
    id: number;
}
