import { CarsList } from "../CarsList/CarsList";
import { GarageMenu } from "../GarageMenu/GarageMenu";
import { Button } from "../Button/Button";

import { CarsData } from "../../helpers/types";

import './Garage.scss'

export class Garage {
    carsData: CarsData
    constructor(carsData: CarsData){
        this.carsData = carsData
    }

    render(){

        const garageLayout = document.createElement('div');

        const garageTitle = document.createElement('h1');
        garageTitle.className = 'garage-title'
        garageTitle.textContent = 'Garage(7)'

        const garagePagination = document.createElement('div');
        garagePagination.className = 'pagination-box'

        const garagePaginationText = document.createElement('p');
        garagePaginationText.className = 'pagination-subtitle';
        garagePaginationText.textContent = 'page #1'

        const buttonNext = new Button('next', 'big-button').render()
        const buttonPrev = new Button('prev', 'big-button').render()

        garagePagination.append(garagePaginationText, buttonPrev, buttonNext)

        garageLayout.append(new GarageMenu().render(), garageTitle, garagePagination, new CarsList(this.carsData).render())
        return garageLayout
    }
}