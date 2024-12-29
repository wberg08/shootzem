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

function gameLoop() {
  requestAnimationFrame(gameLoop)

  var colorA = 100 + (Math.sin(this.tickCount / 100) * 50)

  ctx.save()
  ctx.fillStyle = "rgb(" + colorA + "," + colorA + "," + colorA + ")"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()

  ctx.save()

  ctx.fillStyle = "#000"

  for (let i = 0; i < 1000; i++) {
    // Calculate radius for each circle's center
    const r = musicVolumeSlider.value * i + slider5.value * Math.sin(tick / 10);
    // Calculate angle for the current circle
    const angle = soundVolumeSlider.value * i + tick / 1000;

    // Convert polar coordinates to Cartesian
    const x = (canvasWidth / 2) + r * Math.cos(angle);
    const y = (canvasHeight / 2) + r * Math.sin(angle);

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, slider3.value, 0, 2 * Math.PI); // Circle radius is 5
    ctx.fillStyle = `hsl(${(i / 1000) * 360 - tick}, 100%, 30%, ${(1 - (i / 1000)) * slider4.value})`; // Color gradient
    // ctx.fillStyle = '#000'
    ctx.fill();
  }

  ctx.restore()

  tick++
}

gameLoop()
