const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70))
}
//console.log(collisionsMap)
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70))
}
//console.log(battleZonesMap)


const boundaries = []
const offset  = {
    x: -593,
    y: -810
}


collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

// console.log(boundaries)

// context.fillStyle = "white"
// context.fillRect(0,0, canvas.width, canvas.height)

const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

// console.log(battleZones)


const image = new Image()
image.src = "./img/PSGmap.png"

const foregroundImg = new Image()
foregroundImg.src = "./img/foregroundObjects.png"

const foregroundImg2 = new Image()
foregroundImg2.src = "./img/foregroundObjects2.png"

const playerLeftImg = new Image()
playerLeftImg.src = "./img/playerLeft.png"

const playerRightImg = new Image()
playerRightImg.src = "./img/playerRight.png"

const playerUpImg = new Image()
playerUpImg.src = "./img/playerUp.png"

const playerDownImg = new Image()
playerDownImg.src = "./img/playerDown.png"


const player = new Sprite ({
    position: {
        x: canvas.width/2 - 192 / 8, 
        y: canvas.height/2 - 68 / 2,
    },
    image: playerDownImg,
    frames: {
        max: 4
    },
    sprites: {
        left: playerLeftImg,
        right: playerRightImg,
        up: playerUpImg,
        down: playerDownImg
    }
})


const background = new Sprite ({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: image
})


const foreground = new Sprite ({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImg
})


const foreground2 = new Sprite ({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImg2
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


const movables = [background, ...boundaries, foreground, foreground2, ...battleZones]

function rectCollision({rect1, rect2}) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    battleZones.forEach(zone => {
        zone.draw()
    })
    player.draw()
    foreground.draw()
    foreground2.draw()

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const zone = battleZones[i]
            const overlappingArea = (Math.min(player.position.x + player.width, zone.position.x + zone.width)
            - Math.max(player.position.x, zone.position.x))
            * (Math.min(player.position.y + player.height, zone.position.y + zone.height)
            - Math.max(player.position.y, zone.position.y))
            if (
                rectCollision({
                    rect1: player,
                    rect2: zone
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01
            ) {
                console.log("BATTLE")
                break
            }
        }
    }

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                // console.log("colliding")
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                // console.log("colliding")
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
        })
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                // console.log("colliding")
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollision({
                    rect1: player,
                    rect2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                // console.log("colliding")
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
        })
    }
}


animate()
let lastKey = ''


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
    // console.log(keys)
})

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey ='a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    // console.log(keys)
})
