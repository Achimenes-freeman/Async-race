import { state } from './state';
import {
    GetCarsData,
    CreatedCar,
    SingleCar,
    IWinnersRequest,
    ICarVelocity,
    ISuccessDrive,
    IUpdatedWinner,
    IReceivedAndCreatedWinner,
    GetWinnersData,
} from './types';

const BASE_URL = 'http://127.0.0.1:3000';
export const MAX_GARAGE_PAGE_CARS_ON_LIST = 7;
export const MAX_WINNERS_ON_LIST = 10;

export const getCarsData = async (
    page: number,
    limit: number = MAX_GARAGE_PAGE_CARS_ON_LIST
): Promise<GetCarsData> => {
    const response = await fetch(
        `${BASE_URL}/garage?_page=${page}&_limit=${limit}`
    );
    return {
        data: await response.json(),
        carsTotal: Number(response.headers.get('X-Total-Count')),
    };
};

export const getWinnersData = async ({
    page,
    sort,
    order,
    limit = MAX_WINNERS_ON_LIST,
}: IWinnersRequest): Promise<GetWinnersData> => {
    const response = await fetch(
        `${BASE_URL}/winners?_page=${page}&_limit=${limit}${
            sort && order ? `&_sort=${sort}&_order=${order}` : ''
        }`
    );
    const result: GetWinnersData = response.ok
        ? {
              data: await response.json(),
              winnersTotal: Number(response.headers.get('X-Total-Count')),
          }
        : { data: [], winnersTotal: 0 };

    return result;
};

export const getCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`);

    return await response.json();
};

export const createCar = async (car: CreatedCar): Promise<SingleCar> => {
    const response = await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });

    return await response.json();
};

export const updateCar = async (car: CreatedCar): Promise<SingleCar> => {
    const response = await fetch(`${BASE_URL}/garage/${state.selectedCar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });

    return await response.json();
};

export const deleteCarFromGarage = async (id: number): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'DELETE',
    });

    return response.ok;
};

export const deleteCarFromWinners = async (id: number): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/winners/${id}`, {
        method: 'DELETE',
    });

    return response.ok;
};

export const startEngine = async (
    id: number,
    signal: AbortSignal
): Promise<ICarVelocity> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
        method: 'PATCH',
        signal,
    });

    return await response.json();
};

export const stopEngine = async (id: number): Promise<ICarVelocity> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
        method: 'PATCH',
    });

    return await response.json();
};

export const drive = async (
    id: number,
    signal: AbortSignal
): Promise<ISuccessDrive> => {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
        method: 'PATCH',
        signal,
    });

    return await response.json();
};

const updateWinner = async (id: number, body: IUpdatedWinner) => {
    const response = await fetch(`${BASE_URL}/winners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...body }),
    });

    return response.ok;
};

export const addNewWinner = async (body: IReceivedAndCreatedWinner) => {
    const response = await fetch(`${BASE_URL}/winners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
};

export const getWinner = async (id: number, winnerTime: number) => {
    try {
        const response = await fetch(`${BASE_URL}/winners/${id}`);
        if (response.status === 404) {
            throw new Error('404');
        }
        const { wins, time } = await response.json();

        updateWinner(id, {
            wins: wins + 1,
            time: winnerTime < time ? winnerTime : time,
        });
    } catch (error) {
        addNewWinner({ id, wins: 1, time: winnerTime });
    }
};
