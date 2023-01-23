import { Button } from '../Button/Button';
import { createCar, updateCar } from '../../helpers/api';
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
        form.id = `${this.text}-form`
        form.className = 'garage-menu-form';

        const textInput = document.createElement('input');
        textInput.id = `${this.text}-name-input`;
        textInput.type = 'text';
        textInput.name = 'nameInput';
        textInput.className = `form-text-input form-text-input-${this.text}`;

        const colorInput = document.createElement('input');
        colorInput.id = `${this.text}-color-input`
        colorInput.type = 'color';
        colorInput.name = 'colorInput';
        colorInput.className = `form-color-input form-color-input-${this.text}`;

        const submitButton = new Button(this.text, 'big-button').render();
        submitButton.id = `${this.text}-submit-button`
        submitButton.name = 'submitButton'

        form.append(textInput, colorInput, submitButton);

        switch (this.text) {
            case 'update':
                colorInput.disabled = true;
                textInput.disabled = true;
                submitButton.disabled = true;

                submitButton.addEventListener('click', async function(){
                    if(!this.disabled){
                        if (textInput.value && colorInput.value){
                            this.disabled = true;
                            const createdCarData: CreatedCar = {
                                name: textInput.value,
                                color: colorInput.value,
                            };
                            textInput.value = '';
                            await updateCar(createdCarData)
                            await updateGarageData();
                            changeGarageCarsList();
                            colorInput.disabled = true;
                            textInput.disabled = true;
                            state.selectedCar = null;
                        }
                    }
                })
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
                            // document.getElementById(
                            //     'garage-title'
                            // )!.textContent = `Garage (${state.carsTotal})`;
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

        return form;
    }
}
