import './ModalWinnerTime.scss';

export class ModalWinnerTime {
    name: string;
    time?: number;

    constructor(name: string, time?: number) {
        this.name = name;
        this.time = time;
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'modal';

        modal.innerHTML = `Winner: ${this.name}<br>Time: ${
            this.time && this.time / 100
        }s`;

        return modal;
    }
}
