import { CarsData, CreatedCar, SingleCar } from "./types";

const BASE_URL = "http://127.0.0.1:3000"


export const getCarsData = async ():Promise<CarsData> =>{
    const response = await fetch(`${BASE_URL}/garage`);
    return response.ok ? await response.json() : [];

}

export const createCar = async (car: CreatedCar):Promise<SingleCar> =>{
    const response = await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })

    return response.ok ? await response.json() : {};
}