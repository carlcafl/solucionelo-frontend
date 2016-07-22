var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next) {
	//Header de proteccion XSS
    res.setHeader("X-XSS-Protection", "1; mode=block");
    //Header de proteccion de politica de seguridad
    //res.setHeader("Content-Security-Policy", "default-src 'unsafe-inline' *; script-src 'unsafe-inline' *; connect-src 'unsafe-inline' *; img-src *; style-src 'unsafe-inline' *;");
    return next();
  });
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
