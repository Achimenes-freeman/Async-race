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
import { resetRace, startRace } from '../../helpers/animation-utils';

export class GarageMenu {
    constructor() {}

    render() {
        const menu = document.createElement('div');
        menu.className = 'garage-menu';

        const startRaceButton = new Button('race', 'big-button').render();
        startRaceButton.id = 'start-race-button';
        startRaceButton.addEventListener('click', async () => {
            if (!startRaceButton.disabled) {
                startRaceButton.disabled = true;
                resetRaceButton.disabled = false;
                startRace();
            }
        });

        const resetRaceButton = new Button('reset', 'big-button').render();
        resetRaceButton.disabled = true;
        resetRaceButton.id = 'reset-race-button';
        resetRaceButton.addEventListener('click', async () => {
            if (!resetRaceButton.disabled) {
                resetRaceButton.disabled = true;
                await resetRace();
                startRaceButton.disabled = false;
            }
        });

        const generateCarsButton = new Button(
            'generate cars',
            'big-button'
        ).render();
        generateCarsButton.addEventListener('click', async function () {
            if (!this.disabled) {
                this.disabled = true;
                await generateCars();
                await updateGarageData();
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
        return { menu, updateForm };
    }
}
