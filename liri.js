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
                
                fs.appendFileSync("log.txt", "*****EVENT INFO*****\n");
                console.log("*****EVENT INFO*****");
                
                fs.appendFileSync("log.txt", i+ "\n");
                console.log(i);
                
                fs.appendFileSync("log.txt", "Name of Venue: " + concerts[i].venue.name+"\n");
                console.log("Name of Venue: " + concerts[i].venue.name);

                fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city+"\n");
                console.log("Venue Location: " + concerts[i].venue.city);

                fs.appendFileSync("log.txt", "Date of Event: " + concerts[i].datetime+"\n");
                console.log("Date of Event: " + concerts[i].datetime);

                fs.appendFileSync("log.txt", "**************************" + "\n");
                console.log("**************************");
            }
        } else {
            console.log("Error Occured")
        }
    });
}

// Function for music info Spotify
function showSongInfo(inputParameter){
    if (inputParameter === undefined) {
        // default song
        inputParameter = "The Sign"; 
    }
    spotify.search({
        type: "track",
        query: inputParameter
    },
    function (err, data) {
        if (err) {
            console.log("error occured: " + err);
            return;
        }
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            fs.appendFileSync("log.txt", "*******Song Info*******\n");
            console.log("*******Song Info*******");
            
            fs.appendFileSync("log.txt", i + "\n");
            console.log(i);

            fs.appendFileSync("log.txt", "Artist: " + songs[i].artist[0].name + "\n");
            console.log("Atist:  " + songs[i].artist[0].name);

            fs.appendFileSync("log.txt", "Song Name: " + songs[i].name + "\n");
            console.log("Song Name:  " + songs[i].name);

            fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
            console.log("Preview Song:  " + songs[i].preview_url);

            fs.appendFileSync("log.txt", "Album: " + songs[i].album.name + "\n");
            console.log("Preview Song:  " + songs[i].preview_url);

            fs.appendFileSync("log.txt", "**********************\n");
            console.log("**********************");
        }
    }
    );
};

//Function for Movie Info: OMDB
function showMovieInfo(inputParameter){
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        
        fs.appendFileSync("log.txt", "---------------\n");
        console.log("---------------");

        fs.appendFileSync("log.txt", "If you havent watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tto485974/");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")

        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=c594021";
    request(queryUrl, function(error, response, body){
        //If request is succesful
        if (!error && response.statusCode === 200) {
            var movies = JSON.parse(body);
            fs.appendFileSync("log.txt", "*******Movie Info*******\n");
            console.log("*******Movie Info*******");

            fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
            console.log("Title: " + movies.Title);

            fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
            console.log("Release Year: " + movies.Year);

            fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
            console.log("IMDB Rating: " + movies.imdbRating);

            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: ", + getRottenTomatoesRatingValue(movies) + "\n");
            console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));

            fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
            console.log("Country of Production: " + movies.Country);

            fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n")
            console.log("Language: " + movies.Language);

            fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
            console.log("Plot: " + movies.Plot);

            fs.appendFileSync("log.txt", "Actors: " + movies.Actor + "\n");
            console.log("Actor: " + movies.Actor);

        } else {
            console.log("Error Occured");
        }
    });
}

// function to get proper Rotten Tomatoes Rating

function getRottenTomatoesRatingObject(data) {
    return data.Ratings.find(function (item){
        return item.Source === "Rotten Tomatoes";
    });
}

function getRottenTomatoesRatingValue(data) {
    return getRottenTomatoesRatingObject(data).value;
}

// function for reading out of random.txt file

function showSomeInfo(){
    fs.readFile("random.txt", "utf8", function(err,data){
        if (err){
            return console.log(err);
        }
        var dataArr = data.split(",");
        userInputs(data[0], dataArr[1]);
    });
}