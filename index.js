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

var xMouse, yMouse, easyMode = true, hq = false, music, startSound, score = 0, soundVolume

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
  music.volume = 0.5
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

const musicVolumeSlider = document.createElement('input');
const soundVolumeSlider = document.createElement('input');
  
musicVolumeSlider.classList.add('slider');
musicVolumeSlider.type = 'range';
musicVolumeSlider.min = 0;
musicVolumeSlider.max = 100;
musicVolumeSlider.value = 50; // Default value
musicVolumeSlider.step = 1

// Set the (x, y) position
musicVolumeSlider.style.left = `120px`;
musicVolumeSlider.style.top = `465px`;
musicVolumeSlider.style.width = `200px`

musicVolumeSlider.addEventListener('mousemove', () => {
  // the volume range of a JS audio object is from 0-1,
  // but the default value of a range input (slider) is rounded up to the
  // nearest integer. so the range input value cannot be set to 0-1 to
  // permit direct assignment to the audio object volume.
  // tested in chrome and firefox
  music.volume = musicVolumeSlider.value / 100
})

soundVolumeSlider.classList.add('slider');
soundVolumeSlider.type = 'range';
soundVolumeSlider.min = 0;
soundVolumeSlider.max = 100;
soundVolumeSlider.value = 50; // Default value
soundVolumeSlider.step = 1

// Set the (x, y) position
soundVolumeSlider.style.left = `120px`;
soundVolumeSlider.style.top = `515px`;
soundVolumeSlider.style.width = `200px`

// Add a click event listener
soundVolumeSlider.addEventListener('mousemove', () => {
  soundVolume = soundVolumeSlider.value / 100
})

function drawButton(x, y, width, height, text) {
  ctx.save();

  var gradient3
  if (hq) {
    var highlight = Math.sin(this.tickCount / 50) * 10

    gradient3 = ctx.createLinearGradient(highlight * 40, 0, highlight * 25 + 505, -50);
    // Add three color stops
    gradient3.addColorStop(0, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(0.20, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(0.25, "rgba(255, 255, 255, 1)")
    gradient3.addColorStop(0.3, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(0.5, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(0.70, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(0.75, "rgba(255, 255, 255, 1)")
    gradient3.addColorStop(0.8, "rgba(255, 255, 255, 0)")
    gradient3.addColorStop(1, "rgba(255, 255, 255, 0)")
  }

  ctx.beginPath()
  ctx.fillStyle = "rgb(100,100,100)"
  ctx.strokeStyle = "rgb(200,200,200)"
  ctx.lineWidth = 3
  ctx.rect(x, y, width, height)
  ctx.fill()
  ctx.stroke()

  if (hq) {
    ctx.lineWidth = 3
    ctx.strokeStyle = gradient3
    ctx.stroke()
  }

  ctx.font = "20px titleText"
  ctx.textAlign = 'center'
  ctx.fillStyle = "rgba(255, 255, 255)"
  ctx.fillText(text, x + width / 2, y + 10 + height / 2)
  if (hq) {
    ctx.lineWidth = 5

    // ctx.strokeStyle = "rgba(255, 255, 255)"
    ctx.strokeStyle = gradient3
    ctx.strokeText(text, x + width / 2, y + 10 + height / 2)
  }

  ctx.restore()
}

