import { getCarsData, getWinnersData } from './api';
import { StateData } from './types';

const { data: carsData, carsTotal } = await getCarsData(1);
const { data: winnersData, carsTotal: winnersTotal } = await getWinnersData({
    page: 1,
});

export const state: StateData = {
    currentPage: 'garage',
    garagePage: 1,
    winnersPage: 1,
    winnersData,
    winnersTotal,
    carsData,
    carsTotal,
    sortBy: null,
    sortOrder: null,
    selectedCar: null,
    animation: {},
};
