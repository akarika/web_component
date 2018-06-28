
class CcCountdown extends HTMLElement {
    constructor() {
        super();
        //DOM elements
        this._btnStart = null;
        this._btnStop = null;
        this._currentValueParagraph = null;
        this._purpleTitle = null;
        this._root = this.attachShadow({mode:'open'});//for shadow DOM 

        //data
        this._duration = 0;
        this._currentValue = 0;
        this._purpose = 'Compte à rebours';
        this._timer = -1;
        this._countDownRunning = false;

    }
    static get observedAttributes() {// methode static qui retourne attribut que vous souhaitez observer


        return ['duration', 'purpose'];
    }

    attributeChangedCallback(name, oldValue, newValue) {// permet de réagir au changement d attribut
        console.log('atttribue a changé', name, oldValue, newValue);
        // name= nom de l attrubit a écouter 
        if (name === 'duration') {
            this._setDuration(newValue);
            
            if (this._currentValueParagraph) {
                this._currentValueParagraph.textContent = newValue;
            }
        }
        if (name === 'purpose') {
            this._setPurpose(newValue);
            if (this._purpleTitle) {
                this._purpleTitle.innerHTML = newValue;
            }
        }
    }
        _setDuration(value) {
        if (value === null) return;
        this._duration = parseInt(value);
        this._currentValue = this._duration;
        if (this._currentValueParagraph) {
            this._currentValueParagraph.innerText = value;
        }
    }
    _setPurpose(value) {
        if (value === null) return;
        this._purpose = value;
        if(this._purposeTitle) {
            this._purposeTitle.innerHTML = value;
        }
    }

    connectedCallback() {
        this._root.innerHTML = `
        <style>
        #txtCurrentValue {
            font-size: 24px;
            font-weight: bold;
        }
        </style>
        <div>
            <h2 id="purpose"></h2>
            <button id="btnStart">démarrer</button>
            <button id="btnStop">arrêter</button>
            <span id="txtCurrentValue"></span> 
        </div>
        `;
        this._btnStart = this._root.querySelector('#btnStart');
        this._btnStart.addEventListener('click', event => {
            console.log('event', event);
            this._countDownRunning = !this._countDownRunning;
            if (this._countDownRunning === true) {
                this._startCountdown();
            } else {
                this._pauseCountDown();
            }

        });

        this._currentValueParagraph = this._root.querySelector('#txtCurrentValue');
        this._currentValueParagraph.textContent = this._currentValue;

        this._btnStop = this._root.querySelector('#btnStop');
        this._btnStop.addEventListener('click', event => {
            this._stopCountdown();
        });
        this._purpleTitle = this._root.querySelector('#purpose');
        this._purpleTitle.innerHTML = this.getAttribute('purpose') || this._purpose;
    }

    _startCountdown() {
        if (this._currentValue === 0) {
            return;
        }
        this._timer = setInterval(() => {
            console.log('this currentValue', this._currentValue);

            this._currentValue = this._currentValue - 1;
            this._currentValueParagraph.textContent = this._currentValue;
            if (this._currentValue === 0) {
                clearInterval(this._timer);
            }
        }, 1000);
    };
    _pauseCountDown() {
        clearInterval(this._timer);
        this._btnStart.textContent = 'reprendre';
        this._duration = this._currentValue;

    };

    _stopCountdown() {
        clearInterval(this._timer);
        this._countDownRunning = false;
        if (this.getAttribute('duration')) {
            this._currentValue = parseInt(this.getAttribute('duration'));
        } else {
            this._currentValue = 0;
        }
        this._currentValueParagraph.innerText = this._currentValue;
        this._btnStart.innerText = 'démarrer';
    }
}
window.customElements.define('cc-countdown', CcCountdown);