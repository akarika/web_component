
class CcCountdown extends HTMLElement {
    constructor() {
        super();
        //
        this._duration = 0;
        this._purpose = 'Compte à rebours';

    }
    static get observedAttributes() {// methode static qui retourne attribut que vous souhaitez observer


        return ['duration', 'purpose'];
    }

    attributeChangedCallback(name, oldValue, newValue) {// permte de réagir au changement d attribut
        console.log('atttribue a changé', name, oldValue, newValue);
// name= nom del attrubit a écouter 
    }



}
window.customElements.define('cc-countdown', CcCountdown);