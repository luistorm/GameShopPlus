'use strict';

const 	express = require('express'),
 		app = express(),
 		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
	 	mysql = require('mysql'),
	  	cors = require('cors'),
		orm = require('orm'),

		//Global 'system' variables
		__server_port = 3000,
		__server_ip_address = '127.0.0.1';

//DB Client object
/*const	connection = mysql.createConnection({
		host: __server_ip_address,
		user: 'root',
		password: '',
		database: 'gameshop'
<<<<<<< HEAD
});*/
const db = orm.connect("mysql://luis:1234@"+__server_ip_address+"/gameshop");
db.on('connect', (err) => {
	if (err) 
		return console.error('An error ocurred trying to connect with ORM & DB');
	console.log('Connection successfull with ORM & DB');
});
var User = db.define('usuario' , {
	login: { type: 'text', key:true} ,
	password: { type: 'text' }
} , {
	methods: {
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

User.get('luis',(err,user) => {
	if(err) throw err;
	console.log('I have the user with name: '+user.getLoginAndPass());
});

Consola.get(1, (err,consola) => {
	if(err) throw err;
	console.log('I have the console with name: '+consola.getNombre());
});
=======
	});

//Testing db connection
connection.connect();
connection.query('SELECT j.nombre from Juego as j', function(err, rows, fields) {
	if (!err)
		console.log('The solution is:', rows);
	else
		console.log('Error while performing Query.');
});
	
>>>>>>> 41342611512fa1c2d0c425de47bfc653f74707b4
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
<<<<<<< HEAD
//connection.connect();
=======
>>>>>>> 41342611512fa1c2d0c425de47bfc653f74707b4

server.listen(__server_port, () => {
	console.log('------------------------------------------------');
	console.log('\x1b[37m','API listen on port:', '\x1b[36m', __server_port);
	console.log('\x1b[37m','DBClient connected at:', '\x1b[36m', __server_ip_address);
<<<<<<< HEAD
	//console.log('\x1b[37m','Database name:', '\x1b[36m', connection.config.database);
	//console.log('Database port: ',connection.config.port);
	//console.log('Query with mysql: \n');
	/*connection.query('SELECT j.nombre from Juego as j', function(err, rows, fields) {
  		if (!err)
    		console.log('The solution is: ', rows);
  		else
    		console.log('Error while performing Query.');
	});*/

=======
	console.log('\x1b[37m','Database name:', '\x1b[36m', connection.config.database);
	console.log('\x1b[37m','Database port:', '\x1b[36m', connection.config.port);
>>>>>>> 41342611512fa1c2d0c425de47bfc653f74707b4
	console.log('\x1b[37m','-------------------------------------');
});
//connection.end();