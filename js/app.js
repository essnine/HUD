// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

var jsonData;
//  var watchID;
var tags = [];
var stringy;
var stry;

var lng;
var lat;
spd = 0;
var currlong;
var currlat;

var spd;

var spd2 = 0;

function getSpeed(){
  // onSuccess Callback
      //   This method accepts a `Position` object, which contains
      //   the current GPS coordinates
      
      function onSuccess(position) {
          var element = document.getElementById('geolocation');
          element.value = 'Latitude: '  + position.coords.latitude      + '\n' +
                              'Longitude: ' + position.coords.longitude     + '\n' +
                              /*'Speed: '             + position.coords.speed+ '\n' +*/
                              'Accuracy: '             + position.coords.accuracy;
          currlong =  parseFloat(position.coords.longitude);
          currlat =  parseFloat(position.coords.latitude);
          spd = String(position.coords.speed);
          acc = String(position.coords.accuracy);
          if (spd == "null")
          {
            spd2 = "0";
          }
          else {
            spd2 = spd;
          };            

          spd3 = String(String(spd2) + " km/h       ");
          function successed(position) {
            document.getElementById('instr').value = "Success!";
          }
           function failured(error) {
           document.getElementById('instr').value = "Failure!"; 
          }

          bluetoothSerial.write(spd3, successed, failured);

      }

      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      // Options: throw an error if no update is received every 30 seconds.
      //
     watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
}

function currSpeed(){

  var onSuccess = function(position) {
      var element = document.getElementById('coord1');
      element.value = 'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Speed: '             + position.coords.speed;
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
  navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                           [geolocationError],
                                           [geolocationOptions]);
}

function stopNav(){
  navigator.geolocation.clearWatch(watchID);
  clearInterval(speedVar);
  document.getElementById("geolocation").value = "";
  document.getElementById("coord1").value = "";
  document.getElementById("instr").value = "";
}
function geoCode(){   
  getSpeed();

  var addr1 = document.getElementById("inputAddr").value; 
  console.log(addr1);
  
  var add2;
  add2 = 'https://graphhopper.com/api/1/geocode?q='+addr1+'&limit=1&key=9b43afcd-1ef7-4243-8f68-1c98f46b72ae';
  console.log(add2);
  
  jQuery.getJSON(add2, function(result){
  console.log(result);
  //arr2 = JSON.parse(result);  
  console.log(result.hits[0].point);
  var point = result.hits[0].point;
  lng = parseFloat(point.lng);
  console.log(lng);
  lat = parseFloat(point.lat);
  console.log(lat);
  
  destAdd = 'https://graphhopper.com/api/1/route?point='+lat+'%2C'+lng+'&point='+currlat+'%2C'+currlong+'&vehicle=car&key=9b43afcd-1ef7-4243-8f68-1c98f46b72ae'
  console.log(destAdd);
  jQuery.getJSON(destAdd, function(result){
  console.log(result);
  arr1 = Object.keys(result);
  console.log(arr1);
    }); 
  });
  currSpeed();
}

function checkBlue(){
  bluetoothSerial.enable(
    function() {
        console.log("Bluetooth is enabled");
        connectBlue();
    },
    function() {
        console.log("The user did *not* enable Bluetooth");
    }
);
}

function connectBlue(){
  function connectSuccess(){
    alert("Connect success");
  }
  function connectFailure()
  { alert("Failure");
  }
  bluetoothSerial.connect("98:D3:37:00:AB:A2", connectSuccess, connectFailure);
}
/*
          if (spd < 8)
          {
            spd2 += 5;
            spd+=1;
          }
          else
          { if (spd < 13) 
            {     spd2 -= 10;
                  spd+=1;}
            else
              {spd2 = 0;}
            
          }*/