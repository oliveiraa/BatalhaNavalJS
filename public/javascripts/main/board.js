var board = function() {

  function InitializeEvents() {
    $('#btnAddBlock').click(btnAddBlockClicked);
  }

  function btnAddBlockClicked() {
    board.AddBlock();
  }

  return {
    Initialize: function() {      
      InitializeEvents();
      this.ResetBoard();
    },
    
    AddBlock: function() {
      $board = $('#gameboard');
      block = "<div class='block'></div>"
      $board.append(block);      
    },
    
    ResetBoard: function() {
      var total = 16 * 16;
      var block = "";
      $board = $('#gameboard');
      for(i = 0; i < total; i++){
        block += "<div class='block'></div>";
      }
      $board.append(block);
    }    
  }
}();

$(function(){
  board.Initialize();
});
