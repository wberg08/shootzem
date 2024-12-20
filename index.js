// audio clip that invokes loadedAudio() when it's loaded

// var audio = new Audio();
// // once this file loads, it will call loadedAudio()
// // the file will be kept by the browser as cache
// audio.addEventListener('canplaythrough', loadedAudio, false);
// audio.src = url;

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const canvasWidth = 800
const canvasHeight = 600

var xMouse, yMouse, easyMode = true, hq = false, musicOn = true, music, startSound;

canvas.width = canvasWidth
canvas.height = canvasHeight

const playerX = 50
const playerY = canvasHeight - 50

const background = new Map()
const enemies = new Map()
const powerUps = new Map()
const crumps = new Map()
const muzzleFlashes = new Map()
const projectiles = new Map()
const foreground = new Map()

var storyboardFrame = ''

var projectileCountLimit = 1
var crumpId = 1
var muzzleFlashId = 1
var enemyId = 1
var powerUpId = 1
var projectileId = 1
var backgroundId = 1
var foregroundId = 1

var combo = 0;

const player = new Player(playerX, playerY, 30, '#2222FF')
var score = 0
var failed = false

for (var i = 430; i <= 680; i += 125) {
  for (var j = 90; j <= 500; j += 125) {
    background.set(backgroundId, new Building2(backgroundId, i, j))
    backgroundId++
  }
}

background.set(backgroundId, new Building3(backgroundId, 250, 50))
backgroundId++

// var blueprint_background = new Image();
// blueprint_background.src = 'future.png'; 
// blueprint_background.onload = function() {
//   background.set(3, new Background(
//     [
//       [canvasWidth, 150],
//       [canvasWidth, 250],
//       [canvasWidth - 600, 250],
//       [canvasWidth - 600, 150]
//     ],
//     ctx.createPattern(this, "repeat")
//   ))
// }

function mousedownListener(e) {
  window.removeEventListener('mousedown', this.mousedownListener)
  currentScene = new Start()
  currentScene.start()
  music = new Audio('./start_music.mp3')
  music.volume = 0.75
  startSound = new Audio('./start_sound.mp3')
  startSound.volume = 0.10
  music.play()
  startSound.play()
  gameLoop()
}

// game loop

function gameLoop() {
  requestAnimationFrame(gameLoop)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  currentScene.draw()
  currentScene.tick()
}

window.addEventListener('mousedown', this.mousedownListener)

ctx.save();
ctx.beginPath()
ctx.strokeStyle = "rgb(0,0,0)"
ctx.lineWidth = 3
ctx.rect(0, 0, canvasWidth, canvasHeight)
ctx.stroke()
ctx.restore()


drawing = new Image();
drawing.src = "./power_button.png"; // can also be a remote URL e.g. http://
drawing.onload = function() {
  ctx.save()
  ctx.drawImage(drawing, ((canvasWidth / 2) - (drawing.width / 8)), ((canvasHeight / 2) - (drawing.height / 8)), drawing.width / 4, drawing.height / 4)
  ctx.beginPath()
  ctx.strokeStyle = "rgb(0,0,0)"
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()
};
