import './Flag.scss';

export class Flag {
    id: number;
    constructor(id: number) {
        this.id = id;
    }

    render() {
        const flag = document.createElement('div');
        flag.id = `flag-${this.id}`;
        flag.className = 'flag';
        flag.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
        <svg fill="#92e41d" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 512 512" xml:space="preserve">
        <g>
            <g>
                <path d="M509.463,338.509l-57.356-129.052l57.856-130.177c3.201-7.199,2.54-15.527-1.752-22.133
                    c-4.293-6.606-11.636-10.59-19.514-10.59H279.256V23.287c0-12.852-10.419-23.271-23.271-23.271H23.271
                    C10.419,0.015,0,10.435,0,23.287v15.514v263.742v186.171c0,12.852,10.419,23.271,23.271,23.271
                    c12.852,0,23.271-10.419,23.271-23.271V325.814h186.171v23.271c0,12.852,10.419,23.271,23.271,23.271h232.713
                    c0.009,0,0.02,0,0.031,0c12.852,0,23.271-10.419,23.271-23.271C512,345.277,511.085,341.682,509.463,338.509z M232.713,69.829
                    v209.442H46.543V46.558h186.171V69.829z M279.256,325.814v-23.271V93.101h173.632l-47.512,106.905
                    c-2.675,6.016-2.675,12.886,0,18.903l47.512,106.905H279.256z"/>
            </g>
        </g>
        </svg>`;

        return flag;
    }
}
