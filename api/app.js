'use strict';

const 	express = require('express'),
 		app     = express(),
 		server  = require('http').createServer(app),
		io      = require('socket.io').listen(server),
	 	Client	= require('mariasql'),
	  	cors 	= require('cors'),

		//Global 'system' variables
		__server_port = 3000,
		__server_ip_address = '127.0.0.1';

//DB Client object
const	dbClient = new Client({
		host: __server_ip_address,
		user: 'root',
		password: '',
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
app.get('/', (req, res) => {
	res.render('index.html');
});


var users = 0;
io.on('connection', (socket) => {
	users++;
	io.emit('users', users);

	socket.on('incommingMessage', (res) => {
		io.emit('outcommingMessage', res);
	});

	socket.on('disconnect', () => {
		users--;
		io.emit('disconnect', users);
	});
});

server.listen(__server_port, __server_ip_address, () => {
	console.log('\x1b[37m','API listen on:', '\x1b[36m', __server_ip_address);
	console.log('\x1b[37m','Port:', '\x1b[36m', __server_port);
	console.log('\x1b[37m','DBClient connected at:', '\x1b[36m', __server_ip_address);
	console.log('\x1b[37m','Database name:', '\x1b[36m', dbClient._config.db);
	console.log('\x1b[37m','-------------------------------------');
});