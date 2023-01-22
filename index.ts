import { Garage } from './src/components/Garage/Garage';

import { getCarsData, createCar } from './src/helpers/api';

import './index.scss';


const getGarage = async ()=>{
    const body = document.querySelector('body')!;
    body.append(new Garage(await getCarsData()).render());

}

getGarage();
