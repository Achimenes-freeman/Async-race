import { Track } from '../Track/Track';

import { CarsData } from '../../helpers/types';

import './CarsList.scss';

export class CarsList {
    carsData: CarsData;
    formElement: HTMLFormElement;
    constructor(carsData: CarsData, formElement: HTMLFormElement) {
        this.carsData = carsData;
        this.formElement = formElement;
    }

    render() {
        const list = document.createElement('ul');
        list.className = 'cars-list';
        list.id = 'garage-cars-list';

        this.carsData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.id = `car-track-${item.id}`
            listItem.className = 'cars-list-item';
            listItem.append(new Track(item, this.formElement).render());
            list.append(listItem);
        });

        return list;
    }
}
