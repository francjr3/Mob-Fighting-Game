const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576
console.log(canvas)

context.fillStyle = "white"
context.fillRect(0,0, canvas.width, canvas.height)

const image = new Image()
image.src = "./img/PSGmap.png"
const playerImg = new Image()
playerImg.src = "./img/playerDown.png"

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite ({
    position: {
    x: -593,
    y: -800
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    context.drawImage(
        playerImg,
        0,
        0,
        playerImg.width/4,
        playerImg.height,
        canvas.width/2 - playerImg.width/8, 
        canvas.height/2 - playerImg.height/2,
        playerImg.width/4,
        playerImg.height
    )
    if (keys.w.pressed) background.position.y += 3
    else if (keys.a.pressed) background.position.x += 3
    else if (keys.s.pressed) background.position.y -= 3
    else if (keys.d.pressed) background.position.x -= 3
}
animate()

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    console.log(keys)
})

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
    console.log(keys)
})
