
class CcBike extends HTMLElement {
    constructor() {
        super();
        console.log('dans le constructeur de cc-bike');

    }
    connectedCallback() { // disponible des que le cpt est dispo dans le DOM
        console.log('cc-bike-ajouté au DOM');
        
    }

    start(){
        console.log('vroom');
        
    }


}
window.customElements.define("cc-bike", CcBike);
