var queryTerm = "";

L.Control.BingGeocoder = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topleft',
		text: 'Search Address',
		callback: function (results) {
			var bbox = results.resourceSets[0].resources[0].bbox,
				first = new L.LatLng(bbox[0], bbox[1]),
				second = new L.LatLng(bbox[2], bbox[3]),
				bounds = new L.LatLngBounds([first, second]);
			this._map.fitBounds(bounds);
			//This stuff adds a marker to the map with a popup showing the text typed in
			var latLngCtr = bounds.getCenter();
			var locnMarker;
			locnMarker = new L.marker(latLngCtr).addTo(map).bindPopup(queryTerm).openPopup();
		}
	},

	_callbackId: 0,

	initialize: function (key, options) {
		this.key = key;
		L.Util.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;
		var className = 'leaflet-control-geocoder',
			container = this._container = L.DomUtil.create('div', className);

		L.DomEvent.disableClickPropagation(container);

		var form = this._form = L.DomUtil.create('form', className + '-form');

		var input = this._input = document.createElement('input');
		input.type = "text";
		input.placeholder = "Search by address or postal code"; //Change this to change text inside of box

		var submit = document.createElement('button');
		//submit.type = "submit"; //REMOVED THIS LINE SO THAT IT WORKS IN INTERNET EXPLORER 8
		submit.innerHTML = this.options.text;

		form.appendChild(input);
		form.appendChild(submit);

		L.DomEvent.addListener(form, 'submit', this._geocode, this);

		if (this.options.collapsed) {
			L.DomEvent.addListener(container, 'mouseover', this._expand, this);
			L.DomEvent.addListener(container, 'mouseout', this._collapse, this);

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Bing Geocoder';

			L.DomEvent.addListener(link, L.Browser.touch ? 'click' : 'focus', this._expand, this);

			this._map.on('movestart', this._collapse, this);
		} else {
			this._expand();
		}

		container.appendChild(form);

		return container;
	},

	_geocode : function (event) {
		L.DomEvent.preventDefault(event);
		this._callbackId = "_l_binggeocoder_" + (this._callbackId++);
		window[this._callbackId] = L.Util.bind(this.options.callback, this);
		
		queryTerm = this._input.value;
		
		var params = {
			query: this._input.value,
			key : this.key,
			jsonp : this._callbackId
		},
		url = "http://dev.virtualearth.net/REST/v1/Locations" + L.Util.getParamString(params),
		script = document.createElement("script");

		script.type = "text/javascript";
		script.src = url;
		script.id = this._callbackId;
		document.getElementsByTagName("head")[0].appendChild(script);
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-geocoder-expanded', '');
	}
});
