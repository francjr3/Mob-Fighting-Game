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

console.log(image)


function animate() {
    window.requestAnimationFrame(animate)
    context.drawImage(image, -593, -800)
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
}
animate()

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            console.log(e.key)
            break
        case 'a':
            console.log(e.key)
            break
        case 's':
            console.log(e.key)
            break
        case 'd':
            console.log(e.key)
            break

    }
})
