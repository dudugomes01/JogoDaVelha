// const cellElements = document.querySelectorAll("[data-cel]")
const cellElements = document.querySelectorAll(".cell")
const board = document.querySelector(".board")
const winningTxt = document.querySelector(".winning-message-txt")
const winningMessage = document.querySelector(".winning-message")
const restartbutton =document.querySelector(".winning-message-button")




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
    isCircleTuner = false

    for (const cell of cellElements){
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    }


    setBoard()
    winningMessage.classList.remove("show-winneing-message")
}

const endGame = (isDraw) =>{
    if(isDraw){
        winningTxt.innerText = 'Empate!'
    }else{
        winningTxt.innerText = isCircleTuner 
        ? "O Venceu!" 
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

const checkForDraw = ()=>{
    return[...cellElements].every(cell=>{
       return cell.classList.contains('x') || cell.classList.contains("circle")
    })
}

const placeMark = (cell,  classToAdd) =>{
    cell.classList.add(classToAdd)
}

const setBoard = ()=>{
    board.classList.remove("circle")
    board.classList.remove("x")

    if(isCircleTuner){
        board.classList.add("circle")
    }else{
        board.classList.add("x")
    }
}

const swapTurns = () =>{
    isCircleTuner = !isCircleTuner

    setBoard()
    
}

const handleClick = (e) =>{
    // Colocar a marca (x) ou (o)
    const cell = e.target;
    const classToAdd = isCircleTuner ? "circle" : "x";
    
    placeMark(cell, classToAdd)

    // Verificar por vitoria
    const isWin = checkForWin(classToAdd)

    //Verificar por Empate
    const isDraw = checkForDraw()

    if(isWin){
       endGame(false)
    } else if(isDraw){
        endGame(true)
    }else{
        // mudar simbolo
        swapTurns()
    }
}


startGame()

restartbutton.addEventListener("click",startGame)

