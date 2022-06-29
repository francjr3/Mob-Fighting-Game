const battleBackgroundImg = new Image()
battleBackgroundImg.src = "./img/battleBackground.png"
battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImg
})

draggle = new Monster(monsters.Draggle)
emby = new Monster(monsters.Emby)


const renderedSprites = [draggle, emby]

emby.attacks.forEach(attack => {
    const button = document.createElement("button")
    button.innerHTML = attack.name
    document.querySelector("#attacksBox").append(button)
})

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

const queue = []

// Event listener
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recipient: draggle
        })
        //console.log("button click")
        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
        queue.push(() => {
            draggle.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites
            })
        })
    })
})

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = "none"
})
