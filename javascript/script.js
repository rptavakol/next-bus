/*
This application shows the user when the next Bus is leaving from a selected list of bus station.

Function Flow:
    ajaxCall(stationID) -> createCurrStationScheduleArray(data) -><- matchLineColours (lineColours, currStationSchedule) 
    -> convertToTable(currStationSchedule) -> injectIntoDOM(table)

Created by Peyman (Ryan) Tavakol
*/


$(document).ready( function() {

    console.log('START of Script.');



    //////////////////////////////////////////7///////
    //Master Data
    var lineColours = [["5","#00975f"],["21","#e30613"],["22","#fdc300"],["23","#e48f00"],["24","#8d2176"],["26","#f39b9a"],["27","#4e2583"],["28","#b2a0cd"],["29","#10bbef"],["30","#baabd4"],["31","#4b96d2"],["32","#a1c3d6"],["33","#0069b4"],["34","#009fe3"],["35","#4e2583"],["36","#b2a0cd"],
    ["37","#10bbef"],["38","#0097b5"],["39","#512985"],["M1","#f0d51f"],["M2","#f0d51f"],["M3","#f0d51f"],["M4","#f0d51f"],["M5","#f0d51f"]];

    //ajax request main url
    var urlG = 'http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element';

    //var urlMaster = urlG + '?hafasID=' + stationID[0] + '&time=null'; 

    //Ringstrasse as Default Station
    var defaultStation = ['6791','Ringstrasse'];
    stationID = defaultStation;
    ///////////////////////////////////////////////////



    //Initial Ajax Call for default station
    ajaxCall(stationID)
    //setInterval(function () {ajaxCall(stationID);}, 3000)
    





    //User Station ID selection Logic, triggers ajax call
    $('.jQStation').on('click', function(){
    //On station click, do the following:        
        //Initialize array
        var selectedStationID = [];
        //Add unique station ID to array 
        selectedStationID.push($(this).attr('id'));
        //Add name of station to array 
        selectedStationID.push($(this).text());
        //set global variable for line 72
        stationID = selectedStationID;
        //console.log('stationID, name: ' + selectedStationID); //DB
        //Make ajax call based on stationID = [ID, name]
        ajaxCall(stationID)
        //setInterval(function () {ajaxCall(stationID);}, 3000)
    }); 

    //Makes sure dropdown selected text changes to selected station
    $(".dropdown-menu").on('click', 'li a', function(){
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
    });


    function ajaxCall (stationID) {
     console.log('Executing Ajax Call');        //DB      
        $.ajax({
                    beforeSend: function(request) {
                    //set header and API key
                        request.setRequestHeader("RNV_API_TOKEN", 'sauv277demidl1do7imandb9pk');
                    },
                    dataType: "json",
                    url: urlG + '?hafasID=' + stationID[0] + '&time=null',
                    async : true,

                    success: createCurrStationScheduleArray,       

                    error: function() {
                        console.log('Error occured');
                    }

                });
            
        };

    
    
    //Creates readable array of current schedule from ajax data
    function createCurrStationScheduleArray(data) {

                var stationObject = data;
                console.log('stationObject:', stationObject);

                currStationSchedule = [];
                currPair = [];
                
                //notice: myArray[i] = [timeDiff, [lineID, direction, bustop, colorClass]]
                for(var i = 0; i < stationObject['listOfDepartures'].length; i++) {
                    currPair = [    stationObject['listOfDepartures'][i]['differenceTime'], 
                                    [
                                    stationObject['listOfDepartures'][i]['lineLabel'],
                                    stationObject['listOfDepartures'][i]['direction'], 
                                    'Ab '+stationID[1],                    
                                    'iris'
                                    //'#' + stationObject['color'] 
                                    ]
                                    ];
                    //push pair for each train into currentSchedule
                    currStationSchedule.push(currPair);
                };                        
            
            //console.log("currStationSchedule:", currStationSchedule)     //DB
            convertToTable(matchLineColours(lineColours, currStationSchedule));
    };

    //Returns currStationSchedule with all line colours to createCurrStationScheduleArray
    function matchLineColours (lineColours, currStationSchedule) {
        
        for(var i = 0; i < currStationSchedule.length; i++) {
            for(var j = 0; j < lineColours.length; j++){
                //if find a match of line IDs
                if(currStationSchedule[i][1][0] == lineColours[j][0]) {
                    //console.log('match! ' + lineColours[j][0] )     //DB
                    //add hex number instead of colour class?
                    currStationSchedule[i][1][3] = lineColours[j][1];
                }
            }
        }
        //console.log('after', currStationSchedule);     //DB
        return currStationSchedule;
    };

    //Creates HTML table from currStationSchedule (with line colours) array
    function convertToTable(myArray) {
        var result = "<tbody>";

        //console.log('my array'+ myArray)     //DB

        for(var i=0; i<myArray.length; i++) {
        //notice: myArray[i] = [timeDiff, [lineID, direction, bustop, colorClass]]

            //print css class
            //result += "<tr class=" + myArray[i][1][3] + ">"

            if (myArray[i][1][3].slice(0,1) != '#') {
                result += "<tr class='" + myArray[i][1][3] + "'>" ;
            }
            else {
                result += "<tr class='' style='background-color:" + myArray[i][1][3] + ";'>" };


            //Figure out if current array item is bus info or time, add html accordinlgy (J = 2)
            for(var j= myArray[i].length-1; j>=0; j--){

                //if not first item (not bus time) of an array item
                if(j != 0) {
                        result += "<td class='small busInfo col-xs-8'><table class='table table-responsive auto table-condensed second-table'> <tr><td><h4 class='busName'>"
                        +myArray[i][j][0]+"</h4></td></tr><tr><td><h5 class='busDirection'>" + myArray[i][j][1] + "</h5></td></tr><tr><td><h5 class='busStop'>" + myArray[i][j][2] +
                        "</h5></td></tr></table></td>"; //Add rows within rows 
                }else {result += "<td class='busTime col-xs-6 text-center'>"+myArray[i][j]+"</td>";}
            }
            result += "</tr>";
        }
        result += "</tbody>";

        injectIntoDOM(result)

        //return result;
    };

    //Inserts table into DOM
    function injectIntoDOM (table) {

        //currStationSchedule is array of bus schedules. combined schedules merges them together and sorts
        $('#busTable').html(table);    //Main Logic visible

        //$('.locSelected span:first-child').fadeToggle(1000).fadeToggle(450);

        $('.busDirection').prepend('<span class="glyphicon glyphicon glyphicon-menu-right" aria-hidden="true">');

        $('.busTime').append('<p> minutes <p>');

        //Make location icon blink everytime table is updated
        $('.glyphicon-map-marker').fadeToggle(1000).fadeToggle(450);
    };

console.log('END of Script.')

});


/*

var lat1 = 30
var lon1 = 39

var lat2 = 30
var lon2 = 37


var lat3 = 28
var lon3 = 21


//d=2*asin(sqrt((sin((lat1-lat2)/2))^2 + cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2))

var a = 2* Math.asin(Math.sqrt((Math.sin((lat1-lat2)/2))**2 + Math.cos(lat1)*Math.cos(lat2)*(Math.sin((lon1-lon2)/2))**2))

var b = 2* Math.asin(Math.sqrt((Math.sin((lat1-lat3)/2))**2 + Math.cos(lat1)*Math.cos(lat3)*(Math.sin((lon1-lon3)/2))**2))

alert(a)
alert(b)

*/