import { Garage } from './src/components/Garage/Garage';
import { Button } from './src/components/Button/Button';

import { state } from './src/helpers/state';

import './index.scss';
import { Winners } from './src/components/Winners/Winners';
import {
    changePaginationButtonsDisable,
    changeWinnersCarsList,
    updateWinnersData,
} from './src/helpers/utils';

const { currentPage } = state;

const createLayout = async () => {
    const mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';

    const garageButton = new Button('garage', 'big-button').render();
    const winnersButton = new Button('winners', 'big-button').render();

    garageButton.addEventListener('click', () => {
        document.getElementById('winners-layout')!.style.display = 'none';
        document.getElementById('garage-layout')!.style.display = 'block';
        garageButton.disabled = true;
        winnersButton.disabled = false;
        state.currentPage = 'garage';
    });
    winnersButton.addEventListener('click', async function () {
        document.getElementById('garage-layout')!.style.display = 'none';
        document.getElementById('winners-layout')!.style.display = 'block';
        garageButton.disabled = false;
        state.currentPage = 'winners';

        if (!this.disabled) {
            const buttonNext = document.getElementById(
                'winners-next'
            ) as HTMLButtonElement;
            const buttonPrev = document.getElementById(
                'winners-prev'
            ) as HTMLButtonElement;

            changePaginationButtonsDisable(buttonNext, buttonPrev);
            await updateWinnersData();
            await changeWinnersCarsList();
        }
        winnersButton.disabled = true;
    });

    const navigation = document.createElement('nav');
    navigation.className = 'main-layout-navigation';
    navigation.append(garageButton, winnersButton);

    mainLayout.append(navigation);
    mainLayout.append(new Garage().render());
    mainLayout.append(await new Winners().render());

    if (currentPage === 'garage') {
        garageButton.disabled = true;
        winnersButton.disabled = false;
    } else {
        garageButton.disabled = false;
        winnersButton.disabled = true;
    }

    document.body.append(mainLayout);
};

createLayout();
