
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , websockets = require('./websockets')
  , socket = require('socket.io')

var app = module.exports = express.createServer();
var io = module.exports = socket.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Socket.IO

websockets.websockets.initialize(io);

// Routes

app.get('/', routes.index);

app.get('/main', routes.getBoard);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
