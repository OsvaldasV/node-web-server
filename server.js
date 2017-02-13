const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use padeda uzregistruoti middleware
// Priima tris argumentus request objektas, response objekta ir next
// Next reiskia, kad uzsibaigia middleware ir toliau gali pasileisti sekantis kodas, jei next neissaukiam, tai kitas kodas irgi nepasileis
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n');
	// nuo v7 versijos reik taip rasyt
	// fs.appendFile('server.log', log + '\n', (err) => {
	// 	if (err) {
	// 		console.log('Unable to append to server.log.');
	// 	}
	// });
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance',
// 		welcomeMessage: 'Welcome'
// 		})
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});

// 1st argument is root directory, 2nd is request and response
app.get('/', (req, res) => {
	// res.send('<h1>Hello express!</h1>');
	// res.send({
	// 	name: 'Oz',
	// 	surname: 'Wizard',
	// 	likes: [
	// 		'Meditation'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects page'
	});
});

app.get('/bad', (req, res) => {
	// res.send('<h1>Hello express!</h1>');
	res.send({
		errorMessage: 'Error occured'
	});
});
//  /bad - send back json with errorMessage
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});