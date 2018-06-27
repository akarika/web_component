
class CcSmartPhoneShop extends HTMLElement {
    constructor() {
        super();
        // DOM element
        this._root = this.attachShadow({mode:'open'});// for shadow dom
        //data
        this._smartphones = [{
            id: 1,
            brand: 'Apple',
            model: 'Iphone 7 32Gb gris',
            description: 'New Iphone 7'

        }, {
            id: 1,
            brand: 'Samsung',
            model: 'Galaxy 9 noir',
            description: 'Grizou grizou!!! '

        }];

    }
    connectedCallback() {
        this._root.innerHTML = `
        <style>
        .frame {
            border: 2px dotted grey;
            margin-bottom: 10px;
            padding-left: 10px;
        }
        h1, h2 {
            color: green;
        }
        </style>
        <template id="smartphone-template">
            <div class="frame">
                <h2 id="brand"></h2>
                <p id="model"></p>
                <p id="description"> </p>
            </div>
        </template>
        <div id="result"> </div>
        `;
        this._templateContent = this._root.querySelector('#smartphone-template').content;
        this._result = this._root.querySelector('#result');
        this._smartphones.map(smartphone => {
            const clone = document.importNode(this._templateContent, true)
            //update the DOM with current smartphone data
            clone.querySelector('#brand').innerHTML= smartphone.brand;
            clone.querySelector('#model').innerHTML= smartphone.model;
            clone.querySelector('#description').innerHTML= smartphone.description;
            // add to the DOM
            this._result.appendChild(clone);
        });
    }
}
window.customElements.define('cc-smartphone-shop', CcSmartPhoneShop);