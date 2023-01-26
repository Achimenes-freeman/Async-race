import { getCar } from '../../helpers/api';
import { state } from '../../helpers/state';
import { WinnersData } from '../../helpers/types';
import { Car } from '../Car/Car';
import { MAX_WINNERS_ON_LIST } from '../../helpers/api';

import './WinnersList.scss';

export class WinnersList {
    winnersData: WinnersData;
    constructor(winnersData: WinnersData) {
        this.winnersData = winnersData;
    }

    async render() {
        const winnersList = document.createElement('ul');

        this.winnersData.forEach(async (item, index) => {
            const listItem = document.createElement('li');
            listItem.id = `winner-${item.id}`;
            listItem.className = 'winners-list-item';

            const { name, color } = await getCar(item.id);

            const number = document.createElement('span');
            number.className = 'winner-number';
            number.textContent = `${
                MAX_WINNERS_ON_LIST * (state.winnersPage - 1) + index + 1
            }`;

            const carImage = new Car(color, item.id).render();

            const carName = document.createElement('span');
            carName.className = 'winner-name';
            carName.textContent = name;

            const carWins = document.createElement('span');
            carWins.className = 'winner-wins';
            carWins.textContent = item.wins.toString();

            const carBestTime = document.createElement('span');
            carBestTime.className = 'winner-time';
            carBestTime.textContent = item.time.toString();

            listItem.append(number, carImage, carName, carWins, carBestTime);

            winnersList.append(listItem);
        });

        return winnersList;
    }
}
