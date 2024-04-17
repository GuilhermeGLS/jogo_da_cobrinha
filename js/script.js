const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const size = 30

const snake = [{ x: 270, y: 240 }]

// Função para spawn aleatorio da comida
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

// Desenhando a comida
const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 12
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

// Desenho da cobra
const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index === snake.length - 1) {
            ctx.fillStyle = "gray"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

// Movimento da cobra
const moveSnake = () => {
    if (!direction) return

    const head = snake.at(-1) //ou snake.leght-1

    // Mover para direita
    if (direction === "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    // Mover para esquerda
    if (direction === "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    // Mover para baixo
    if (direction === "down") {
        snake.push({ x: head.x, y: head.y + size })
    }
    // Mover para cima
    if (direction === "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

// Desenhando Grid
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    // Loop para desenhar todas de uma vez
    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke()

    }


}

// Checando se a cobra comeu a comida
const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)

        food.x = randomPosition(),
        food.y = randomPosition(),
        food.color = randomColor()
    }
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    checkEat()
    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 80)
}

gameLoop()

// Evento das setas
document.addEventListener("keydown", ({ key }) => {

    if (key === "ArrowRight" && direction !== "left") {
        direction = "right"
    }

    if (key === "ArrowLeft" && direction !== "right") {
        direction = "left"
    }

    if (key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }

    if (key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }

})