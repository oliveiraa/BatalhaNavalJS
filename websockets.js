var websockets = function() {

  function InitializeEvents(io) {
    var socket = io.sockets;
    socket.on('connection', function(client){
      client.on('PlayerReady', function(data) {
        client.set('nickname', data.nome);
        var waiting = HasPlayerWaiting();
        var message = {};
        if(games.length == 0 || waiting == undefined) {
          NewGame(data.nome,client.id);
          message.event = 'GameCreated';
          client.send(JSON.stringify(message));
        } else {
          JoinGame(waiting,data.nome,client.id);
          message.event = 'OpponentArrived';
          message.nome = games[waiting].player1.nome;
          client.send(JSON.stringify(message));

          message.nome = data.nome;
          socket.sockets[games[waiting].player1.id].send(JSON.stringify(message))
        };
      });
    });
  };

  function NewGame(nome,id) {
    var g = new game();
    var p1 = new player();
    p1.nome = nome;
    p1.id = id;
    g.player1 = p1;
    g.id = games.length;
    games.push(g);
  };

  function JoinGame(waiting, nome,id) {
    var p2 = new player();
    p2.nome = nome;
    p2.id = id;
    games[waiting].player2 = p2;
  };

  function HasPlayerWaiting() {
    for(i = 0; i < games.length; i++) {
      var game = games[i];
      if(!game.player2.id)
        return i;
    };
  };

  return {
    initialize: function(io) {
      InitializeEvents(io);
    }
  }
}();

var games = [];

var game = function() {
  return {
    id: 0,
    player1: {},
    player2: {}
  }
};

var player = function() {
  return {
    nome: "",
    id: "",
    pontos: 0
  }
};

exports.websockets = websockets;
