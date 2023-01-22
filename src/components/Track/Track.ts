import { Car } from '../Car/Car';
import { Button } from '../Button/Button';

import { SingleCar } from '../../helpers/types';

import './Track.scss';

export class Track {
    name: string;
    color: string;
    id: number;

    constructor({name, color, id}: SingleCar) {
        this.name = name;
        this.color = color;
        this.id = id;
    }

    render() {
        const track = document.createElement('div');

        const buttonSelect = new Button('select', 'big-button').render();
        const buttonRemove = new Button('remove', 'big-button').render();
        const buttonStart = new Button(
            'start',
            'small-button _active'
        ).render();
        const buttonStop = new Button('stop', 'small-button ').render();

        const carName = document.createElement('span');
        carName.textContent = this.name;
        carName.className = 'car-name';

        const trackGeneral = document.createElement('div');
        trackGeneral.className = 'track-general-buttons';
        trackGeneral.append(buttonSelect, buttonRemove, carName);

        const startButtons = document.createElement('div');
        startButtons.className = 'track-road-buttons';
        startButtons.append(buttonStart, buttonStop);

        const road = document.createElement('div');
        road.className = 'road';

        const trackRoad = document.createElement('div');
        trackRoad.className = 'track-road';
        trackRoad.append(startButtons, new Car(this.color).render());

        track.append(trackGeneral, trackRoad, road);
        return track;
    }
}
