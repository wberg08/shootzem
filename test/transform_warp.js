// audio clip that invokes loadedAudio() when it's loaded

// var audio = new Audio();
// // once this file loads, it will call loadedAudio()
// // the file will be kept by the browser as cache
// audio.addEventListener('canplaythrough', loadedAudio, false);
// audio.src = url;

const musicVolumeSlider = document.createElement('input');
const soundVolumeSlider = document.createElement('input');
const slider3 = document.createElement('input');
const slider4 = document.createElement('input');
const slider5 = document.createElement('input');
const div2 = document.createElement('div')

musicVolumeSlider.classList.add('slider');
musicVolumeSlider.type = 'range';
musicVolumeSlider.min = 0;
musicVolumeSlider.max = 1;
// musicVolumeSlider.value = 1; // Default value
musicVolumeSlider.step = 0.1

// Set the (x, y) position
musicVolumeSlider.style.left = `120px`;
musicVolumeSlider.style.top = `465px`;
musicVolumeSlider.style.width = `200px`

soundVolumeSlider.classList.add('slider');
soundVolumeSlider.type = 'range';
soundVolumeSlider.min = 137.49;
soundVolumeSlider.max = 137.51;
soundVolumeSlider.value = 137.5; // Default value
soundVolumeSlider.step = 0.001

// Add a click event listener
soundVolumeSlider.addEventListener('mousemove', () => {
  div2.innerText = soundVolumeSlider.value
})

// Set the (x, y) position
soundVolumeSlider.style.left = `120px`;
soundVolumeSlider.style.top = `515px`;
soundVolumeSlider.style.width = `200px`

slider3.classList.add('slider');
slider3.type = 'range';
slider3.min = 1;
slider3.max = 50;
// slider3.value = 50; // Default value
slider3.step = 1

// Set the (x, y) position
slider3.style.left = `120px`;
slider3.style.top = `565px`;
slider3.style.width = `200px`

slider4.classList.add('slider');
slider4.type = 'range';
slider4.min = 0;
slider4.max = 2;
// slider4.value = 50; // Default value
slider4.step = 0.01

// Set the (x, y) position
slider4.style.left = `120px`;
slider4.style.top = `615px`;
slider4.style.width = `200px`

slider5.classList.add('slider');
slider5.type = 'range';
slider5.min = 0;
slider5.max = 50;
slider5.value = 5; // Default value
slider5.step = 1

// Set the (x, y) position
slider5.style.left = `120px`;
slider5.style.top = `665px`;
slider5.style.width = `200px`

document.body.appendChild(musicVolumeSlider)
// document.body.appendChild(div1)
document.body.appendChild(soundVolumeSlider)
document.body.appendChild(div2)
document.body.appendChild(slider3)
document.body.appendChild(slider4)
document.body.appendChild(slider5)

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

// const canvasWidth = 1920
// const canvasHeight = 1080
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

var xMouse, yMouse, easyMode = true, hq = false, music, startSound, score = 0, soundVolume, tick = 0

canvas.width = canvasWidth
canvas.height = canvasHeight

const playerX = 50
const playerY = canvasHeight - 50


const checkColour1WaterHue = 215
const checkColour1WaterSat = 50
const checkColour1WaterLum = 37
const checkColour2WaterHue = 241
const checkColour2WaterSat = 25
const checkColour2WaterLum = 25
const crossColour1WaterHue = 186
const crossColour1WaterSat = 46
const crossColour1WaterLum = 39
const crossColour2WaterHue = 234
const crossColour2WaterSat = 50
const crossColour2WaterLum = 17
const checkColour1SandHue = 36
const checkColour1SandSat = 41
const checkColour1SandLum = 37
const checkColour2SandHue = 33
const checkColour2SandSat = 47
const checkColour2SandLum = 26
const crossColour1SandHue = 40
const crossColour1SandSat = 50
const crossColour1SandLum = 42
const crossColour2SandHue = 31
const crossColour2SandSat = 50
const crossColour2SandLum = 17

const cellSize = 20; // Size of each square

function gameLoop() {
  requestAnimationFrame(gameLoop)

  ctx.save()
  // ctx.transform(0.1,0.1,0.1,0.1,0.1,0.1);

  ctx.fillStyle = 'hsl(' + Math.sin(tick / 1000) * 100  + ' 100% 50%)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const checkColour1Hue = checkColour1SandHue + Math.sin(tick/500) * (checkColour1WaterHue - checkColour1SandHue)
  const checkColour1Sat = checkColour1SandSat + Math.sin(tick/500) * (checkColour1WaterSat - checkColour1SandSat)
  const checkColour1Lum = checkColour1SandLum + Math.sin(tick/500) * (checkColour1WaterLum - checkColour1SandLum)
  const checkColour2Hue = checkColour2SandHue + Math.sin(tick/500) * (checkColour2WaterHue - checkColour2SandHue)
  const checkColour2Sat = checkColour2SandSat + Math.sin(tick/500) * (checkColour2WaterSat - checkColour2SandSat)
  const checkColour2Lum = checkColour2SandLum + Math.sin(tick/500) * (checkColour2WaterLum - checkColour2SandLum)

  ctx.lineWidth = 1
  // for (let row = -2; row - 2 < canvasHeight / cellSize; row++) {
  //   for (let col = -2; col - 2 < canvasWidth / cellSize; col++) {
  for (let row = -2; row - 20 < canvasHeight / cellSize; row++) {
    for (let col = -2; col - 20 < canvasWidth / cellSize; col++) {
      const checkColourAlpFill = (row * 3 / (canvasHeight * 3 / cellSize)) + 0.2
      const checkColourAlpStroke = (row * 3 / (canvasHeight * 3 / cellSize)) - 0.2

      const checkColour1Fill = 'hsla(' + checkColour1Hue + ' ' + checkColour1Sat + ' ' + checkColour1Lum + ' / ' + checkColourAlpFill + ')'
      const checkColour2Fill = 'hsla(' + checkColour2Hue + ' ' + checkColour2Sat + ' ' + checkColour2Lum + ' / ' + checkColourAlpFill + ')'
      const checkColour1Stroke = 'hsla(' + checkColour1Hue + ' ' + checkColour1Sat + ' ' + checkColour1Lum + ' / ' + checkColourAlpStroke + ')'
      const checkColour2Stroke = 'hsla(' + checkColour2Hue + ' ' + checkColour2Sat + ' ' + checkColour2Lum + ' / ' + checkColourAlpStroke + ')'

      const isColour1 = (row + col) % 2 === 0;
      ctx.fillStyle = isColour1 ?
        checkColour1Fill
      : checkColour2Fill

      ctx.strokeStyle = isColour1 ?
        checkColour1Stroke
      : checkColour2Stroke

      ctx.fillRect(
        ((-tick / 2) % (cellSize * 2)) + (col * cellSize),
        ((tick / 4) % (cellSize * 2)) + (row * cellSize),
        cellSize,
        cellSize);

      ctx.strokeRect(
        ((-tick / 2) % (cellSize * 2)) + (col * cellSize),
        ((tick / 4) % (cellSize * 2)) + (row * cellSize),
        cellSize,
        cellSize);
    }
  }

  const crossPatternWave = [
    [true, false, false, true, false, true, true, false],
    [false, true, false, false, true, false, true, true],
    [true, false, true, false, false, true, false, true],
    [true, true, false, true, false, false, true, false],
    [false, true, true, false, true, false, false, true],
    [true, false, true, true, false, true, false, false],
    [false, true, false, true, true, false, true, false],
    [false, false, true, false, true, true, false, true]
  ]
  const crossSize = 1

  const crossColour1Hue = crossColour1SandHue + Math.sin(tick/500) * (crossColour1WaterHue - crossColour1SandHue)
  const crossColour1Sat = crossColour1SandSat + Math.sin(tick/500) * (crossColour1WaterSat - crossColour1SandSat)
  const crossColour1Lum = crossColour1SandLum + Math.sin(tick/500) * (crossColour1WaterLum - crossColour1SandLum)
  const crossColour2Hue = crossColour2SandHue + Math.sin(tick/500) * (crossColour2WaterHue - crossColour2SandHue)
  const crossColour2Sat = crossColour2SandSat + Math.sin(tick/500) * (crossColour2WaterSat - crossColour2SandSat)
  const crossColour2Lum = crossColour2SandLum + Math.sin(tick/500) * (crossColour2WaterLum - crossColour2SandLum)

  // for (let row = -8; row < canvasHeight / cellSize; row++) {
  //   for (let col = 0; col - 8 < canvasWidth / cellSize; col++) {
  for (let row = -8; row - 20 < canvasHeight / cellSize; row++) {
    for (let col = 0; col - 28 < canvasWidth / cellSize; col++) {
      const crossColorAlp = (row * 3 / (canvasHeight * 3 / cellSize) ) + 0.2

      const crossColour1 = 'hsla(' + crossColour1Hue + ' ' + crossColour1Sat + ' ' + crossColour1Lum + ' / ' + crossColorAlp + ')'
      const crossColour2 = 'hsla(' + crossColour2Hue + ' ' + crossColour2Sat + ' ' + crossColour2Lum + ' / ' + crossColorAlp + ')'

      var a = (row + 8) % 8
      var b = (col + 8) % 8

      ctx.fillStyle = crossPatternWave[a][b] ?
        crossColour1
      : crossColour2

      ctx.fillRect(
        ((-tick / 2) % (cellSize * 8)) + (col * cellSize - cellSize/8) - crossSize * 2,
        ((tick / 4) % (cellSize * 8)) + (row * cellSize - cellSize/32) - crossSize,
        (cellSize/4) + crossSize*4,
        (cellSize/16) + crossSize*2)
      ctx.fillRect(
        ((-tick / 2) % (cellSize * 8)) + (col * cellSize - cellSize/32) - crossSize,
        ((tick / 4) % (cellSize * 8)) + (row * cellSize - cellSize/8) - crossSize*2,
        (cellSize/16) + crossSize *2,
        (cellSize/4) + crossSize * 4)
    }
  }

  ctx.restore()
  tick++
}

gameLoop()
