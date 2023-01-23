import { Button } from '../Button/Button';
import { createCar } from '../../helpers/api';
import { CreatedCar } from '../../helpers/types';
import { state } from '../../helpers/state';
import {
    updateGarageData,
    changeGarageCarsList,
    changePaginationButtonsDisable,
} from '../../helpers/utils';

import './GarageForm.scss';

export class GarageForm {
    text: string;
    constructor(text: string) {
        this.text = text;
    }

    render() {
        const form = document.createElement('form');
        form.className = 'garage-menu-form';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = `form-text-input form-text-input-${this.text}`;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.className = `form-color-input form-color-input-${this.text}`;

        const submitButton = new Button(this.text, 'big-button').render();

        switch (this.text) {
            case 'update':
                colorInput.disabled = true;
                textInput.disabled = true;
                submitButton.disabled = true;
                break;
            case 'create':
                submitButton.addEventListener('click', async function () {
                    if (!this.disabled) {
                        if (textInput.value && colorInput.value) {
                            this.disabled = true;
                            const createdCarData: CreatedCar = {
                                name: textInput.value,
                                color: colorInput.value,
                            };
                            textInput.value = '';
                            await createCar(createdCarData);
                            await updateGarageData();
                            document.getElementById(
                                'garage-title'
                            )!.textContent = `Garage (${state.carsTotal})`;
                            changeGarageCarsList();

                            const [btnNext, btnPrev] = [
                                document.getElementById(
                                    'next'
                                ) as HTMLButtonElement,
                                document.getElementById(
                                    'prev'
                                ) as HTMLButtonElement,
                            ];

                            changePaginationButtonsDisable(btnNext, btnPrev);
                            this.disabled = false;
                        }
                    }
                });
                break;
        }
        form.append(textInput, colorInput, submitButton);

        return form;
    }
}
