//https://api.mapbox.com/styles/v1/k7archi/cj0rrcnvb00822slfvzly5h61/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiazdhcmNoaSIsImEiOiI4WC1obHQwIn0.4adWiPPI8OX4qFDSkQEREQ

var flightData;
var flightArray;
var flights = [];

var zoom = 10;
var clat = 34.029828;
var clng = -118.283270;
var lmin = 0;
var lmax = 50;
var cx;
var cy;

var fUrl = "https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=" + clat + "&lng=" + clng + "&fDstL=" + lmin + "&fDstU=" + lmax

var ww = 1024;
var hh = 512;

function preload(){
  mapimg = loadImage('https://api.mapbox.com/styles/v1/k7archi/cj0rrcnvb00822slfvzly5h61/static/' +
  clng + ',' + clat + ',' + zoom + '/' +
  ww + 'x' + hh +
  '?access_token=sk.eyJ1IjoiazdhcmNoaSIsImEiOiJjajByYmZqeGMwMmkxMnhucGw1bWNvZ2FxIn0.riFraDZY7pHdCivTyuuVig');

  getFlightData();
}


function setup() {
  createCanvas (ww,hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  setInterval(getFlightData, 100);
  cx = mercX(clng);
  cy = mercY(clat);

  for (var i = 0; i < flightArray.length; i++){

    var aLng = flightArray[i].Long;
    var aLat = flightArray[i].Lat;
    var Id = flightArray[i].Id;
    newFlight(aLng, aLat, Id);

  }
  console.log(flightArray[0]);

}

function draw() {
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  fill(0);
  ellipse(0, 0, 10,10);

  for (var i = 0; i < flightArray.length; i++){

    var aLng = flightArray[i].Long;
    var aLat = flightArray[i].Lat;
    var Id = flightArray[i].Id;

    var currX = mercX(aLng) - cx;
    var currY = mercY(aLat) - cy;

    for (var j = 0; j< flights.length; j++){
    if (Id == flights[j].id){
      flights[j].x = currX;
      flights[j].y = currY;
    }
    // else {
    //   newFlight(aLng, aLat, Id);
    // }
   }
  }

  for (var i=0; i<flights.length; i++){
    flights[i].show();
  }

  //console.log(flights[0]);
}

function gotData(data){
  flightData = data;
  flightArray = flightData.acList;
}

function getFlightData(){
  loadJSON (fUrl, gotData, 'jsonp');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function newFlight(aln, alt, Id_){
  var currX = mercX(aln) - cx;
  var currY = mercY(alt) - cy;

  flights.push(new flight(currX, currY, Id_));
}
