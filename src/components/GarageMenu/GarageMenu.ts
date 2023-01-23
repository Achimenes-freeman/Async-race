import { Button } from '../Button/Button';
import { GarageForm } from '../GarageForm/GarageForm';
import {
    changeGarageCarsList,
    changePaginationButtonsDisable,
    generateCars,
    updateGarageData,
} from '../../helpers/utils';
import { state } from '../../helpers/state';

import './GarageMenu.scss';

export class GarageMenu {
    constructor() {}

    render() {
        const menu = document.createElement('div');
        menu.className = 'garage-menu';

        const startRaceButton = new Button('race', 'big-button').render();

        const resetRaceButton = new Button('reset', 'big-button').render();

        const generateCarsButton = new Button(
            'generate cars',
            'big-button'
        ).render();
        generateCarsButton.addEventListener('click', async function () {
            if (!this.disabled) {
                this.disabled = true;
                await generateCars();
                await updateGarageData();
                // document.getElementById(
                //     'garage-title'
                // )!.textContent = `Garage (${state.carsTotal})`;
                changeGarageCarsList();

                const [btnNext, btnPrev] = [
                    document.getElementById('next') as HTMLButtonElement,
                    document.getElementById('prev') as HTMLButtonElement,
                ];

                changePaginationButtonsDisable(btnNext, btnPrev);
                this.disabled = false;
            }
        });

        const updateForm = new GarageForm('update').render();

        menu.append(
            new GarageForm('create').render(),
            updateForm,
            startRaceButton,
            resetRaceButton,
            generateCarsButton
        );
        return {menu, updateForm};
    }
}
