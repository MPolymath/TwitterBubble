var app = require('express')();
var http = require('http').Server(app);
var io =  require('socket.io')(http);
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: '9BHeLsq2NTO2kPZKBSkcLm5No',
	consumer_secret: 'SAwsJ6odkwu0efTZ0v7LOCd6uJtWFZA5Wr6Y93q5qRK3ibFNDk',
	access_token_key: '3012074284-EqTcnHDMlEuP7fxF3XMSATQWRHteK3XVNOHiqOJ',
	access_token_secret: 'D1OQ40XjGsd0tUfo1qOfnLNSaJh0foFg2Xio8pVlRks7s'
});

/*		client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
		stream.on('data', function(tweet) {
//			socket.emit('chat message', tweet.txt);
			console.log('tweet: ' + tweet.text);
		});
		});*/

/*io.on('connection', function(socket){
		client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
		stream.on('data', function(tweet) {
//			socket.emit('chat message', tweet.txt);
			console.log('tweet: ' + tweet.text);
			io.emit('chat message', tweet.text);
		});
	})});*/

	app.get('/', function(req, res){
		console.log(__dirname + '/index.html');
		res.sendFile(__dirname + '/index.html');
	});

http.listen(4000, function(){
	console.log('listening on *:4000');
});
