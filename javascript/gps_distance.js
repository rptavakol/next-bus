/*
This application shows the user when the next Bus is leaving from a selected list of bus station.

Function Flow:
    ajaxCall(stationID) -> createCurrStationScheduleArray(data) -><- matchLineColours (lineColours, currStationSchedule) 
    -> convertToTable(currStationSchedule) -> injectIntoDOM(table)

Created by Peyman (Ryan) Tavakol
*/

//ajax request main url
var urlG = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stations/packages/1';


function ajaxCall () {
    console.log('Executing Ajax Call');        //DB      
    $.ajax({
            beforeSend: function(request) {
            //set header and API key
                request.setRequestHeader("RNV_API_TOKEN", 'sauv277demidl1do7imandb9pk');
            },
            dataType: "json",
            url: urlG,
            async : true,

            success: closestStation,       

            error: function() {
                console.log('Error occured');
            }

        });
    
};

ajaxCall();

function createGPSArray(data){

    console.log('Executing createGPSArray');        //DB      

    var stationObject = data;

    console.log(stationObject);        //DB      


/*
    for(var property in stationObject["stations"][i]["longitude"]){
        console.log(property)
    }*/

    var GPSArray =[];
    
    //store each LONG and LAT of each station in array
    //format  [[long],[lat],[ID]]
    for(var i = 0; i < stationObject["stations"].length; i++){
        GPSArray.push( [ [ stationObject["stations"][i]["longitude"] ] , [ stationObject["stations"][i]["latitude"] ], [ stationObject["stations"][i]["hafasID"] ] ] )
    }

//    console.log(GPSArray.toString())
    //console.log(JSON.stringify(GPSArray))
        
    }







var lat1 = 30
var lon1 = 39

var lat2 = 30
var lon2 = 37


var lat3 = 28
var lon3 = 21

//formula
//d=2*asin(sqrt((sin((lat1-lat2)/2))^2 + cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2))

function calcDistance (latO, lonO, latA, lonA) {

    var result = 2* Math.asin(Math.sqrt((Math.sin((latO-latA)/2))**2 + Math.cos(latO)*Math.cos(latA)*(Math.sin((lonO-lonA)/2))**2))

    return result;

    //var b = 2* Math.asin(Math.sqrt((Math.sin((latO-lat3)/2))**2 + Math.cos(latO)*Math.cos(lat3)*(Math.sin((lonO-lonA)/2))**2))
}

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

        var distance = calcDistance(latO, lonO, 
        stationObject["stations"][i]["latitude"]    //latA
        , 
        stationObject["stations"][i]["longitude"]   //lonA
        )

        if(distance < min) {
            min = distance;
            closestStation = stationObject["stations"][i]["longName"];
        }
        


        console.log("iterating...")
    }


    logStation(closestStation);
    //console.log("distance: ", distance)

}


function logStation(stationName) {
    console.log("stationName:", stationName)
}