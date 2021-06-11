// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
let map, heatmap;

function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
} 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 37.775, lng: -122.434 },
    mapTypeId: "satellite",
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];
  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
  console.log(map)
  map.setCenter(new google.maps.LatLng(18+randomNumber(43267,60860)/100000,73+randomNumber(76281,96988)/100000))
}

// Heatmap data: 500 Points
function getPoints() {
  var points=[];
  for(var i=0;i<=1000;i++){
    points.push({location:new google.maps.LatLng(18+randomNumber(43267,60860)/100000,73+randomNumber(76281,96988)/100000),weight:i*i});
  }

  
  return points;
}

var loc="";
var type="";
var status="";

$(document).ready(function () {
  $('#locationList li a').on('click', function () {
    var txt= ($(this).text());
    loc=txt;
    console.log(txt);
  });

  $('#crimeList li a').on('click', function () {
    var txt= ($(this).text());
    var zz=document.getElementById("startDate").value
    type=txt;
    console.log(txt,zz);
  });

  $('#statusList li a').on('click', function () {
    var txt= ($(this).text());
    status=txt;
    console.log(txt);
  });
});




function getData(){
  var startDate=document.getElementById("startDate").value.replaceAll('-','/');
  var endDate=document.getElementById("endDate").value.replaceAll('-','/');
  console.log(startDate,endDate);

  var query=`SELECT Type,lat,lang from DummyData WHERE City='${loc}' AND Type='${type}' AND Status='${status}' AND Date BETWEEN '${startDate}' AND '${endDate}'`;
  console.log(query);
  const url='/mapdata';
  var data={query:query};


// var xhr = new XMLHttpRequest();
// xhr.open(this.method, url, true);
// xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
// xhr.open('POST', url, true);
// xhr.onload = function () {
//     // do something to response
//     console.log(this.responseText);
// };
// console.log(JSON.stringify(data));
// xhr.send(JSON.stringify(data));

axios.post(url, data)
  .then(function (response) {
    console.log(response.data.results);
    var data=response.data.results;
    var res=[];
    for(var i=0;i<data.length;i++){
      console.log(data[i].lat,data[i].lang);
      res.push({location:new google.maps.LatLng(data[i].lat,data[i].lang),weight:1});
    }
    console.log(res);
    heatmap.setData(res);
  })
  .catch(function (response) {
    console.log('error');
  });
  
}




// function initMap() {
//   function randomNumber(min, max) { 
//     return Math.random() * (max - min) + min;
// } 
//   const myLatLng = { lat: -25.363, lng: 131.044 };
//   const myLatLng2 = { lat: -24.363, lng: 131.044 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: myLatLng,
//   });
  

//   for(var i=0;i<=100;i++){
//     new google.maps.Marker({
//       position: { lat: 18+randomNumber(43267,60860)/100000, lng: 73+randomNumber(76281,96988)/100000 },
//       map,
//       title: "Hello World!",
//     });
//   }
  

  
// }

// L 18.50677,73.76281
// R 18.57709,73.96988
// U 18.60860,73.82372
// D 18.43267,73.85900