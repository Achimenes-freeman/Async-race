import { Button } from "../Button/Button";
import { GarageForm } from "../GarageForm/GarageForm";

import './GarageMenu.scss'

export class GarageMenu{
    constructor(){

    }

    render(){

        const menu = document.createElement('div');
        menu.className = 'garage-menu';

        menu.append(new GarageForm('create').render(), new GarageForm('update').render(), new Button('race', 'big-button').render(), new Button('reset', 'big-button').render(), new Button('generate cars', 'big-button').render())
        return menu;
    }
}