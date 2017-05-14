'use strict';

const express 	= require('express'),
 	  server 	= require('http').Server(express),
	  io 		= require('socket.io')(server),
	  Client	= require('mariasql'),
	  cors 		= require('cors'),


	//Global 'system' variables
	__server_port = 3000,
	__server_ip_address = '127.0.0.1';

//Server object
const app = express(),

//DB Client object
	dbClient = new Client({
		host: __server_ip_address,
		user: 'root',
		password: '1234',
		db: 'gameshop'
	});


//Setting app engine 
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Adding cors to server
app.use(cors());

//Setting public server route 
app.use('/public', express.static('public'));

//Unique get endpoint
app.get('*', (req, res) => {
	res.render('index.html');
});

//socket.io default code
io.on('connection', (socket) => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', (data) => {
		console.log(data);
	});
});


app.listen(__server_port, __server_ip_address, () => {
	console.log('\x1b[37m','API listen on:');
	console.log('\x1b[36m', __server_ip_address);
	console.log('\x1b[37m','Port:');
	console.log('\x1b[36m', __server_port);
	console.log('\x1b[37m','DBClient connected at:');
	console.log('\x1b[36m', __server_ip_address);
	console.log('\x1b[37m','Database name:');
	console.log('\x1b[36m', dbClient._config.db);
});