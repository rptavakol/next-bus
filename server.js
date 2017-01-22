var http = require('http');
//reference app custom module
var app = require('./app');

http.createServer(app.handleRequest).listen(8000);



//Filesystem
//var fs = require('fs');

//var module1 = require('./module1');
//var module2 = require('./module2');

/*
function onRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', null, function(error, data){
    if (error) {
      response.writeHead(404);
      response.write('File no found!')
    } else {
      response.write(data);
    }
    response.end();
  });
  //response.write(module2.myVariable);
  //module2.myFunction();
  //response.end();
} */
