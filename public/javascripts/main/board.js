var board = function() {

  var initialPlayerShips = 4;
	var playerShips = 4;
	var shipSize = 4;
	var socket = {};

  function InitializeEvents() {
    $('#btnClearShips').click(btnClearShipsClicked);
    $('#btnReady').click(btnReadyClicked);
    $('#btnDirection').click(btnDirectionClicked);
    socket.on('message', function(message){
      var msg = eval('(' + message + ')');
      switch(msg.event) {
        case 'GameCreated': {
          UpdatePlayerStatus('Jogo Criado. Aguardando oponente');
          $('#btnReady').hide();
          break;
        }
        case 'OpponentArrived': {
          UpdatePlayerStatus('Oponente escolhido');
          $('#btnReady').hide();
          $('#otherPlayer').text(msg.nome);
        }
      };
    });
  };

  function InitializeVariables() {
    socket = io.connect('http://localhost:3000');
  };

  function btnDirectionClicked(){
    if($(this).text() === "Horizontal")
      $(this).text("Vertical");
    else
      $(this).text("Horizontal");
  };

  function btnReadyClicked() {
    $('#btnClearShips').hide();
    $('#btnDirection').hide();
    UpdatePlayerStatus('Aguardando oponente');
    socket.emit('PlayerReady', { nome: $('#txtName').val() });
  }

  function btnClearShipsClicked() {
    ResetShipSelection();
  }

  function AddShip(){
    if($('#btnDirection').text() === "Horizontal")
      AddHorizontalShip($(this));
    else
      AddVerticalShip($(this));
    playerShips = playerShips - 1;
    $('#shipsRemaining').text(playerShips);
    if(playerShips <= 0) {
      $('.block').off('click', AddShip);
      $('#btnReady').show();
      UpdatePlayerStatus('Aguardando Oponente');
    }
  }

  function UpdatePlayerStatus(status) {
    $('#playerStatus').text(status);
  };

  function AddHorizontalShip($ini) {
    $curr = $ini;
    for(i = 0; i < shipSize; i++) {
      $curr.addClass('playerBlock');
      $curr = $curr.next();
    };
  };

  function AddVerticalShip($ini) {
    var currColumn = $ini.attr('data-pos').split('-')[1];
    var currLine = $ini.attr('data-pos').split('-')[0];
    for(i = 0; i < shipSize; i++) {
      $('div[data-pos|="' + currLine + '-' + currColumn + '"]').addClass('playerBlock');
      currLine++;
    };
  };

  function ResetShipSelection() {
    $(".playerBlock").removeClass('playerBlock');
    playerShips = initialPlayerShips;
    $('#shipsRemaining').text(playerShips);
    $('.block').on('click',AddShip);
    $('#playerStatus').text('Selecione a posição de seus navios');
    $('#btnReady').hide();
  }

  return {
    Initialize: function() {
      InitializeVariables();
      InitializeEvents();
      this.ResetBoard();
      this.SelectShipsPosition();
    },

    ResetBoard: function() {
      var lineTotal = 16;
      var columnTotal = 16;
      var block = "";
      $board = $('#gameboard');
      for(i = 0; i < lineTotal; i++) {
        for(j = 0; j < columnTotal; j++ ) {
          block += "<div class='block' data-pos='" + i + "-" + j + "'></div>";
        }
      }
      $board.append(block);
    },

    SelectShipsPosition: function() {
      ResetShipSelection();
    }
  }
}();

$(function(){
  board.Initialize();
});
