var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.use(express.static(path.join(__dirname, 'website')));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/website/index.html`);
});

io.on('connection', (socket) => {
	socket.on('disconnect', () => {});
});

http.listen(3000, () => {
	console.log("Server listening.");
});