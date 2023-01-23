import { CarsList } from '../CarsList/CarsList';
import { GarageMenu } from '../GarageMenu/GarageMenu';
import { Button } from '../Button/Button';

import { state } from '../../helpers/state';
import {
    updateGarageData,
    changePaginationButtonsDisable,
    changeGarageCarsList,
} from '../../helpers/utils';

import './Garage.scss';

export class Garage {
    constructor() {}

    render() {
        const garageLayout = document.createElement('div');
        garageLayout.id = 'garage-layout';

        const garageTitle = document.createElement('h1');
        garageTitle.className = 'garage-title';
        garageTitle.id = 'garage-title';
        garageTitle.textContent = `Garage (${state.carsTotal})`;

        const garagePagination = document.createElement('div');
        garagePagination.className = 'pagination-box';

        const garagePaginationText = document.createElement('p');
        garagePaginationText.className = 'pagination-subtitle';
        garagePaginationText.textContent = `page #${state.garagePage}`;

        const buttonNext = new Button('next', 'big-button').render();
        const buttonPrev = new Button('prev', 'big-button').render();

        changePaginationButtonsDisable(buttonNext, buttonPrev);

        buttonNext.id = 'next';
        buttonPrev.id = 'prev';

        buttonNext.addEventListener('click', async function () {
            if (!this.disabled) {
                state.garagePage += 1;
                changePaginationButtonsDisable(buttonNext, buttonPrev);
                await updateGarageData();
                changeGarageCarsList();
                garagePaginationText.textContent = `page #${state.garagePage}`;
            }
        });

        buttonPrev.addEventListener('click', async function () {
            if (!this.disabled) {
                state.garagePage -= 1;
                changePaginationButtonsDisable(buttonNext, buttonPrev);
                await updateGarageData();
                changeGarageCarsList();
                garagePaginationText.textContent = `page #${state.garagePage}`;
            }
        });

        garagePagination.append(garagePaginationText, buttonPrev, buttonNext);

        garageLayout.append(
            new GarageMenu().render(),
            garageTitle,
            garagePagination,
            new CarsList(state.carsData).render()
        );
        return garageLayout;
    }
}
