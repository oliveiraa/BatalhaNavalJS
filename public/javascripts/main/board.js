var board = function() {

  var initialPlayerShips = 5;
	var playerShips = 5;

  function InitializeEvents() {
    $('#btnClearShips').click(btnClearShipsClicked);
    $('#btnReady').click(btnReadyClicked);
  }

  function btnReadyClicked() {
    $("#btnClearShips").hide();
  }
  
  function btnClearShipsClicked() {
    ResetShipSelection();
  }
  
  function AddShip(){
    $(this).addClass('playerBlock');
    playerShips = playerShips - 1;
    $('#shipsRemaining').text(playerShips);
    if(playerShips <= 0)
      $('.block').off('click', AddShip);
  }
  
  function ResetShipSelection() {
    $(".playerBlock").removeClass('playerBlock');
    playerShips = initialPlayerShips;
    $('#shipsRemaining').text(playerShips);
    $('.block').on('click',AddShip);
  }

  return {
    Initialize: function() {      
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
          block += "<div class='block' data-line='" + i + "' data-column='" + j + "'></div>";
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
