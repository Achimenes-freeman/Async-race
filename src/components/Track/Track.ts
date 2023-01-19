import { Car } from '../Car/Car';
import { Button } from '../Button/Button';

import './Track.scss';

export class Track {
    name: string;
    constructor(name: string) {
        this.name = name;
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
        trackRoad.append(startButtons, new Car('#786360').render());

        track.append(trackGeneral, trackRoad, road);
        return track;
    }
}
