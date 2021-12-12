/**
 *
 */
import $ from 'jquery';
import L from 'leaflet';
import Proj4 from 'proj4'
import * as ELG from 'esri-leaflet-geocoder';
import iconMap from "assets/img/map/iconmap.png";
import {LatLng} from "leaflet/dist/leaflet-src.esm";

require('leaflet');

window.jQuery = $;
window.$ = $;
global.jQuery = $;
var $mj = $.noConflict()
var lat = -34.86157;
var lon = -56.17938;
var zoom = 15;
var map;
var selectarea = null;
var results;


//getParadasCercanas([point32721['x'], point32721['y']], DISTANCIA);

const myIcon = L.icon({
	iconUrl: iconMap,
	iconSize: [32, 43],
	iconAnchor: [16, 43],
	popupAnchor: [0, -43]

});

const marker = L.marker([lat, lon], {
	icon: myIcon,
	draggable: true,
	autoPan: true,
});

const geocodeService = ELG.geocodeService({
	apikey: 'AAPK46e02c88e9284088aa4476b1780a56d1BzwMDybORolvb0Ei8R9aTA6SwflWgmZXBVm9zjrPh5BQQJsGIxtSf8hKHXwVMtN-' // replace with your api key - https://developers.arcgis.com
});

const searchControl = ELG.geosearch({
	position: 'topright',
	placeholder: 'Ingrese dirección o sitio',
	useMapBounds: false,
	providers: [ELG.arcgisOnlineProvider({
		apikey: 'AAPK46e02c88e9284088aa4476b1780a56d1BzwMDybORolvb0Ei8R9aTA6SwflWgmZXBVm9zjrPh5BQQJsGIxtSf8hKHXwVMtN-', // replace with your api key - https://developers.arcgis.com
		nearby: {
			lat: lat,
			lng: lon
		}
	})]
});

export function initMap() {
	map = L.map('map').setView([lat, lon], zoom);
	new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	results = L.layerGroup().addTo(map);

	map.addControl(searchControl);

	results.addLayer(marker);

	map.on('click', function(e) {
		geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
			if (error) {
				return;
			}

			results.clearLayers();

			var proj32721 = toProj32721(result.latlng.lat, result.latlng.lng);
			var strPOINT = 'POINT(' + proj32721['x'] +' ' + proj32721['y'] + ')';

			updateLatLng(result.latlng.lat, result.latlng.lng);

			let direccion = result.address.Address
			if(result.address.Address !== "") {
				if (result.address.AddNum !== "")
					direccion = direccion.replace(result.address.AddNum, "")
			}else{
				direccion = result.address.ShortLabel;
			}

			direccion = direccion.trimEnd()

			$mj("input[id*='addPoint']").val(strPOINT);

			$mj("input[id*='addAddress']").val(direccion);
			$mj("input[id*='addAddress']").attr("value", direccion);

			$mj("input[id*='addAddressNumber']").val(result.address.AddNum);
			$mj("input[id*='addAddressNumber']").attr("value", result.address.AddNum);

			results.addLayer(L.marker(result.latlng, { icon: myIcon }).bindPopup(result.address.ShortLabel).openPopup());
		});
	});

	searchControl.on('results', function(data) {
		results.clearLayers();
		for (var i = data.results.length - 1; i >= 0; i--) {

			var proj32721 = toProj32721(data.results[i].latlng.lat, data.results[i].latlng.lng);
			var strPOINT = 'POINT(' + proj32721['x'] +' ' + proj32721['y'] + ')';

			updateLatLng(data.results[i].latlng.lat, data.results[i].latlng.lng);

			let direccion = data.results[i].properties.StAddr
			if(data.results[i].properties.StAddr !== "") {
				if (data.results[i].properties.AddNum !== "")
					direccion = direccion.replace(data.results[i].properties.AddNum, "")
			}else{
				direccion = data.results[i].properties.ShortLabel;
			}

			direccion = direccion.trimEnd()

			// console.log(data.results[i].properties)

			$mj("input[id*='addPoint']").val(strPOINT);
			// $mj("input[id*='addAddress']").val(data.results[i].properties.ShortLabel);
			// $mj("input[id*='addAddress']").val(direccion);
			// $mj("input[id*='addAddressNumber']").val(data.results[i].properties.AddNum);
			$mj("input[id*='addAddress']").val(direccion);
			$mj("input[id*='addAddress']").attr("value", direccion);

			$mj("input[id*='addAddressNumber']").val(data.results[i].properties.AddNum);
			$mj("input[id*='addAddressNumber']").attr("value", data.results[i].properties.AddNum);

			results.addLayer(L.marker(data.results[i].latlng, { icon: myIcon }).bindPopup(data.results[i].properties.ShortLabel).openPopup());
		}
	});
}

export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position, errorCallback) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			/*  Seteo la lat, long y zoom del mapa  */
			map.setView([lat, lon], zoom);

			// results.clearLayers();
			geocodeService.reverse().latlng([lat, lon]).run(function(error, result) {
				if (error) {
					return;
				}

				results.clearLayers();

				var proj32721 = toProj32721(result.latlng.lat, result.latlng.lng);
				var strPOINT = 'POINT(' + proj32721['x'] +' ' + proj32721['y'] + ')';

				updateLatLng(result.latlng.lat, result.latlng.lng);
				let direccion = result.address.Address
				if(result.address.Address !== "") {
					if (result.address.AddNum !== "")
						direccion = direccion.replace(result.address.AddNum, "")
				}else{
					direccion = result.address.ShortLabel;
				}

				direccion = direccion.trimEnd()

				$mj("input[id*='addPoint']").val(strPOINT);
				// $mj("input[id*='addAddress']").val(direccion);
				// $mj("input[id*='addAddressNumber']").val(result.address.AddNum);
				$mj("input[id*='addAddress']").val(direccion);
				$mj("input[id*='addAddress']").attr("value", direccion);

				$mj("input[id*='addAddressNumber']").val(result.address.AddNum);
				$mj("input[id*='addAddressNumber']").attr("value", result.address.AddNum);

				results.addLayer(L.marker(result.latlng, { icon: myIcon }).bindPopup(result.address.ShortLabel).openPopup());
			});

			results.addLayer(L.marker([lat, lon], { icon: myIcon }).bindPopup('Ubicación actual'));

		},
			function error(msg) {alert('Please enable your GPS position feature.');},
			{maximumAge:10000, timeout:5000, enableHighAccuracy: true});
	} else {
		// Console.log("ERROR GEOLOCALIZANDO");
	}
}

export function setLocation(lat, lon, alias){
	// console.log(lat)
	// console.log(lon)
	results.clearLayers();
	const latLng = new LatLng(Number(lat), Number(lon));
	map.setView([lat, lon], zoom);
	results.addLayer(L.marker(latLng, { icon: myIcon }).bindPopup(alias).openPopup());
}


function updateLatLng(la, lo) {
	lat = la;
	lon = lo;
}

export function toProj32721(lat, lon) {

	Proj4.defs("EPSG:32721", "+title=Uruguay EPSG:32721 +proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs");

	var proj4326 = new Proj4.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
	var proj32721 = new Proj4.Proj('EPSG:32721');     //destination coordinates in LCC, south of France

	var coordinates = L.Projection.LonLat.project(L.latLng(lat, lon));

//console.log(coordinates);

	var point = new Proj4.Point(coordinates.x, coordinates.y);   //any object will do as long as it has 'x' and 'y' properties
// console.log(point)
	var point32721 = Proj4.transform(proj4326, proj32721, point);      //do the transformation.  x and y are modified in place

//	console.log(point32721);
	return point32721;
}

export function toProj4326(lat, lon) {

	Proj4.defs("EPSG:32721", "+title=Uruguay EPSG:32721 +proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs");

	var proj4326 = new Proj4.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
	var proj32721 = new Proj4.Proj('EPSG:32721');     //destination coordinates in LCC, south of France

	var coordinates = L.Projection.LonLat.project(L.latLng(lat, lon));
	// console.log("ARRANCA");
	// console.log(coordinates);

	var point = new Proj4.Point(coordinates.x, coordinates.y);   //any object will do as long as it has 'x' and 'y' properties

	// console.log(point)

	// var point32721 = Proj4.transform(proj4326, proj32721, point);      //do the transformation.  x and y are modified in place
	var point32721 = Proj4.transform(proj32721, proj4326, point);      //do the transformation.  x and y are modified in place

	// console.log(point32721);
	// console.log("TERMINA");

	return point32721;
}

export function testCord(x, y) {

	Proj4.defs("EPSG:32721", "+title=Uruguay EPSG:32721 +proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs");

	var proj4326 = new Proj4.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
	var proj32721 = new Proj4.Proj('EPSG:32721');     //destination coordinates in LCC, south of France

	x = parseFloat(x)
	y = parseFloat(y)

	var point = new Proj4.Point(x,y);   //any object will do as long as it has 'x' and 'y' properties
	// var point = new Proj4.Point(x, y);

	var point4326 = Proj4.transform(proj32721, proj4326, point);      //do the transformation.  x and y are modified in place

	return point4326;
}

export function initMapSelectRegion() {

	var customControl = L.Control.extend({
		options: {
			position: 'topleft'
		},
		onAdd: function(map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
			container.style.backgroundColor = '#ffffff';
			container.style.margin = '-2px 10px 10px 10px';
			container.style.width = '34px';
			container.style.height = '34px';

			var link = L.DomUtil.create('a', '', container);
			link.innerHTML = '<img src="../resources/images/map/mapspolygon.svg" style="width: 20px">';
			link.href = '#';
			link.title = 'Establecer zona reparto';
			link.style.width = '28px';
			link.style.height = '28px';
			link.style.backgroundColor = '#ffffff';

			container.onclick = function() {

				if (selectarea == null || (!selectarea._enabled)) {
					container.style.backgroundColor = '#008037';
					link.style.backgroundColor = '#008037';

					selectarea = map.selectAreaFeature.enable();
					selectarea.options.color = '#030303';
					selectarea.options.weight = 3;
				} else {
					container.style.backgroundColor = '#ffffff';
					link.style.backgroundColor = '#ffffff';
					selectarea.disable();


				}

			};
			return container;
		}
	});

	map.addControl(new customControl());

}

