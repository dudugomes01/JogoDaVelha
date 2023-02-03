// const cellElements = document.querySelectorAll("[data-cel]")
const cellElements = document.querySelectorAll(".cell")
const board = document.querySelector(".board")
const winningTxt = document.querySelector(".winning-message-txt")
const winningMessage = document.querySelector(".winning-message")

let isCircleTuner;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () =>{
    for (const cell of cellElements){
        cell.addEventListener("click", handleClick, {once: true})
    }

    isCircleTuner = false

    board.classList.add("x")
}

const endGame = (isDraw) =>{
    if(isDraw){
        winningTxt.innerText = 'Empate!'
    }else{
        winningTxt.innerText = isCircleTuner 
        ? "Círculo Venceu!" 
        : "X venceu"
    }
    winningMessage.classList.add("show-winneing-message")
 
}
 
const checkForWin = (currentPlayer) =>{
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const placeMark = (cell,  classToAdd) =>{
    cell.classList.add(classToAdd)
}

const swapTurns = () =>{
    isCircleTuner = !isCircleTuner

    board.classList.remove("circle")
    board.classList.remove("x")

    if(isCircleTuner){
        board.classList.add("circle")
    }else{
        board.classList.add("x")
    }
}

const handleClick = (e) =>{
    // Colocar a marca (x) ou (o)
    const cell = e.target;
    const classToAdd = isCircleTuner ? "circle" : "x";
    
    placeMark(cell, classToAdd)
    // Verificar por vitoria
    const isWin = checkForWin(classToAdd)
    if(isWin){
       endGame(false)
    }
    // Empate
    // mudar simbolo

    swapTurns()
}


startGame()



