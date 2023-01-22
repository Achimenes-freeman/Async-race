import { Button } from "../Button/Button";

import './GarageForm.scss'

export class GarageForm{
    text: string;
    constructor(text: string){
        this.text = text;
    }

    render(){
        const form = document.createElement('form');
        form.className = 'garage-menu-form';

        const submitButton = new Button(this.text, 'big-button').render();

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = `form-text-input form-text-input-${this.text}`;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.className = `form-color-input form-color-input-${this.text}`;

        form.append(textInput, colorInput, submitButton)

        return form;
    }
}