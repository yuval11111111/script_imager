const {
    createCanvas,
    loadImage,
    Image,
    Canvas,
    registerFont
} = require('canvas');
const { count } = require('console');
const fs = require("fs")

let canvasHeigh = 1000
let canvasLength = 1000
const font = 20;
const Color = "d4d4d4"

registerFont('./JetBrainsMono-Medium.ttf', {
    family: 'JetBrains Mono'
})

async function readFile() {
    fs.readFile("./code.txt", "utf8", (err, code) => {
        let longestLineLength = 0;
        const lines = code.split("\n")
        let amoountOfLines = lines.length * font + 30

        for (let line = 0; line < lines.length; line++) {

            if (lines.slice(line,line+1).toString().length > longestLineLength){
                longestLineLength = lines.slice(line,line+1).toString().replace(/#/g,"").replace(/--/g,"").length
            }
        }
        
        canvasLength = (longestLineLength/1.8 * font)
        canvasHeigh = amoountOfLines
        splitLine(code)
    })
}

async function resetImage() {
    const bg = new Image()
    bg.src = "./background.png"

    const canvas = createCanvas(canvasLength, canvasHeigh)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const buffer = canvas.toBuffer();

    await fs.writeFileSync("./image.png", buffer);
}


async function createImage(text, line, color, start) {
    color = (color.toString() == "") ? Color : color
    const bg = new Image()
    bg.src = "./image.png"

    const canvas = createCanvas(canvasLength, canvasHeigh)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    ctx.font = `${font}px JetBrains Mono`
    ctx.fillStyle = "#" + color
    ctx.textAlign = 'left'
    ctx.fillText(text.toString(), (start / 1.7) * font - 1, (line * 20 + 30), text.toString().length * font)

    const buffer = canvas.toBuffer();

    await fs.writeFileSync("./image.png", buffer);
}

async function splitLine(line) {
    const lines = line.split("\n")

    for (let i = 0; i < lines.length + 1; i++) {
        let currentLine = lines.slice(i, i + 1)
        let amountOfColors = (currentLine.toString().length - currentLine.toString().replace(/#/g, "").length)
        let lineLength = 0
        for (let j = 0; j < amountOfColors; j++) {
            createImage(currentLine.toString().split("#").slice(j + 1, j + 2).toString().split("--").slice(1).toString(), i, currentLine.toString().split("#").slice(j + 1, j + 2).toString().split("--").slice(0, 1), lineLength)
            lineLength += currentLine.toString().split("#").slice(j + 1, j + 2).toString().split("--").slice(1).toString().length
        }
    }

}
resetImage()
readFile()