//Stat Tracker for Betrayal at House on the Hill!
var port = process.env.PORT || 5000, express = require("express"),
    app = express(), characters = require ("./chars.js");	

app.set("view engine", "ejs");
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/views'));

var dummygames = [{id: "0", name: "dummyGame",players: [{name: "dummyname", character: {name: "dummychar"}}]}];
var games = [];

app.get("/", function(req,res){	
	res.render("lobby", {games: games});
});

app.post("/creategame", function(req,res){
	games.push({id: (games.length).toString(), name: req.body["name"],players: []});
	var redir = "/game/"+(games.length-1).toString();
	res.redirect(redir);
});

app.get("/game/:index", function(req,res){
	res.render("game",{game: games[req.params['index']]});
});

app.get("/createplayer/:gameid", function(req,res){
	res.render("selectChars",{jsonData: characters.Characters,gameid: req.params["gameid"]});
});

app.post("/createplayer/:gameid", function(req,res){
	console.log(req.body);
	var selectedPlayer = characters.Characters[parseInt(req.body["index"])];
	games[req.params["gameid"]].players.push(
	   {name: req.body["name"], 
		character: selectedPlayer,
		currSpeed: selectedPlayer.defaultSpeed,
		currMight: selectedPlayer.defaultMight,
		currSanity: selectedPlayer.defaultSanity,
		currKnowledge: selectedPlayer.defaultKnowledge});
	res.redirect("/game/"+req.params["gameid"]);
});

app.post("/game/:gameid/plus/:stat", function(req,res){
	console.log(req.body);
	var index = parseInt(req.body["index"]);
	switch (req.params['stat']){
		case "speed":
			games[req.params["gameid"]].players[index].currSpeed += 1;
			break;
		case "might":
			games[req.params["gameid"]].players[index].currMight += 1;
			break;
		case "sanity":
			games[req.params["gameid"]].players[index].currSanity += 1;
			break;
		case "knowledge":
			games[req.params["gameid"]].players[index].currKnowledge += 1;
			break;
	}
	res.redirect("/game/"+req.params["gameid"]);
});

app.post("/game/:gameid/minus/:stat", function(req,res){
var index = parseInt(req.body["index"]);
switch (req.params['stat']){
	case "speed":
		games[req.params["gameid"]].players[index].currSpeed -= 1;
		break;
	case "might":
		games[req.params["gameid"]].players[index].currMight -= 1;
		break;
	case "sanity":
		games[req.params["gameid"]].players[index].currSanity -= 1;
		break;
	case "knowledge":
		games[req.params["gameid"]].players[index].currKnowledge -= 1;
		break;
}
res.redirect("/game/"+req.params["gameid"]);
});

app.get("/restart", function(req,res){
	players = [];
	state = GameStates.selectChars;
	res.redirect("/");
});

app.listen(port);
