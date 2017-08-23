
const url = require('url'); 
var express   =     require("express");
var app       =     express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var session = require('express-session');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/style'));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({secret: "Shh, its a secret!",Resave: false }));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




app.get('/login',function(req,res){

	console.log(req.session.name);
	res.render('index',{name : req.session.name});
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/home.html');
});


app.post('/',function(req,res,next){
	

	var username = req.body.name;
	var sessdata = req.session;
	sessdata.name = username;

	console.log(username);

  	res.redirect('/login');

	next();	
});



io.on('connection',function(socket){
	socket.on('mymessage',function(data){
	 io.emit('chat message', data);
		console.log(data.msg);
	});
});

http.listen(3000,function(){
	console.log('listing to *:3000');
});

