//Stat Tracker for Betrayal at House on the Hill!
var port = process.env.PORT || 5000, express = require("express"),
    app = express(), characters = require ("./chars.js");	

app.set("view engine", "ejs");
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/views'));
	
var GameStates = {
	selectChars = 1,
	game = 2,
	gameOver = 3
}
var state = GameStates.selectChars;
var players = [];

app.get("/", function(req,res){
	switch (state) {			
		case GameStates.selectChars:
			res.render("selectChars");
			break;
			
		case GameStates.game:
			res.render("game");
			break;
			
		case GameStates.gameOver:
			res.render("gameOver");
			break;
	}
});


app.get("/createPlayer", function(req,res){
	
});

