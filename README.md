# leaflet.PrintPreview

Preview, adjust, and print the current map without a server component, checkout the [Demo](https://marcchasse.github.io/leaflet.PrintPreview/)

PrintPreview resizes the current map to fit a letter piece of paper thanks to this [stackoverflow post](http://stackoverflow.com/questions/16649943/css-to-set-a4-paper-size).
The map can then be zoomed and panned to fit exactly what needs to be printed.

## Quick Start

1. Create a leaflet map. Checkout Leaflets [Quick Start Guide](http://leafletjs.com/examples/quick-start.html) for a basic map example.

2. Include PrintPreview javascript and css

    ```html
    <link id="pp-main" rel="stylesheet" href="./leaflet.printpreview.css" disabled>
    <link id="pp-ltr-land" rel="stylesheet" href="./leaflet.printpreview.letter.landscape.css" disabled>
    <link id="pp-ltr-port" rel="stylesheet" href="./leaflet.printpreview.letter.portrait.css" disabled>
    <script src="./leaflet.printpreview.js"></script>
    ```
3. Add the map control:
    ```javascript
    //Assumes your id is #map. If you have a different id pass it to PrinPreview
    //L.PrintPreview('#map_id').addTo(map);
    L.PrintPreview().addTo(map);
    ```
## Complete Example
Here is everything you need to get this up and running. Copy and past the following to an `.html` file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Leaflet.PrintPreview DEMO</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-rc.1/leaflet.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <link id="pp-main" rel="stylesheet" href="https://rawgit.com/MarcChasse/leaflet.PrintPreview/master/leaflet.printpreview.css" disabled>
    <link id="pp-ltr-land" rel="stylesheet" href="https://rawgit.com/MarcChasse/leaflet.PrintPreview/master/leaflet.printpreview.letter.landscape.css" disabled>
    <link id="pp-ltr-port" rel="stylesheet" href="https://rawgit.com/MarcChasse/leaflet.PrintPreview/master/leaflet.printpreview.letter.portrait.css" disabled>
	<style>html,body{margin:0;}#map{width:100vw;height:100vh;}</style>
</head>
<body>
	<div id="map" ></div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-rc.1/leaflet.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="https://rawgit.com/MarcChasse/Leaflet.PrintPreview/master/leaflet.printpreview.js"></script>
	<script>
	    osm = new L.TileLayer(
	    	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	    	{attribution: 'Map data &copy; OpenStreetMap contributors'}
	    );

	    var map = L.map('map', {
	        center: [52.27,-113.81],
	        zoom: 12
	    });
		map.addLayer(osm);

		L.PrintPreview().addTo(map);
	</script>
</body>
</html>
```
Checkout the [DEMO](https://marcchasse.github.io/Leaflet.PrintPreview/)

## Options
TBD.