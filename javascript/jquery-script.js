$(document).ready( function() {

    console.log('running jquery-script')        //DB
    
    $( "#search" ).hide();


    $('#search-icon').click(function() {

        console.log('clicked on search icon')       //DB

        $( "#search" ).slideToggle(200);
        //$( "#busTable" ).toggleClass('move-table');
        $( "#busTable" ).animate({marginTop : "40px"}, 500);


    });

});