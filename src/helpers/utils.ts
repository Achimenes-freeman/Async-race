import {
    createCar,
    getCarsData,
    MAX_WINNERS_ON_LIST,
    MAX_GARAGE_PAGE_CARS_ON_LIST,
    getWinnersData,
} from './api';
import { state } from './state';
import { CarsList } from '../components/CarsList/CarsList';
import { CreatedCar } from './types';
import { WinnersTable } from '../components/WinnersTable/WinnersTable';

export const updateGarageData = async (): Promise<void> => {
    const { data, carsTotal } = await getCarsData(state.garagePage);
    state.carsData = data;
    state.carsTotal = carsTotal;

    document.getElementById(
        'garage-title'
    )!.textContent = `Garage (${carsTotal})`;
};

export const changeGarageCarsList = () => {
    const updateForm = document.getElementById(
        'update-form'
    ) as HTMLFormElement;
    document.getElementById('garage-cars-list')?.remove();
    document
        .getElementById('garage-layout')
        ?.append(new CarsList(state.carsData, updateForm).render());
};

export const changePaginationButtonsDisable = (
    next: HTMLButtonElement,
    prev: HTMLButtonElement
) => {
    switch (state.currentPage) {
        case 'garage':
            if (
                state.garagePage * MAX_GARAGE_PAGE_CARS_ON_LIST <
                state.carsTotal
            ) {
                next.disabled = false;
            } else {
                next.disabled = true;
            }

            if (state.garagePage > 1) {
                prev.disabled = false;
            } else {
                prev.disabled = true;
            }
            break;
        case 'winners':
            if (state.winnersPage * MAX_WINNERS_ON_LIST < state.winnersTotal) {
                next.disabled = false;
            } else {
                next.disabled = true;
            }

            if (state.winnersPage > 1) {
                prev.disabled = false;
            } else {
                prev.disabled = true;
            }
            break;
    }
};

const marks = [
    'Mercedes',
    'BMW',
    'Lada',
    'Audi',
    'Porsche',
    'Volkswagen',
    'Lamborghini',
    'LandRover',
    'Suzuki',
    'Subaru',
    'Toyota',
];

const models = [
    'A10',
    'GTR',
    'Cruise',
    'Q8',
    'B137',
    'Pass',
    'Euro',
    'V82010',
    'RSS',
    'EPAM',
];

const generateRandomColor = () => {
    const symbols = '0123456789ABCDEF';
    let resultColor = '#';
    for (let i = 0; i < 6; i++) {
        resultColor += symbols[Math.floor(Math.random() * 16)];
    }
    return resultColor;
};

export const generateCars = async () => {
    const generatedCarsData: Array<CreatedCar> = [];
    for (let i = 0; i < 100; i++) {
        const carData: CreatedCar = {
            name: `${marks[Math.floor(Math.random() * marks.length)]} ${
                models[Math.floor(Math.random() * models.length)]
            }`,
            color: generateRandomColor(),
        };
        generatedCarsData.push(carData);
    }
    await Promise.all(
        generatedCarsData.map(async (car) => await createCar(car))
    );
};

export const changeWinnersCarsList = async () => {
    document.getElementById('winners-table')?.remove();
    document
        .getElementById('winners-layout')
        ?.append(await new WinnersTable().render());
};

export const updateWinnersData = async (): Promise<void> => {
    const { data, winnersTotal } = await getWinnersData({
        page: state.winnersPage,
        sort: state.sortBy,
        order: state.sortOrder,
    });
    state.winnersData = data;
    state.winnersTotal = winnersTotal;

    document.getElementById(
        'winners-title'
    )!.textContent = `Winners (${winnersTotal})`;
};
