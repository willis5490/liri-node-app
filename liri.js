require("dotenv").config();
// var keys = require("keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var tweets = require("twitter");

// var spotify = new Spotify(keys.spotify);
 var promt = process.argv[2];


if (promt == "spotify-this-song"){
    var song = process.argv[3];
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
      });
      spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var deets = data.tracks.items
        for (var i = 0; i < deets.length; i++){
            console.log(JSON.stringify("Artists name:" + deets[i].album.artists[0].name,null,2));
            console.log(JSON.stringify("Song Name: " + deets[i].name,null,2));
            console.log(JSON.stringify("Preview the song: " + deets[i].preview_url,null,2));
            console.log(JSON.stringify("Album Name: " + deets[i].album.name,null,2 ));
            
        }
       
      });

}
else if (promt == "my-tweets"){
    console.log("still needs tweets");

}
else if (promt == "movie-this"){
    var movieName = process.argv[3];
    var movURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(movURL, function(error, response, body){

        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where movie was made: " + JSON.parse(body).Country);
            console.log("Language of Movie: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })

}
else if (promt == "do-what-it-says"){
    console.log("still needs what it says!");

}
else {
    console.log("You need to selct a prompt that works with this app! Your smarter than this!!")
}
