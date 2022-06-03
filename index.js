// const express = require('express'),
//       app = express(),
//       server = require('http').createServer(app),
//       io = require('socket.io')(server)


		// // Define the number of cols/rows for the canvas
		// const CANVAS_ROWS = 50
		// const CANVAS_COLS = 50
	
		// // Create the canvas object so we can store its state locally
		// var canvas = [ ]
	
		// // Populate the canvas with initial values
		// for(var row = 0; row < CANVAS_ROWS; row++){
		// canvas[row] = [ ]
		
		// for(var col = 0; col < CANVAS_COLS; col++){
		// 	canvas[row][col] = "#FF0000"
		// }
		// }
	
	
		// // Make our `public` folder accessible
		// app.use(express.static("public"))
	
		// // Listen for connections from socket.io clients
		// io.on("connection", socket => {
		// // Send the entire canvas to the user when they connect
		// socket.emit("canvas", canvas)
	
		// // This is fired when the client places a color on the canvas
		// socket.on("color", data => {
		// 	// First we validate that the position on the canvas exists
		// 	if(data.row <= CANVAS_ROWS && data.row > 0 && data.col <= CANVAS_COLS && data.col > 0){
		// 	// Update the canvas
		// 	canvas[data.row - 1][data.col - 1] = data.color
		// 	// Send the new canvas to all connected clients
		// 	io.emit("canvas", canvas)
		// 	}
		// })
		// })



const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');



// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : 'kPE`BV%R;8MKbH?"',
// 	database : 'nodelogin'
// });

var connection = require('./config.js').localConnect();
connection.connect(); //Successful

const app = express();

//app.use(require('express-status-monitor')());


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public', 'home.html'));
});


app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/public', 'login.html'));
});


app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.render(path.join(__dirname + '/public', 'loginw.html'));
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');
		response.render(path.join(__dirname+'/public/home.html'));
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(80);