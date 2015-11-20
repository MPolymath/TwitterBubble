var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

module.exports = function(inout){
				client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
					stream.on('data', function(tweet) {
					console.log('tweet: ' + tweet.text);
					inout.emit('chat message', tweet.text);
					})});
				}
