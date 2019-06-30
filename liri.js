require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];

userInputs(userOption, inputParameter);

function  userInputs (userOption, inputParameter){
    switch (userOption) {
        case "concert-this":
            showConcertInfo(inputParameter);
            break;
        case "spotify-this:
            showSongInfo(inputParameter);
            break;
        case "movie-this":
            showMovieInfo(inputParameter);
        case "do-this":
            showSomeInfo();
            break;
        default:
            console.log("I dont understand")
    }
}

// Function Bands In Town
function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log(*****EVENT INFO*****);
                fs.appendFileSync("log.txt", "*****EVENT INFO*****\n");
                console.log(i);
                fs.appendFileSync("log.txt", i+ "\n");
                
            }
        }
    })
}