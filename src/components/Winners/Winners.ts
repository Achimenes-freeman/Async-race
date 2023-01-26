import { state } from '../../helpers/state';
import {
    changePaginationButtonsDisable,
    changeWinnersCarsList,
    updateWinnersData,
} from '../../helpers/utils';
import { Button } from '../Button/Button';
import { WinnersTable } from '../WinnersTable/WinnersTable';

export class Winners {
    constructor() {}

    async render() {
        const winnersLayout = document.createElement('div');
        winnersLayout.id = 'winners-layout';
        winnersLayout.style.display = 'none';

        const winnersTitle = document.createElement('h1');
        winnersTitle.className = 'title';
        winnersTitle.id = 'winners-title';
        winnersTitle.textContent = `Winners (${state.winnersTotal})`;

        const winnersPagination = document.createElement('div');
        winnersPagination.className = 'pagination-box';

        const winnersPaginationText = document.createElement('p');
        winnersPaginationText.className = 'pagination-subtitle';
        winnersPaginationText.textContent = `page #${state.winnersPage}`;

        const buttonNext = new Button('next', 'big-button').render();
        const buttonPrev = new Button('prev', 'big-button').render();

        changePaginationButtonsDisable(buttonNext, buttonPrev);
        console.log(state.winnersTotal);

        buttonNext.id = 'winners-next';
        buttonPrev.id = 'winners-prev';

        buttonNext.addEventListener('click', async function () {
            if (!this.disabled) {
                state.winnersPage += 1;
                changePaginationButtonsDisable(buttonNext, buttonPrev);
                await updateWinnersData();
                await changeWinnersCarsList();

                winnersPaginationText.textContent = `page #${state.winnersPage}`;
            }
        });

        buttonPrev.addEventListener('click', async function () {
            if (!this.disabled) {
                state.winnersPage -= 1;
                changePaginationButtonsDisable(buttonNext, buttonPrev);
                await updateWinnersData();
                await changeWinnersCarsList();
                winnersPaginationText.textContent = `page #${state.winnersPage}`;
            }
        });

        winnersPagination.append(winnersPaginationText, buttonPrev, buttonNext);

        const winnersTable = await new WinnersTable().render();

        winnersLayout.append(winnersTitle, winnersPagination, winnersTable);

        return winnersLayout;
    }
}
