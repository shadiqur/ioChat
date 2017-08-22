var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){

	
	socket.on('mymessage',function(data){

		 io.emit('chat message', data);
		// console.log(data.name+' : ' +data.msg);
	});
});

http.listen(3000,function(){
	console.log('listing to *:3000');
});

