
class CcBike extends HTMLElement{
    constructor(){
        super();
        console.log('dans le constructeur de cc-bike');
        
    }



}
window.customElements.define("cc-bike",CcBike);
