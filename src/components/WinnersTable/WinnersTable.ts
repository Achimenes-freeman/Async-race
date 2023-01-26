import { getWinnersData } from '../../helpers/api';
import { state } from '../../helpers/state';
import {
    changePaginationButtonsDisable,
    changeWinnersCarsList,
    updateWinnersData,
} from '../../helpers/utils';
import { WinnersList } from '../WinnersList/WinnersList';

import './WinnersTable.scss';

export class WinnersTable {
    constructor() {}

    async render() {
        const tableMenu = document.createElement('div');
        tableMenu.className = 'winners-menu';

        const number = document.createElement('span');
        number.textContent = '№';
        number.className = 'menu-number';

        const car = document.createElement('span');
        car.textContent = 'car';
        car.className = 'menu-car';

        const carName = document.createElement('span');
        carName.textContent = 'name';
        carName.className = 'menu-name';

        const carWins = document.createElement('span');
        carWins.textContent = `wins${
            state.sortBy === 'wins'
                ? state.sortOrder === 'ASC'
                    ? '↑'
                    : '↓'
                : ''
        }`;
        carWins.className = 'menu-wins';

        carWins.addEventListener('click', async () => {
            const buttonNext = document.getElementById(
                'winners-next'
            ) as HTMLButtonElement;
            const buttonPrev = document.getElementById(
                'winners-prev'
            ) as HTMLButtonElement;

            changePaginationButtonsDisable(buttonNext, buttonPrev);

            state.sortBy = 'wins';
            state.sortOrder = !state.sortOrder
                ? 'DESC'
                : state.sortOrder === 'DESC'
                ? 'ASC'
                : 'DESC';

            await updateWinnersData();
            await changeWinnersCarsList();
        });

        const carBestTime = document.createElement('span');
        carBestTime.textContent = `time${
            state.sortBy === 'time'
                ? state.sortOrder === 'ASC'
                    ? '↑'
                    : '↓'
                : ''
        }`;
        carBestTime.className = 'menu-time';

        carBestTime.addEventListener('click', async () => {
            const buttonNext = document.getElementById(
                'winners-next'
            ) as HTMLButtonElement;
            const buttonPrev = document.getElementById(
                'winners-prev'
            ) as HTMLButtonElement;

            changePaginationButtonsDisable(buttonNext, buttonPrev);

            state.sortBy = 'time';
            state.sortOrder = !state.sortOrder
                ? 'DESC'
                : state.sortOrder === 'DESC'
                ? 'ASC'
                : 'DESC';

            await updateWinnersData();
            await changeWinnersCarsList();
        });

        tableMenu.append(number, car, carName, carWins, carBestTime);

        const winnersList = await new WinnersList(state.winnersData).render();

        const winnersTable = document.createElement('div');
        winnersTable.id = 'winners-table';

        winnersTable.append(tableMenu, winnersList);

        return winnersTable;
    }
}
