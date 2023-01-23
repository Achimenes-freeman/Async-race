import { GetCarsData, CreatedCar, SingleCar, IWinnersRequest } from './types';

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
    limit = MAX_WINNERS_ON_LIST,
    sort,
    order,
}: IWinnersRequest): Promise<GetCarsData> => {
    const response = await fetch(
        `${BASE_URL}/winners?_page=${page}&_limit=${limit}${
            sort && order ? `&_sort=${sort}&_order=${order}` : ''
        }`
    );
    const result: GetCarsData = response.ok
        ? {
              data: await response.json(),
              carsTotal: Number(response.headers.get('X-Total-Count')),
          }
        : { data: [], carsTotal: 0 };

    return result;
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
