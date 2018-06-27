
class CcSmartPhoneShop extends HTMLElement {
    constructor() {
        super();
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
        this.innerHTML = `
        <style></style>
        <template id="smartphone-template">
            <div class="frame">
                <h2 id="brand"></h2>
                <p id="model"></p>
                <p id="description"> </p>
            </div>
        </template>
        <div id="result"> </div>
        `;
        this._templateContent = document.querySelector('#smartphone-template').content;
        this._result = document.querySelector('#result');
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