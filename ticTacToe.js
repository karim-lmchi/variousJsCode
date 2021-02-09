// X = 1, O = 2, empty = 0
// if X win, return 1
// if O win, return 2
// if party is not finish, return -1
// if party is finish without winner, return 0
// board is like : [[1, 2, 0], [1, 0, 2], [1, 0, 0]]

function ticTacToeResult(board) {
    var newBoard = [];
    for (var i = 0; i < board.length; i++) {
      newBoard = newBoard.concat(board[i]);
    }
    // differents good combos to win the party
    var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    // We return a new array with only good combos
    var won = winningCombos.filter(win =>
       (newBoard[win[0]] !== 0) 
      && ((newBoard[win[0]] === newBoard[win[1]]) && (newBoard[win[1]] === newBoard[win[2]]))
    );
    // if there is a winner
    if (won.length > 0) {
      return newBoard[won[0][0]];
      // if the party is not finish
    } else if (newBoard.find(value => value === 0) !== undefined) {
      return -1;
      // if party is finish
    } else {
      return 0;
    }
  }