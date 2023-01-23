import './Button.scss';

export class Button {
    color?: string;
    text: string;
    className: string;
    constructor(text: string, className: string, color?: string) {
        this.color = color;
        this.text = text;
        this.className = className;
    }

    render() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `btn ${this.className} ${
            this.color ? ` ${this.color}` : ''
        }`;

        button.textContent = this.text;

        return button;
    }
}
