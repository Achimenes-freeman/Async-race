const getElementCenter = (element: HTMLElement) => {
    const {top, left, width, height} = element.getBoundingClientRect();

    return {
        xPos: left + width/2,
        yPos: top + height/2
    }
} 

export const getDistanseBetweenElements = (car: HTMLElement, finish: HTMLElement) => {

    const carPosition = getElementCenter(car);
    const finishPosition = getElementCenter(finish);

    return finishPosition.xPos - carPosition.xPos
}

export const animation = (car: HTMLElement, distance: number, animationTime: number) => {
    let start:number | null = null;
    const data: {id?: number} = {};

    function step(timestap: number){
        if (!start) start = timestap;

        const time = timestap - start;
        const passed = Math.round(time * (distance / animationTime))

        car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

        if(passed < distance) {
            data.id = window.requestAnimationFrame(step);
        }
    }

    data.id = window.requestAnimationFrame(step);

    return data
}