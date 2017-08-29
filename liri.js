var keys = require('./keys');
var request = process.argv;
var fs = ('fs-node');
var Twitter = require('Twitter');
var T = new Twitter(keys);
var params = { screen_name: 'awallapi', count: 20 };
var Spotify = require('node-spotify-api');

//if the user input is 'my-tweets'
if (request[2] == 'my-tweets') {

    //go to Twitter and "get" those tweets according to the parameters of my screen name
    T.get('statuses/user_timeline', params, function(error, tweets, response) {

        //and if it doesn't break...
        if (!error) {

            //show me what they are
            console.log(tweets);

        }

    });

};

//if the user input is to spotify the song...
if (request[2] == "spotify-this-song") {

    //start a new spotify request via the authentication tools
    var spotify = new Spotify(keys.spotifykeys);

    //and search for these things based on a keyword
    spotify.search({ type: 'track', query: request[3], limit: 20 }, function(err, data) {

        //and if it doesn't break
        if (err) {

            //in which case you'd find out hat error happened
            console.log('Error occurred: ' + err);

            //and tell me what it is
            return
        };

        //then tell me what the spotify info is
        console.log(JSON.stringify(data, null, 2));

    })

};

//if the user input is to look up movie info
if (request[2] == "movie-this") {


    var request2 = require("request");


    	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {


        if (!error && response.statusCode === 200) {


            console.log("The movie's omdb info is: " + JSON.parse(body).imdbRating);
        }
    });
}