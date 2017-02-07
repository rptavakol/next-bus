/*
This application shows the user when the next Bus is leaving from a selected list of bus station.

Created by Peyman (Ryan) Tavakol
*/

//ajax GPS request main url
var urlGPS = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stations/packages/1';

var latO = 49.4028922222;
var lonO = 8.6810972222;

latO = 49.404759;
lonO = 8.684969;

//trigger getLocation function once page is loaded
getLocation();

//asks user for currrent position
function getLocation() {
    if (navigator.geolocation) {
        //store position
        navigator.geolocation.getCurrentPosition(storePosition);
        //callback - retrieves object with geo-data of all stations
        //ajaxCallGPS();
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}

//stores user's current position into global variables
function storePosition(position) {
    latO = position.coords.latitude;
    lonO = position.coords.longitude;
    console.log('current location:', latO)
    ajaxCallGPS();
}


function ajaxCallGPS () {
    console.log('Executing Ajax Call');        //DB
    $.ajax({
            beforeSend: function(request) {
            //set header and API key
                request.setRequestHeader("RNV_API_TOKEN", 'sauv277demidl1do7imandb9pk');
            },
            dataType: "json",
            url: urlGPS,
            async : true,

            success: closestStation,

            error: function() {
                console.log('Error occured');
            }

        });

};


function closestStation(data) {

    var stationObject = data;
    var min = 10000000;
    var closestStation = null;

    for (var i = 0; i < stationObject["stations"].length; i++ ) {

        //call calcDsitance function
        var distance = calcDistance(latO, lonO,
        stationObject["stations"][i]["latitude"]    //latA
        ,
        stationObject["stations"][i]["longitude"]   //lonA
        )

        //if distance of current iteration is smaller than curren min, replace min with current distance
        if(distance < min) {
            min = distance;
            //closestStation = stationObject["stations"][i]["longName"];
            closestStation = [ stationObject["stations"][i]["hafasID"],  stationObject["stations"][i]["longName"] ];
        }



        console.log("iterating...")
    }
    console.log("closest station ID", closestStation[0]);
    console.log("closest station Name", closestStation[1]);
    //ajaxCall(closestStation);
    //logStation(closestStation);
    //console.log("distance: ", distance)

};

function calcDistance (latO, lonO, latA, lonA) {

    var result = 2* Math.asin(Math.sqrt((Math.sin((latO-latA)/2))**2 + Math.cos(latO)*Math.cos(latA)*(Math.sin((lonO-lonA)/2))**2))

    return result;

    //var b = 2* Math.asin(Math.sqrt((Math.sin((latO-lat3)/2))**2 + Math.cos(latO)*Math.cos(lat3)*(Math.sin((lonO-lonA)/2))**2))
}

function logStation(stationName) {
    console.log("stationName:", stationName)
};





















/*
function createGPSArray(data){

    console.log('Executing createGPSArray');        //DB

    var stationObject = data;

    console.log(stationObject);        //DB

    var GPSArray =[];

    //store each LONG and LAT of each station in array
    //format  [[long],[lat],[ID]]
    for(var i = 0; i < stationObject["stations"].length; i++){
        GPSArray.push( [ [ stationObject["stations"][i]["longitude"] ] , [ stationObject["stations"][i]["latitude"] ], [ stationObject["stations"][i]["hafasID"] ] ] )
    }

//    console.log(GPSArray.toString())
    //console.log(JSON.stringify(GPSArray))

    } */
