# WEB COMPONENT

###  Custom Components


```
// NE MARCHE PAS AVEC FIREFOX 61!!!!!!!!! (Juin 2018)
// déclaration de la classe
class CcBike extends HTMLElement{
    constructor(){
        super(); // on est une extension de HTMLElement
        console.log('dans le constructeur de cc-bike');  
    }
}
//defini notre custopm element ici ,cc-bike , de la classe CCBike
window.customElements.define("cc-bike",CcBike);

```
