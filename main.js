
// Tic Tac Toe gameboard storage
class GameBoard {
    constructor() {
        this.board = [["","",""], ["","",""], ["","",""]] 
    }  

    makeMove(row, col, playerSymbol) {
        this.board[row][col] = playerSymbol
        console.log(this.board)
    }

    checkWinner(){
        const b = this.board

        for (let i = 0; i < b.length; i++) {
            // Check Row
            if (b[i][0] !== "" && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
                return b[i][0]
            }
            // Check column
            if (b[0][i] !== "" && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
                return b[0][i]
            }
        }
        // Check diagonals
        if (b[0][0] !== "" && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
            return b[0][0]
        }
        if (b[0][2] !== "" && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
            return b[0][2]
        }
        // No winner
        return null
    }

    checkTie(){
        for (const row of this.board) {
            for (const cell of row) {
                if (cell === "") {
                    return false
                }
            }
        }

        return true
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

        const result = this.gameBoard.checkWinner()
        const tie = this.gameBoard.checkTie()

        if(result){
            console.log(`${result} Wins!`)
            return `${result} Wins!`
        }
        if (tie){
            console.log("It's a tie")
            return "It's a tie"
        }
        
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
    }
}

let playerOneScore = 0
let playerTwoScore = 0
let playerOneName 
let playerTwoName
const player1 = new Player(playerOneName, "X")
const player2 = new Player(playerTwoName, "O")
const gameBoard = new GameBoard()
const game = new controller(gameBoard, player1, player2)

const displayController = (function(){

    const container = document.querySelector(".container")

    const renderBoard = function (){
        container.innerHTML = ""
        const board = gameBoard.board
        
        for (let i = 0; i < board.length; i++) {

            const row = board[i]
        
            for (let j = 0; j < row.length; j++) {
                let divBox = document.createElement("div")
                const symbol = row[j]
                divBox.classList.add("div-box")
                divBox.textContent = symbol
                container.appendChild(divBox)
                divBox.dataset.row = i
                divBox.dataset.col = j
            }
        }
        const divs = document.querySelectorAll(".div-box")
        divs.forEach((box) => {
            box.addEventListener("click",  () => {
                const result = gameBoard.checkWinner()
                const tie = gameBoard.checkTie()
                
                if (box.textContent === "" && result === null && tie === false) {
                    game.playRound(box.dataset.row, box.dataset.col)
                    displayController.renderBoard()
                }
            })
        })
        
    }
    
    return {renderBoard}
})()

function startGame(){
    const startBtn = document.querySelector(".start-game-btn")
    const form = document.querySelector("form")
    const overlay = document.querySelector(".form-overlay")
    

    startBtn.addEventListener("click", (e) => {
        e.preventDefault()

        playerOneName = document.querySelector("#player-one-name").value
        playerTwoName = document.querySelector("#player-two-name").value
        
        
        if (playerOneName && playerTwoName) {
            const playerInfo = document.querySelector(".player-info")
            let pOneName = document.createElement("div")
            let pTwoName = document.createElement("div")
            let pOneScore = document.createElement("div")
            let pTwoScore = document.createElement("div")
            pOneName.classList.add("p-one-name")
            pTwoName.classList.add("p-two-name")
            pOneScore.classList.add("p-one-score")
            pTwoScore.classList.add("p-two-score")

            pOneName.textContent = playerOneName
            pTwoName.textContent = playerTwoName
            pOneScore.textContent = playerOneScore
            pTwoScore.textContent = playerTwoScore

            playerInfo.appendChild(pOneName)
            playerInfo.appendChild(pTwoName)
            playerInfo.appendChild(pOneScore)
            playerInfo.appendChild(pTwoScore)


            form.style.display = "none"
            overlay.style.display = "none"

        }else {
            return
        }
        
    })

}
startGame()
displayController.renderBoard()

