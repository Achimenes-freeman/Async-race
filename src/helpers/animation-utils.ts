import {
    drive,
    startEngine,
    stopEngine,
    MAX_GARAGE_PAGE_CARS_ON_LIST,
    getWinner,
} from './api';

import { ModalWinnerTime } from '../components/ModalWinnerTime/ModalWinnerTime';
import { state } from './state';

const getElementCenter = (element: HTMLElement) => {
    const { top, left, width, height } = element.getBoundingClientRect();

    return {
        xPos: left + width / 2,
        yPos: top + height / 2,
    };
};

export const getDistanceBetweenElements = (
    car: HTMLElement,
    finish: HTMLElement
) => {
    const carPosition = getElementCenter(car);
    const finishPosition = getElementCenter(finish);

    return finishPosition.xPos - carPosition.xPos;
};

export const animation = (
    car: HTMLElement,
    distance: number,
    animationTime: number
) => {
    let start: number | null = null;
    const data: { id?: number } = {};

    function step(timestamp: number) {
        if (!start) start = timestamp;

        const time = timestamp - start;
        const passed = Math.round(time * (distance / animationTime));

        car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

        if (passed < distance) {
            data.id = window.requestAnimationFrame(step);
        }
    }

    data.id = window.requestAnimationFrame(step);

    return data;
};

export const startDriving = async (id: number, controller: AbortController) => {
    let timer = 0;
    function timerUp() {
        ++timer;
    }
    const interval = setInterval(timerUp, 10);

    const [buttonStart] = Array.from(
        document.getElementsByTagName('button')
    ).filter((item) => item.id === `start-button-${id}`);
    const [buttonStop] = Array.from(
        document.getElementsByTagName('button')
    ).filter((item) => item.id === `stop-button-${id}`);

    const carImage = document.getElementById(`image-car-${id}`)!;
    const flagImage = document.getElementById(`flag-${id}`)!;

    buttonStart.disabled = true;
    buttonStop.disabled = false;

    buttonStart.classList.toggle('_active');
    buttonStart.classList.toggle('_fetch');
    buttonStop.classList.toggle('_active');

    try {
        const { velocity, distance } = await startEngine(id, controller.signal);
        const time = Math.round(distance / velocity);

        buttonStart.classList.toggle('_fetch');

        const roadDistance = Math.floor(
            getDistanceBetweenElements(carImage, flagImage)
        );

        state.animation[id] = animation(carImage, roadDistance, time);

        const { success } = await drive(id, controller.signal);
        clearInterval(interval);
        if (!success) {
            window.cancelAnimationFrame(state.animation[id].id!);
        }
        return timer;
    } catch (error) {
        clearInterval(interval);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.log('Car was stopped');
            } else if (error.name === 'SyntaxError') {
                console.log('Engine broke down');
                window.cancelAnimationFrame(state.animation[id].id!);
            }
        }
    }
};

export const stopDriving = async (id: number, controller: AbortController) => {
    controller.abort();
    const [buttonStart] = Array.from(
        document.getElementsByTagName('button')
    ).filter((item) => item.id === `start-button-${id}`);
    const [buttonStop] = Array.from(
        document.getElementsByTagName('button')
    ).filter((item) => item.id === `stop-button-${id}`);

    const carImage = document.getElementById(`image-car-${id}`)!;

    buttonStop.disabled = true;
    window.cancelAnimationFrame(state.animation[id].id!);

    await stopEngine(id);
    buttonStart.disabled = false;
    buttonStart.classList.toggle('_active');
    buttonStart.classList.remove('_fetch');
    buttonStop.classList.toggle('_active');
    carImage.removeAttribute('style');
};

export const startRace = async () => {
    state.hasWinner = false;

    state.controller = new AbortController();
    state.animation = {};

    const prevBtn = document.getElementById('garage-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('garage-next') as HTMLButtonElement;

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    await Promise.all(
        state.carsData.map(async (item) => {
            const winnerTime = await startDriving(item.id, state.controller);
            if (!state.hasWinner && winnerTime) {
                state.hasWinner = true;
                const modalWinnerTime = new ModalWinnerTime(
                    item.name,
                    winnerTime
                ).render();
                document.body.append(modalWinnerTime);
                const modalClose = setTimeout(() => {
                    modalWinnerTime.remove();
                    clearTimeout(modalClose);
                }, 5000);

                await getWinner(item.id, winnerTime / 100);
            }
        })
    );

    if (state.garagePage > 1) {
        prevBtn.disabled = false;
    }
    if (state.garagePage * MAX_GARAGE_PAGE_CARS_ON_LIST < state.carsTotal) {
        nextBtn.disabled = false;
    }
};

export const resetRace = async () => {
    await Promise.all(
        state.carsData.map(
            async (item) => await stopDriving(item.id, state.controller)
        )
    );
};
