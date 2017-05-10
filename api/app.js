const express 	= require('express'),
 	  server 	= require('http').Server(express),
	  io 		= require('socket.io')(server),
	  cors 		= require('cors');

const app = express();


//Setting app engine 
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use('/public', express.static('public'));

//UNIQUE GET ENDPOINT

app.get('*', function (req, res) {
	res.render('index.html');
});

io.on('connection', (socket) => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', (data) => {
		console.log(data);
	});
});

let __server_port = 3000,
	__server_ip_address = '127.0.0.1';

app.listen(__server_port, __server_ip_address, () => {
	console.log(`\nAPI listen on: ${__server_ip_address}, \nserver port: ${__server_port}`);
});