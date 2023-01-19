import { Track } from '../Track/Track';

import './CarsList.scss';

export class CarsList {
    carsData: Array<number>;
    constructor(carsData: Array<number>) {
        this.carsData = carsData;
    }

    render() {
        const list = document.createElement('ul');
        list.className = 'cars-list';

        this.carsData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.className = 'cars-list-item';
            listItem.append(new Track('tesla').render());
            list.append(listItem);
        });

        return list;
    }
}
