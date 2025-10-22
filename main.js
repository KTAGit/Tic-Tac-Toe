
// Tic Tac Toe gameboard storage
class GameBoard {
    constructor() {
        this.board = [["","",""], ["","",""], ["","",""]] 
    }  

    makeMove(row, col, playerSymbol) {
        this.board[row][col] = playerSymbol
        console.log(this.board)
    }
}

// A class to keep track of a player name and symbol
class Player{
    constructor(name, symbol){
        this.name = name
        this.symbol = symbol
    }
}

// A class to manage the game flow
class controller {
    constructor(gameBoard, player1, player2) {
        this.gameBoard = gameBoard
        this.player1 = player1
        this.player2 = player2
        this.currentPlayer = player1
    }

    playRound(row, col){
        if (this.gameBoard.board[row][col] !== "") {
            return
        }

        this.gameBoard.makeMove(row, col, this.currentPlayer.symbol)

        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
    }
}


const gameBoard = new GameBoard()
const player1 = new Player("Alice", "X")
const player2 = new Player("Bob", "O")
const game = new controller(gameBoard, player1, player2)

game.playRound(0, 1)


