import { Car } from '../Car/Car';
import { Button } from '../Button/Button';
import { Flag } from '../Flag/Flag';

import { SingleCar } from '../../helpers/types';

import { state } from '../../helpers/state';

import { deleteCarFromGarage, deleteCarFromWinners, drive, startEngine } from '../../helpers/api';
import { changeGarageCarsList, updateGarageData } from '../../helpers/utils';

import './Track.scss';
import { animation, getDistanseBetweenElements } from '../../helpers/animation-utils';

export class Track {
    name: string;
    color: string;
    id: number;
    formElement: HTMLFormElement;

    constructor({name, color, id}: SingleCar, formElement: HTMLFormElement) {
        this.name = name;
        this.color = color;
        this.id = id;
        this.formElement = formElement;
    }

    render() {
        const track = document.createElement('div');

        const carImage = new Car(this.color).render();
        const flagImage = new Flag().render();

        const buttonSelect = new Button('select', 'big-button').render();
        buttonSelect.addEventListener('click', ()=>{
            const [nameInput, colorInput] = Array.from(this.formElement.getElementsByTagName('input')).filter(item => item.id === 'update-name-input' || 'update-color-input');

            const submitButton = Array.from(this.formElement.getElementsByTagName('button'))[0];

            nameInput.disabled = false;
            nameInput.value = this.name;

            colorInput.disabled = false;
            colorInput.value = this.color;

            submitButton.disabled = false;

            state.selectedCar = this.id;
        })


        const buttonRemove = new Button('remove', 'big-button').render();
        buttonRemove.addEventListener('click', async ()=>{
            await deleteCarFromGarage(this.id);
            await deleteCarFromWinners(this.id);
            await updateGarageData()
            changeGarageCarsList()
        })

        const buttonStart = new Button(
            'start',
            'small-button _active'
        ).render();
        buttonStart.addEventListener('click', async ()=>{
            if(!buttonStart.disabled){
                buttonStart.disabled = true;
                buttonStop.disabled = false;

                buttonStart.classList.toggle('_active');
                buttonStart.classList.toggle('_fetch');
                buttonStop.classList.toggle('_active');

                const {velocity, distance} = await startEngine(this.id);
                const time = Math.round(distance / velocity);

                buttonStart.classList.toggle('_fetch');

                const roadDistance = Math.floor(getDistanseBetweenElements(carImage, flagImage));

                state.animation[this.id] = animation(carImage, roadDistance, time);

                const { success } = await drive(this.id);
                if (!success) {
                    window.cancelAnimationFrame(state.animation[this.id].id!)
                }
            }
            
        })

        const buttonStop = new Button('stop', 'small-button ').render();
        buttonStop.disabled = true;

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
        road.append(flagImage)

        const trackRoad = document.createElement('div');
        trackRoad.className = 'track-road';
        trackRoad.append(startButtons, carImage);

        track.append(trackGeneral, trackRoad, road);
        return track;
    }
}
