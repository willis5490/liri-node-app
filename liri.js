require("dotenv").config();
// var keys = require("keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var setDefault = require('set-default');
var promt = process.argv[2];

if (promt == "spotify-this-song") {
    var default1 = setDefault(song).to("The Sign, Ace of Base");
    var song = process.argv[3];
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    spotify.search({ type: 'track', query: song || default1, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var deets = data.tracks.items
        for (var i = 0; i < deets.length; i++) {
            console.log("\nArtists name:" + deets[i].album.artists[0].name);
            console.log("Song Name: " + deets[i].name);
            console.log("Preview the song: " + deets[i].preview_url);
            console.log("Album Name: " + deets[i].album.name + "\n");
            fs.appendFile('log.txt', ('**************** Music Log Begins ****************\r\n' + Date() + '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + deets[i].artists[0].name + '\r\nSong: ' + deets[i].name + '\r\nPreview Link: ' + deets[i].preview_url + '\r\nAlbum: ' + deets[i].album.name + "\n" + '\n**************** Music Log Ends ****************\r\n \r\n'), function(err) {
                if (err) throw err;
            });

        }

    });

}
else if (promt == "my-tweets") {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { screen_name: 'johnnybegood126' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 12; i++) {
                console.log("\n" + tweets[i].text);
                console.log(tweets[i].created_at + "\n");
                fs.appendFile('log.txt', ('\n. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }

        }
        fs.appendFile('log.txt', ('\n****************** Twitter Entry End ******************\r\n \r\n'), function(err) {
            if (err) throw err;
        });
        
    

    });
    
}
else if (promt == "movie-this") {
    if(process.argv[3]==null){
        process.argv[3] = "Mr.Nobody"
    }
    var movieName = process.argv[3];
    var movURL = "http://www.omdbapi.com/?t=" + movieName+ "&y=&plot=short&apikey=trilogy";

    request(movURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("\nMovie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where movie was made: " + JSON.parse(body).Country);
            console.log("Language of Movie: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            fs.appendFile('log.txt', ('**************** Movie Log Begins ****************\r\n' + Date()  + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + body.Title + '\r\nYear: ' + body.Year + '\r\nIMDb Rating: ' + body.imdbRating + '\r\nCountry: ' + body.Country + '\r\nLanguage: ' + body.Language + '\r\nPlot: ' + body.Plot + '\r\nActors: ' + body.Actors  + '\r\n **************** Movie Log Ends ****************\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
       
    })

}
else if (promt == "do-what-it-says") {
    var doIt = fs.readFile("random.txt", "utf8", function (err, data) {
        var song = data.slice(18);
        var spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        });
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var deets = data.tracks

            console.log(deets.items[0].external_urls.spotify);
        })



    })

}
else {
    console.log("You need to selct a prompt that works with this app! Your smarter than this!!")
}
