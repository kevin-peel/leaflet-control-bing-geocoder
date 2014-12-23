Leaflet Control Bing Geocoder
=============================

This is a fork of the leaflet-control-bing-geocoder with some modifications to suit my needs.  I'm not the greatest coder, but it seems to work.  Some of my changes might be fixed in the future.

# What is it ?
A simple geocoder plugin for Leaflet that uses Bing to locate places.

Requires:
Leaflet library - <a href="http://leafletjs.com">Leaflet website</a>

Changes from the original repository:
* Works in Internet Explorer 7+, but better in 8+
* Button style updated to match Leaflet 0.7
* Places a marker on the location and has a popup with the user's input (only the latest search is shown)
* Some things here and there

To do:
* Donno yet

# How to use it ?
```javascript
var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
    cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {attribution: cloudmadeAttribution});

var map = new L.Map('map').addLayer(cloudmade).setView(new L.LatLng(48.5, 2.5), 15);

var bingGeocoder = new L.Control.BingGeocoder('your-api-key');

map.addControl(bingGeocoder);
```

# What are the options ?
You can specify an options object as a second argument of L.Control.BingGeocoder.
```javascript
var options = {
    collapsed: true, /* Whether its collapsed or not */
    position: 'topright', /* The position of the control */
    text: 'Locate', /* The text of the submit button */
    callback: function (results) {
        var bbox = results.resourceSets[0].resources[0].bbox,
            first = new L.LatLng(bbox[0], bbox[1]),
            second = new L.LatLng(bbox[2], bbox[3]),
            bounds = new L.LatLngBounds([first, second]);
        this._map.fitBounds(bounds);
    }
};
```

# Browser Support
* IE7+
* Firefox
* Chrome
* Other Gecko and WebKit-based layout engines
