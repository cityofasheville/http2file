//
var http = require('http');
var fs = require('fs');


//Configure App Here
//Example URL : 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
//urlHost is the host name of the url e.g. 'www.random.org'
//urlPath is the rest of the url e.g. '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
//outputFileLocation is the output file location relative to the root (or the C:\ drive on Windows)
//outputPrefix is a string that will prefix (useful for setting )
//interval is the interval that the application will wait before making another 

var appConfig = {
  urlHost : 'www.publicstuff.com',
  urlPath : '/api/2.0/requests_list?&after_timestamp=1401595200&api_key=i952rk495itu254sx21141j2d3je3x&limit=1000&request_type_id=11339&return_type=json&status=all&verbose=1',
  outputFileLocation : '/htdocs/Graffiti-Dashboard/data/data.js',
  outputPrefix : 'var = gonnafail ',
  interval : 60000
}


//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: appConfig.urlHost,
  path: appConfig.urlPath
};

callback = function(response) {
  var str = appConfig.prefix;

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so write the string to file
  response.on('end', function () {
    fs.writeFile(appConfig.outputFileLocation, str, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("File write complete at " + new Date().toString());
        }
    }); 
  });
}


var recursiveSetTimeout = function(){
  http.request(options, callback).end();
  setTimeout(recursiveSetTimeout, appConfig.interval)
}

recursiveSetTimeout();
