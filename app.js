var express = require('express'),
    app = express(),
    PORT = 3000,
    localip;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static(path.join(__dirname, 'public')));

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

var server = app.listen(PORT, function() {
    console.log('WebApp Port %d', server.address().port);
});


