let score = 0
let play = false
let startPos = [1, 1]
let snake = [startPos]
let snacks = []
let direction = "right"
let disabledDirection = ["left"]
let loseDirection = ["up"]

function generate() {
    const playBoard = document.getElementById("play-board")
    for(let x = 1; x <= 20; x++) {
        for (let y = 1; y <= 20; y++) {
            playBoard.innerHTML += `<div class='play-field' id="${JSON.stringify([y, x])}"></div>`
        }
    }
    createSnack()
}
function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*100))
}
function getPartDiv(postion) {
    return document.getElementById(JSON.stringify(postion))
}
function color(partDiv, color) {
    partDiv.style.backgroundColor = color
}
function disableDirections(position) {
    disabledDirection = []
    if (getPartDiv([position[0]+1, position[1]]) !== null && getPartDiv([position[0]+1, position[1]]).style.backgroundColor === "red"){
        disabledDirection.push("right")
    }
    if (getPartDiv([position[0]-1, position[1]]) !== null && getPartDiv([position[0]-1, position[1]]).style.backgroundColor === "red"){
        disabledDirection.push("left")
    }
    if (getPartDiv([position[0], position[1]+1]) !== null && getPartDiv([position[0], position[1]+1]).style.backgroundColor === "red"){
        disabledDirection.push("down")
    }
    if (getPartDiv([position[0], position[1]-1]) !== null && getPartDiv([position[0], position[1]-1]).style.backgroundColor === "red"){
        disabledDirection.push("up")
    }
}

function createSnack() {
    snacks = []
    const snackX = Math.floor(Math.random() * 20) + 1
    const snackY = Math.floor(Math.random() * 20) + 1
    color(getPartDiv([snackY, snackX]), "green")
    snacks.push(snackY, snackX)
}
function move(direction) {
    let firstPart = snake[snake.length -1]
    if (direction === "right") {
        snake.push([firstPart[0]+1, firstPart[1]])
    } else if (direction === "left") {
        snake.push([firstPart[0]-1, firstPart[1]])
    } else if (direction === "up") {
        snake.push([firstPart[0], firstPart[1]-1])
    } else if (direction === "down") {
        snake.push([firstPart[0], firstPart[1]+1])
    }
    const toRemove = snake.shift()
    color(getPartDiv(toRemove), "black")
    if (snake[snake.length -1][0] === snacks[0] && snake[snake.length -1][1] === snacks[1]) {
        snake.push(snake[snake.length -1])
        createSnack()
    }
}
document.addEventListener('keydown', async (event) => {
    let key = event.key
    if (key === " ") {
        play = !play
        while (play) {
            document.addEventListener("keydown", async (event) => {
                let key = event.key
                if (key === "a" && !disabledDirection.includes("left")) {
                    direction = "left"
                } else if (key === "w" && !disabledDirection.includes("up")) {
                    direction = "up"
                } else if (key === "s" && !disabledDirection.includes("down")) {
                    direction = "down"
                } else if (key === "d" && !disabledDirection.includes("right")) {
                    direction = "right"
                }
            })
            move(direction)
            snake.map(partOfSnake => {
                const partDiv = getPartDiv(partOfSnake)
                color(partDiv, "red")
                disableDirections(partOfSnake)
            })
            await sleep(1)
        }
    }
})