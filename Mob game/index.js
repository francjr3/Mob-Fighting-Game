const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576
console.log(canvas)

context.fillStyle = "white"
context.fillRect(0,0, canvas.width, canvas.height)

const image = new Image()
image.src = "./img/PSGmap.png"
console.log(image)


image.onload = () => {
    context.drawImage(image, -650, -700)
}
