var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var fs = require('fs');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'nodelogin'
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));

});

app.get('/ilacim_nerede.html', function (request, response) {
	response.sendFile(path.join(__dirname + '/ilacim_nerede.html'));

});

app.get('/kullanici.html', function (request, response) {
	response.sendFile(path.join(__dirname + '/kullanici.html'));

});

app.get('/kayit.html', function (request, response) {
	response.sendFile(path.join(__dirname + '/kayit.html'));

});

app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/ilacim_nerede.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/kayit', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	if(true){
		connection.query('INSERT INTO accounts (username, password) VALUES ?',[username,password],function(error, results,fields){
			if(true){
				request.session.register = true;
				request.session.password = password;
				response.redirect('/');
			}
		})
	}
}); 




//app.listen(5500,"127.0.0.1");


app.listen(5000);