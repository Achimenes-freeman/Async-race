import { getCarsData, getWinnersData } from './api';
import { StateData } from './types';

const { data: carsData, carsTotal } = await getCarsData(1);
const { data: winnersData, winnersTotal } = await getWinnersData({
    page: 1,
    sort: 'id',
    order: 'DESC',
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
    controller: new AbortController(),
    hasWinner: false,
};
