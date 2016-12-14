/*
Created by Peyman (Ryan) Tavakol
*/

//ajax GPS request main url
var urlGPS = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stations/packages/1';

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

ajaxCallGPS();

//formula
//d=2*asin(sqrt((sin((lat1-lat2)/2))^2 + cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2))

var latO = 49.4028922222;
var lonO = 8.6810972222;

latO = 49.404759;
lonO = 8.684969;

console.log("x: ", Array)


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

        if(distance < min) {
            min = distance;
            //closestStation = stationObject["stations"][i]["longName"];
            closestStation = stationObject["stations"][i]["hafasID"];
        }
        


        console.log("iterating...")
    }

    ajaxCall(closestStation);
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