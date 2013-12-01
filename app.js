//Stat Tracker for Betrayal at House on the Hill!
var port = process.env.PORT || 5000, express = require("express"),
    app = express(), characters = require ("./chars.js");	

app.set("view engine", "ejs");
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/views'));
	
var GameStates = {
	selectChars: 1,
	game: 2,
	gameOver: 3
};
var state = GameStates.selectChars;
var players = [];

app.get("/", function(req,res){	
	switch (state) {			
		case GameStates.selectChars:
			res.render("selectChars", {jsonData: characters.Characters});
			break;
			
		case GameStates.game:
			res.render("game", {jsonData: characters.Characters, players: players});
			break;
			
		case GameStates.gameOver:
			res.render("gameOver");
			break;
	}
});

app.get("/startGame", function(req,res){
	state = GameStates.game;
	res.redirect("/");
});

app.post("/createPlayer", function(req,res){
	console.log(req.body);
	var selectedPlayer = characters.Characters[parseInt(req.body["index"])];
	players.push(
	   {name: req.body["name"], 
		char: selectedPlayer,
		currSpeed: selectedPlayer.defaultSpeed,
		currMight: selectedPlayer.defaultMight,
		currSanity: selectedPlayer.defaultSanity,
		currKnowledge: selectedPlayer.defaultKnowledge});
	console.log(players);
	res.redirect("/");
});

app.post("/plus/:stat", function(req,res){
	console.log(req.body);
	var index = parseInt(req.body["index"]);
	switch (req.params['stat']){
		case "speed":
			players[index].currSpeed += 1;
			break;
		case "might":
			players[index].currMight += 1;
			break;
		case "sanity":
			players[index].currSanity += 1;
			break;
		case "knowledge":
			players[index].currKnowledge += 1;
			break;
	}
	res.redirect("/");
});

app.post("/minus/:stat", function(req,res){
var index = parseInt(req.body["index"]);
switch (req.params['stat']){
	case "speed":
		players[index].currSpeed -= 1;
		break;
	case "might":
		players[index].currMight -= 1;
		break;
	case "sanity":
		players[index].currSanity -= 1;
		break;
	case "knowledge":
		players[index].currKnowledge -= 1;
		break;
}
res.redirect("/");
});

app.listen(port);
