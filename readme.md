# WEB COMPONENT

###  Custom Components


```javascript
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
### HTML template

### Shadow DOM

permet l encapsulation du DOM

### getAttribute

permet de récupérer l'attribut (HTML)
duration=10
this.getAttribute('duration')

### observer modification 

## -1  static get observedAttributes
// methode static qui retourne l(es)attribut(s) que vous souhaitez observer
```javascript
//<cc-countdown duration=10 purpose="oeufs à la coque"></cc-countdown>


    static get observedAttributes() {
        return ['duration', 'purpose'];
        // retourne les attributs qu on souhaite observer
    }
```

## 2 Dès qu un changement oppére attributeChangedCallback

attributeChangedCallback un callback qui permet de connaitre le nom , ancienn valleur , nouvelle valeur

```javascript
attributeChangedCallback(name, oldValue, newValue) {

}

```

### Shadow DOM

permet l encapsulation du DOM ,CSS, HTML , JS , CPT 

```javascript
 this._root = this.attachShadow({mode:'open'});//for shadow DOM 

```
