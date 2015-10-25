var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: '9BHeLsq2NTO2kPZKBSkcLm5No',
	consumer_secret: 'SAwsJ6odkwu0efTZ0v7LOCd6uJtWFZA5Wr6Y93q5qRK3ibFNDk',
	access_token_key: '3012074284-EqTcnHDMlEuP7fxF3XMSATQWRHteK3XVNOHiqOJ',
	access_token_secret: 'D1OQ40XjGsd0tUfo1qOfnLNSaJh0foFg2Xio8pVlRks7s'
});

module.exports = function(inout){
				client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
					stream.on('data', function(tweet) {
					console.log('tweet: ' + tweet.text);
					inout.emit('chat message', tweet.text);
					})});
				}
