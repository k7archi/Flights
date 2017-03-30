// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

PImage mapimg;
JSONObject flights;

int clat = 0;
int clon = 0;

float flat = 34.02;
float flng = -118.28;
int DstL = 0;
int DstU = 10;

int ww = 1024;
int hh = 512;

int zoom = 1;
//String[] flights;


float mercX(float lon) {
  lon = radians(lon);
  float a = (256 / PI) * pow(2, zoom);
  float b = lon + PI;
  return a * b;
}

float mercY(float lat) {
  lat = radians(lat);
  float a = (256 / PI) * pow(2, zoom);
  float b = tan(PI / 4 + lat / 2);
  float c = PI - log(b);
  return a * c;
}


void setup() {
  size(1024, 512); //http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100
  String url = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/" +
    clat + "," + clon + "," + zoom + "/" +
    ww + "x" + hh +
    "?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw";
  mapimg = loadImage(url, "jpg");
  println(url);
  //String dataUrl = "//http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=" + flat + "&lng=" + flng +"&fDstL="+ DstL +"&fDstU=" + DstU;
  // earthquakes = loadStrings("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv");
  String dataUrl = "https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.439638&lng=-112.008113&fDstL=0&fDstU=10";
  flights = loadJSONObject("https://json2jsonp.com/?url=https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.439638&lng=-112.008113&fDstL=0&fDstU=10/some/json&callback=cbfunc");


  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  float cx = mercX(clon);
  float cy = mercY(clat);

println(flights);
 //for (int i = 0; i < flights.size(); i++) {
    
 //   JSONObject fly = flights.getJSONObject(i); 

 //   int id = fly.getInt("id");
 //   //String species = fly.getString("species");
 //   //String name = fly.getString("name");

 //   println(id);
 // }
}
  
  
  //for (int i = 1; i < flights.length; i++) {
  //  String[] data = flights[i].split(",");
  //  //console.log(data);
  //  float lat = float(data[1]);
  //  float lon = float(data[2]);
  //  float mag = float(data[4]);
  //  float x = mercX(lon) - cx;
  //  float y = mercY(lat) - cy;
  //  mag = pow(10, mag);
  //  mag = sqrt(mag);
  //  float magmax = sqrt(pow(10, 10));
  //  float d = map(mag, 0, magmax, 0, 180);
  //  stroke(255, 0, 255);
  //  fill(255, 0, 255, 200);
  //  ellipse(x, y, d, d);
  //}
  
//}