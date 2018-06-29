class CcMap extends HTMLElement {
    constructor() {
    console.log('ninja');
    
        super();
        // store shadow root reference in a _root variable
        this._root = this.attachShadow({
            mode: 'open'
        });
        console.log('this._root', this._root);

        // DOM elements
        this._mapTitle = null;
        this._mapTitleText = '';

        // data
        this._geoData = {
            center: {
                lat: 48.1173,
                lng: -1.6778
            },
            title: 'Rennes',
            zoom: this._zoom
        };
        this._googleMapsDownloadPromise = new Promise((resolveGoogleMapsLoaded) => window.resolveGoogleMapsLoaded = resolveGoogleMapsLoaded);
        this._map = null;
        this._zoom = 12;
        this._mapListensForClick = false;
        this._iconBaseUrl = 'http://maps.google.com/mapfiles/kml/paddle';
        this._markersPositions = [];
        this._marker = null;
        this._markerLat = 0;
        this._markerLng = 0;
    }

    connectedCallback() {
        console.log('cc-map added to the DOM');        

        this._googleMapsDownloadPromise
            .then(() => { 
                console.log('banzai');
                
                this._root.innerHTML = `
                <style>
                #map {
                    height: 400px;
                    width: 100%;
                }
                </style>
                <h1 id="map-title"></h1>
                <div id="map">
                </div>
                `;
                this._mapDiv = this._root.getElementById('map');
                this._mapTitle = this._root.getElementById('map-title');
        
                this._initMap({
                    center: this._geoData.center,
                    zoom: 12
                });            
            })
            .catch(err => console.error(err));
    }
    
    _renderTitle() {
        this._mapTitle.innerText = this._mapTitleText;
    }
    
    _initMap(options) {
        this._map = new window.google.maps.Map(this._mapDiv, {
            zoom: options.zoom,
            center: options.center
        });
    }
    
    _addMarker(options) {
        this._marker = new window.google.maps.Marker({
            position: options.position,
            map: this._map,
            icon: options.draggable ? `${this._iconBaseUrl}/ylw-stars.png` : `${this._iconBaseUrl}/red-circle.png`,
            draggable: options.draggable
        });

        let infoWindow = new window.google.maps.InfoWindow({
            content: options.content
        });

        this._marker.addListener('click', () => infoWindow.open(this._map, this._marker));

        if (options.draggable) {
            this._marker.addListener('dragend', (event) => {
                this._markerLat = event.latLng.lat();
                this._markerLng = event.latLng.lng();
                console.log(this._markerLat, this._markerLng);
                infoWindow = new google.maps.InfoWindow({
                    content: `lat: ${this._markerLat} - lng: ${this._markerLng}`
                });                
            });
        }
    }

    static get observedAttributes() {
        return ['zoom'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this._componentReady) return;

        console.log(`name: ${name} - old value: ${oldValue} - new value: ${newValue}`);
        if (name === 'zoom') {
            const mapOptions = {
                zoom: parseInt(newValue),
                center: this._geoData.center
            };
            this._initMap(mapOptions);
        }
    }

    _addMarkerOnMapClick() {
        window.google.maps.event.addListener(this._map, 'click', (event) => {
            console.log('map click event', event);
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            this._addMarker({
                position: {
                    lat: lat,
                    lng: lng
                },
                content: `lat: ${lat} - lng: ${lng}`,
                draggable: true
            });
        });
    }



    // getter and setter that will allow to programmatically get and set coords and map title
    set geoData(value) {
        if (this._geoData === value) return;
        this._geoData = value;
        this._initMap(this._geoData);
    }

    get geoData() {
        return this._geoData;
    }

    // getter and setter that will allow to programmatically get and set zoom level    
    set zoom(value) {
        if (this._zoom === value) return;
        this._zoom = value;
        this._geoData.zoom = this._zoom;
        this._initMap(this._geoData);
    }

    get zoom() {
        return this._zoom;
    }

    // getter and setter that will allow to programmatically get and set map title
    set mapTitleText(value) {
        if (this._mapTitleText === value) return;
        this._mapTitleText = value;
        this._renderTitle();
    }

    get mapTitleText() {
        return this._mapTitleText;
    }

    set mostRecentMarker(value) {
        // todo prevent duplicates
        this._markersPositions = [...this.markersPositions, value];
        this._addMarker(value);
    }

    get mostRecentMarker() {
        const arrayLength = this._markersPositions.length;
        if (arrayLength > 0) {
            return this._markersPositions[arrayLength - 1];
        } else {
            return {};
        }
    }

    set markersPositions(value) {
        this._addMarker(value);
    }

    get markersPositions() {
        return this._markersPositions;
    }

    set mapListensForClick(value) {
        this._mapListensForClick = value;
        if (this._mapListensForClick) {
            this._addMarkerOnMapClick();
        }
    }

    get mapListensForClick() {
        return this._mapListensForClick;
    }

} // end class
window.customElements.define('cc-map', CcMap);