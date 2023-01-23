import { Track } from '../Track/Track';

import { CarsData } from '../../helpers/types';

import './CarsList.scss';

export class CarsList {
    carsData: CarsData;
    constructor(carsData: CarsData) {
        this.carsData = carsData;
    }

    render() {
        const list = document.createElement('ul');
        list.className = 'cars-list';
        list.id = 'garage-cars-list';

        this.carsData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.className = 'cars-list-item';
            listItem.append(new Track(item).render());
            list.append(listItem);
        });

        return list;
    }
}
