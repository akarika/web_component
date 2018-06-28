
class CcVehicule extends HTMLElement {
    constructor() {
        super();
        console.log('dans le constructeur de cc-vehicule');

    }
    connectedCallback() { // disponible des que le cpt est dispo dans le DOM
        console.log('cc-vehicule ajouté au DOM');
        
    }

    start(){
        console.log('start');
        
    }
    stop(){
        console.log('STOP');
        
    }

}
window.customElements.define("cc-vehicule", CcVehicule);

class CcPlane extends CcVehicule {

    contaterTour(){
        console.log('conctaterTour, ici Airbus A390');
        
    }

}
window.customElements.define('cc-plane', CcPlane);
