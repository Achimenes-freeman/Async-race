import { Garage } from './src/components/Garage/Garage';

import { state } from './src/helpers/state';

import './index.scss';

const { currentPage } = state;

const createLayout = async () => {
    const body = document.querySelector('body')!;
    if (currentPage === 'garage') {
        body.append(new Garage().render());
    } else {
    }
};

createLayout();
