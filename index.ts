import { Garage } from './src/components/Garage/Garage';
import { Button } from './src/components/Button/Button';

import { state } from './src/helpers/state';

import './index.scss';

const { currentPage } = state;

const createLayout = async () => {

    const mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';

    const garageButton = new Button('garage', 'big-button').render();
    const winnersButton = new Button('winners', 'big-button').render();

    const navigation = document.createElement('nav');
    navigation.className = 'main-layout-navigation'
    navigation.append(garageButton, winnersButton )
    
    mainLayout.append(navigation);
    mainLayout.append(new Garage().render());

    if (currentPage === 'garage') {
        garageButton.disabled = true;
        winnersButton.disabled = false;
    } else {
        garageButton.disabled = false;
        winnersButton.disabled = true;
    }

    document.body.append(mainLayout);
};

createLayout();
