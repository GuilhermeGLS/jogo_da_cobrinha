const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    { x: 200, y: 200 },
    { x: 230, y: 200 }

]

let direction, loopId

// Desenho da cobra
const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if(index === snake.length - 1){
            ctx.fillStyle = "gray"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

// Movimento da cobra
const moveSnake = () => {
    if(!direction) return

    const head = snake.at(-1) //ou snake.leght-1

// Mover para direita
    if(direction === "right"){
        snake.push({ x: head.x + size, y: head.y })
    }

// Mover para esquerda
    if(direction === "left"){
        snake.push({ x: head.x - size, y: head.y })
    }

// Mover para baixo
if(direction === "down"){
    snake.push({ x: head.x, y: head.y + size })
}
// Mover para cima
if(direction === "up"){
    snake.push({ x: head.x, y: head.y - size })
}

    snake.shift()
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)

    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        gameLoop
    }, 300)
}

gameLoop()

// Evento das setas
document.addEventListener("keydown", ({ key }) => {
    
    if(key === "ArrowRight"){
        direction = "right"
    }

    if(key === "ArrowLeft"){
        direction = "left"
    }

})