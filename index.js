var express = require('express');
var stormpath = require('express-stormpath');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(stormpath.init(app, {
  apiKeyFile: __dirname + '/stormpath/apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/E8UKp4IZufpLv2ENnglee',
  enableAutoLogin: true,
  enableUsername: true,
  enableRegistration: false,
  enableForgotPassword: true,
}
));

app.get('/AuthUser', stormpath.loginRequired, function(request, response) {
	response.send(response.locals.user);
});

app.get('/', stormpath.loginRequired, function(request, response) {
	  response.redirect('/#Home');
});

app.get('/Home', stormpath.loginRequired, function(request, response) {
	response.redirect('/#Home');
});

app.get('/Platforms', stormpath.loginRequired, function(request, response) {
	response.redirect('/#Platforms');
});

app.get('/Projects', stormpath.loginRequired, function(request, response) {
	response.redirect('/#Projects');
});

app.get('/About', stormpath.loginRequired, function(request, response) {
	response.redirect('/#About');
});

app.get('/Contact', stormpath.loginRequired, function(request, response) {
	response.redirect('/#Contact');
});

app.get('/NewPlatform', stormpath.loginRequired, function(request, response) {
	response.redirect('/#NewPlatform');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
