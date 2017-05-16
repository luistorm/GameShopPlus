'use strict';

const 	express 	= require('express'),
 		app 		= express(),
 		server 		= require('http').createServer(app),
		io 			= require('socket.io').listen(server),
	 	mysql 		= require('mysql'),
	  	cors 		= require('cors'),
		orm 		= require('orm'),

		//Global 'system' variables
		__server_port = 3000,
		__server_ip_address = '127.0.0.1';

const db = orm.connect(`mysql://root:@${__server_ip_address}/gameshop`);

db.on('connect', (err) => {
	if (err)  return console.error('An error ocurred trying to connect with ORM & DB');
	console.log('Connection successfull with ORM & DB');
});

var User = db.define('usuario', {
	login:{type: 'text', key: true},
	password:{type: 'text'}
	},{
	methods:{
		getLoginAndPass: function () {
			return this.login + ' ' + this.password;
		} 
	}
});

var Consola = db.define('consola',{
	id: {type: 'serial',key:true} ,
	nombre: {type: 'text'} ,
	portatil: {type: 'integer'}
	},{
	methods: {
		getNombre: function() { //take special care with the notation function()...
			return this.nombre;
		}
	}
});

User.get('luis',(err, user) => {
	if(err) throw err;
	console.log('I have the user with name: '+user.getLoginAndPass());
});

Consola.get(1, (err, consola) => {
	if(err) throw err;
	console.log('I have the console with name: '+consola.getNombre());
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

//Sockets connection
var users = 0;
io.on('connection', (socket) => {

	users++;
	console.log('new user listen');

	socket.on('incommingMessage', (res) => {
		console.log(res);
		io.emit('outcommingMessage', res);
	});

	socket.on('disconnect', () => {
		users--;
		io.emit('disconnect', users);
	});
});


server.listen(__server_port, () => {
	console.log('------------------------------------------------');
	console.log('\x1b[37m','API listen on port:', '\x1b[36m', __server_port);
	console.log('\x1b[37m','DBClient connected at:', '\x1b[36m', __server_ip_address);
	console.log('\x1b[37m','Database name:', '\x1b[36m', db.driver.config.database);
	console.log('\x1b[37m','Database port:', '\x1b[36m', db.driver.config.port);
	console.log('\x1b[37m','-------------------------------------');
});