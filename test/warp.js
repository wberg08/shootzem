function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

// Helper function to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const crossPatternWave = [
  [true, false, false, true, false, true, true, false, true, false, false, true, false, true, true],
  [false, true, false, false, true, false, true, true, false, true, false, false, true, false, true],
  [true, false, true, false, false, true, false, true, true, false, true, false, false, true, false],
  [true, true, false, true, false, false, true, false, true, true, false, true, false, false, true],
  [false, true, true, false, true, false, false, true, false, true, true, false, true, false, false],
  [true, false, true, true, false, true, false, false, true, false, true, true, false, true, false],
  [false, true, false, true, true, false, true, false, false, true, false, true, true, false, true],
  [false, false, true, false, true, true, false, true, false, false, true, false, true, true, false],
  [true, false, false, true, false, true, true, false, true, false, false, true, false, true, true],
  [false, true, false, false, true, false, true, true, false, true, false, false, true, false, true],
  [true, false, true, false, false, true, false, true, true, false, true, false, false, true, false],
  [true, true, false, true, false, false, true, false, true, true, false, true, false, false, true],
  [false, true, true, false, true, false, false, true, false, true, true, false, true, false, false],
  [true, false, true, true, false, true, false, false, true, false, true, true, false, true, false],
  [false, true, false, true, true, false, true, false, false, true, false, true, true, false, true],
];
const crossPatternRadial = [
  [false, true, false, true, true, false, true, false, true, false, true, true, false, true, false],
  [true, false, true, true, false, true, false, false, false, true, false, true, true, false, true],
  [false, true, true, false, true, false, false, true, false, false, true, false, true, true, false],
  [true, true, false, true, false, false, true, false, true, false, false, true, false, true, true],
  [true, false, true, false, false, true, false, true, false, true, false, false, true, false, true],
  [false, true, false, false, true, false, true, true, true, false, true, false, false, true, false],
  [true, false, false, true, false, true, true, false, true, true, false, true, false, false, true],
  [false, false, true, false, true, true, false, true, false, true, true, false, true, false, false],
  [true, false, false, true, false, true, true, false, true, true, false, true, false, false, true],
  [false, true, false, false, true, false, true, true, true, false, true, false, false, true, false],
  [true, false, true, false, false, true, false, true, false, true, false, false, true, false, true],
  [true, true, false, true, false, false, true, false, true, false, false, true, false, true, true],
  [false, true, true, false, true, false, false, true, false, false, true, false, true, true, false],
  [true, false, true, true, false, true, false, false, false, true, false, true, true, false, true],
  [false, true, false, true, true, false, true, false, true, false, true, true, false, true, false]
]
var crossPattern = crossPatternWave

const hSlider1 = document.createElement('input');
const sSlider1 = document.createElement('input');
const lSlider1 = document.createElement('input');
const hSlider2 = document.createElement('input');
const sSlider2 = document.createElement('input');
const lSlider2 = document.createElement('input');
const hSlider3 = document.createElement('input');
const sSlider3 = document.createElement('input');
const lSlider3 = document.createElement('input');
const hSlider4 = document.createElement('input');
const sSlider4 = document.createElement('input');
const lSlider4 = document.createElement('input');
const crossesAreVisible = document.createElement('input')
const crossesAreVisibleLabel = document.createElement('div')
const crossBlur = document.createElement('input')
const crossBlurLabel = document.createElement('div')
const crossSize = document.createElement('input')
const crossSizeLabel = document.createElement('div')
const colourWaterButton = document.createElement('button');
const colourSandButton = document.createElement('button');
const crossPatternWaveButton = document.createElement('button');
const crossPatternRadialButton = document.createElement('button');
const move = document.createElement('input');
const moveLabel = document.createElement('div')

hSlider1.addEventListener('input', () => {
  setCookie('hSlider1', hSlider1.value, 7)
})
sSlider1.addEventListener('input', () => {
  setCookie('sSlider1', sSlider1.value, 7)
})
lSlider1.addEventListener('input', () => {
  setCookie('lSlider1', lSlider1.value, 7)
})
hSlider2.addEventListener('input', () => {
  setCookie('hSlider2', hSlider2.value, 7)
})
sSlider2.addEventListener('input', () => {
  setCookie('sSlider2', sSlider2.value, 7)
})
lSlider2.addEventListener('input', () => {
  setCookie('lSlider2', lSlider2.value, 7)
})
hSlider3.addEventListener('input', () => {
  setCookie('hSlider3', hSlider3.value, 7)
})
sSlider3.addEventListener('input', () => {
  setCookie('sSlider3', sSlider3.value, 7)
})
lSlider3.addEventListener('input', () => {
  setCookie('lSlider3', lSlider3.value, 7)
})
hSlider4.addEventListener('input', () => {
  setCookie('hSlider4', hSlider4.value, 7)
})
sSlider4.addEventListener('input', () => {
  setCookie('sSlider4', sSlider4.value, 7)
})
lSlider4.addEventListener('input', () => {
  setCookie('lSlider4', lSlider4.value, 7)
})

hSlider1.classList.add('slider');
hSlider1.type = 'range';
hSlider1.min = 0;
hSlider1.max = 360;
// hSlider1.value = 1; // Default value
// hSlider1.step = 1

// Set the (x, y) position
hSlider1.style.left = `10px`;
hSlider1.style.top = `565px`;
hSlider1.style.width = `200px`

sSlider1.classList.add('slider');
sSlider1.type = 'range';
sSlider1.min = 0;
sSlider1.max = 100;
// sSlider1.value = 50; // Default value
// sSlider1.step = 0.01

// Set the (x, y) position
sSlider1.style.left = `10px`;
sSlider1.style.top = `615px`;
sSlider1.style.width = `200px`

lSlider1.classList.add('slider');
lSlider1.type = 'range';
lSlider1.min = 0;
lSlider1.max = 100;
// lSlider1.value = 5; // Default value
// lSlider1.step = 1

// Set the (x, y) position
lSlider1.style.left = `10px`;
lSlider1.style.top = `665px`;
lSlider1.style.width = `200px`

hSlider2.classList.add('slider');
hSlider2.type = 'range';
hSlider2.min = 0;
hSlider2.max = 360;
// hSlider2.value = 1; // Default value
// hSlider2.step = 1

// Set the (x, y) position
hSlider2.style.left = `250px`;
hSlider2.style.top = `565px`;
hSlider2.style.width = `200px`

sSlider2.classList.add('slider');
sSlider2.type = 'range';
sSlider2.min = 0;
sSlider2.max = 100;
// sSlider2.value = 50; // Default value
// sSlider2.step = 0.01

// Set the (x, y) position
sSlider2.style.left = `250px`;
sSlider2.style.top = `615px`;
sSlider2.style.width = `200px`

lSlider2.classList.add('slider');
lSlider2.type = 'range';
lSlider2.min = 0;
lSlider2.max = 100;
// lSlider2.value = 5; // Default value
// lSlider2.step = 1

// Set the (x, y) position
lSlider2.style.left = `250px`;
lSlider2.style.top = `665px`;
lSlider2.style.width = `200px`

hSlider3.classList.add('slider');
hSlider3.type = 'range';
hSlider3.min = 0;
hSlider3.max = 360;
// hSlider3.value = 1; // Default value
// hSlider3.step = 1

// Set the (x, y) position
hSlider3.style.left = `500px`;
hSlider3.style.top = `565px`;
hSlider3.style.width = `200px`

sSlider3.classList.add('slider');
sSlider3.type = 'range';
sSlider3.min = 0;
sSlider3.max = 100;
// sSlider3.value = 50; // Default value
// sSlider3.step = 0.01

// Set the (x, y) position
sSlider3.style.left = `500px`;
sSlider3.style.top = `615px`;
sSlider3.style.width = `200px`

lSlider3.classList.add('slider');
lSlider3.type = 'range';
lSlider3.min = 0;
lSlider3.max = 100;
// lSlider3.value = 5; // Default value
// lSlider3.step = 1

// Set the (x, y) position
lSlider3.style.left = `500px`;
lSlider3.style.top = `665px`;
lSlider3.style.width = `200px`

hSlider4.classList.add('slider');
hSlider4.type = 'range';
hSlider4.min = 0;
hSlider4.max = 360;
// hSlider4.value = 1; // Default value
// hSlider4.step = 1

// Set the (x, y) position
hSlider4.style.left = `750px`;
hSlider4.style.top = `565px`;
hSlider4.style.width = `200px`

sSlider4.classList.add('slider');
sSlider4.type = 'range';
sSlider4.min = 0;
sSlider4.max = 100;
// sSlider4.value = 50; // Default value
// sSlider4.step = 0.01

// Set the (x, y) position
sSlider4.style.left = `750px`;
sSlider4.style.top = `615px`;
sSlider4.style.width = `200px`

lSlider4.classList.add('slider');
lSlider4.type = 'range';
lSlider4.min = 0;
lSlider4.max = 100;
// lSlider4.value = 5; // Default value
// lSlider4.step = 1

// Set the (x, y) position
lSlider4.style.left = `750px`;
lSlider4.style.top = `665px`;
lSlider4.style.width = `200px`

crossesAreVisible.style.left = '500px'
crossesAreVisible.style.top = '525px'
crossesAreVisible.type = 'checkbox'
crossesAreVisible.classList.add('slider')
crossesAreVisibleLabel.style.color = 'white'
crossesAreVisibleLabel.style.left = '525px'
crossesAreVisibleLabel.style.top = '525px'
crossesAreVisibleLabel.innerText = 'crosses visible'
crossesAreVisibleLabel.classList.add('slider')

crossBlur.style.left = '500px'
crossBlur.style.top = '475px'
crossBlur.type = 'checkbox'
crossBlur.classList.add('slider')
crossBlurLabel.style.left = '525px'
crossBlurLabel.style.top = '475px'
crossBlurLabel.style.color = 'white'
crossBlurLabel.innerText = 'crosses blur'
crossBlurLabel.classList.add('slider')

crossSize.style.left = '500px'
crossSize.style.top = '425px'
crossSize.classList.add('slider');
crossSize.type = 'range';
crossSize.min = 0;
crossSize.max = 2;
crossSize.step = 0.1;
crossSize.classList.add('slider')
crossSizeLabel.style.left = '525px'
crossSizeLabel.style.top = '425px'
crossSizeLabel.type = 'cross size'
crossSizeLabel.classList.add('slider')

colourWaterButton.style.left = `750px`;
colourWaterButton.style.top = `300px`;
colourWaterButton.style.width = `200px`
colourWaterButton.textContent = 'Colour preset: water'
colourWaterButton.classList.add('slider')

colourSandButton.style.left = `750px`;
colourSandButton.style.top = `350px`;
colourSandButton.style.width = `200px`
colourSandButton.textContent = 'Colour preset: sand'
colourSandButton.classList.add('slider')

crossPatternWaveButton.style.left = `750px`;
crossPatternWaveButton.style.top = `100px`;
crossPatternWaveButton.style.width = `200px`
crossPatternWaveButton.textContent = 'Cross pattern: wave'
crossPatternWaveButton.classList.add('slider')

crossPatternRadialButton.style.left = `750px`;
crossPatternRadialButton.style.top = `150px`;
crossPatternRadialButton.style.width = `200px`
crossPatternRadialButton.textContent = 'Cross pattern: radial'
crossPatternRadialButton.classList.add('slider')

move.style.left = `750px`;
move.style.top = `450px`;
move.classList.add('slider')
move.type = 'checkbox'
moveLabel.style.left = '775px'
moveLabel.style.top = '450px'
moveLabel.innerText = 'move up and down'
moveLabel.style.color = 'white'
moveLabel.classList.add('slider')

colourWaterButton.addEventListener('click', () => {
  hSlider1.value = 215
  hSlider2.value = 241
  hSlider3.value = 186
  hSlider4.value = 234
  lSlider1.value = 74
  lSlider2.value = 50
  lSlider3.value = 79
  lSlider4.value = 34
  sSlider1.value = 100
  sSlider2.value = 50
  sSlider3.value = 92
  sSlider4.value = 100
});

colourSandButton.addEventListener('click', () => {
  hSlider1.value = 36
  hSlider2.value = 33
  hSlider3.value = 40
  hSlider4.value = 31
  lSlider1.value = 74
  lSlider2.value = 53
  lSlider3.value = 85
  lSlider4.value = 34
  sSlider1.value = 82
  sSlider2.value = 94
  sSlider3.value = 100
  sSlider4.value = 100
});

crossPatternWaveButton.addEventListener('click', () => {
  crossPattern = crossPatternWave
});

crossPatternRadialButton.addEventListener('click', () => {
  crossPattern = crossPatternRadial
});

// On page load: read the slider value from the cookie and update the slider
const hSlider1Value = getCookie('hSlider1')
const sSlider1Value = getCookie('sSlider1')
const lSlider1Value = getCookie('lSlider1')
const hSlider2Value = getCookie('hSlider2')
const sSlider2Value = getCookie('sSlider2')
const lSlider2Value = getCookie('lSlider2')
const hSlider3Value = getCookie('hSlider3')
const sSlider3Value = getCookie('sSlider3')
const lSlider3Value = getCookie('lSlider3')
const hSlider4Value = getCookie('hSlider4')
const sSlider4Value = getCookie('sSlider4')
const lSlider4Value = getCookie('lSlider4')
if (hSlider1Value) {
  hSlider1.value = hSlider1Value
}
if (sSlider1Value) {
  sSlider1.value = sSlider1Value
}
if (lSlider1Value) {
  lSlider1.value = lSlider1Value
}
if (hSlider2Value) {
  hSlider2.value = hSlider2Value
}
if (sSlider2Value) {
  sSlider2.value = sSlider2Value
}
if (lSlider2Value) {
  lSlider2.value = lSlider2Value
}
if (hSlider3Value) {
  hSlider3.value = hSlider3Value
}
if (sSlider3Value) {
  sSlider3.value = sSlider3Value
}
if (lSlider3Value) {
  lSlider3.value = lSlider3Value
}
if (hSlider4Value) {
  hSlider4.value = hSlider4Value
}
if (sSlider4Value) {
  sSlider4.value = sSlider4Value
}
if (lSlider4Value) {
  lSlider4.value = lSlider4Value
}

// document.body.appendChild(div1)
// document.body.appendChild(div2)
document.body.appendChild(hSlider1)
document.body.appendChild(sSlider1)
document.body.appendChild(lSlider1)
document.body.appendChild(hSlider2)
document.body.appendChild(sSlider2)
document.body.appendChild(lSlider2)
document.body.appendChild(hSlider3)
document.body.appendChild(sSlider3)
document.body.appendChild(lSlider3)
document.body.appendChild(hSlider4)
document.body.appendChild(sSlider4)
document.body.appendChild(lSlider4)
document.body.appendChild(crossesAreVisible)
document.body.appendChild(crossesAreVisibleLabel)
document.body.appendChild(crossSize)
document.body.appendChild(crossSizeLabel)
document.body.appendChild(crossBlur)
document.body.appendChild(crossBlurLabel)
document.body.appendChild(colourWaterButton)
document.body.appendChild(colourSandButton)
document.body.appendChild(crossPatternWaveButton)
document.body.appendChild(crossPatternRadialButton)
document.body.appendChild(move)
document.body.appendChild(moveLabel)

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

// const canvasWidth = 1920
// const canvasHeight = 1080
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth
canvas.height = canvasHeight

// Checkerboard settings
const size = 600
const gridSize = 16; // 10x10 grid
const cellSize = size / gridSize; // Size of each square

const crossClickTolerance = 10
canvas.addEventListener("mousedown", function (e) {
  if (e.clientX < size - cellSize / 2
    && e.clientY < size - cellSize / 2
    && (e.clientX % cellSize < crossClickTolerance || cellSize - (e.clientX % cellSize) < crossClickTolerance)
    && (e.clientY % cellSize < crossClickTolerance || cellSize - (e.clientY % cellSize) < crossClickTolerance)) {
    var xIntersection = Math.round(e.clientX / cellSize) - 1, yIntersection = Math.round(e.clientY / cellSize) - 1
    crossPattern[yIntersection][xIntersection] = !crossPattern[yIntersection][xIntersection]
    console.log(crossPattern)
  }
})

var tick = 0

function gameLoop() {
  requestAnimationFrame(gameLoop)

  ctx.save()
  ctx.fillStyle = 'black'
  ctx.fillRect(-canvasWidth, -canvasHeight, 2 * canvasWidth, 2* canvasHeight)
  if (move.checked) {
    ctx.translate(0, Math.pow(Math.sin(tick/30) * 2.5,6))
  } else {
    tick = 0
  }

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // Alternate colors based on row + column sum
      const isColour1 = (row + col) % 2 === 0;
      ctx.fillStyle = isColour1 ?
        'hsl(' + hSlider1.value + ' ' + sSlider1.value + ' ' + lSlider1.value + ')'
      : 'hsl(' + hSlider2.value + ' ' + sSlider2.value + ' ' + lSlider2.value + ')'

      // Draw the square
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  if (crossesAreVisible.checked) {
    if (crossBlur.checked) {
      ctx.filter = 'blur(1px)'
    }
    for (let row = 1; row < gridSize; row++) {
      for (let col = 1; col < gridSize; col++) {
        // Alternate colors based on row + column sum
        // const isColour1 = (row + col) % 2 === 0;
        ctx.fillStyle = crossPattern[row - 1][col - 1] ?
          'hsl(' + hSlider3.value + ' ' + sSlider3.value + ' ' + lSlider3.value + ')'
        : 'hsl(' + hSlider4.value + ' ' + sSlider4.value + ' ' + lSlider4.value + ')'

        ctx.fillRect(
          (col * cellSize - cellSize/8) - crossSize.value * 2,
          (row * cellSize - cellSize/32) - crossSize.value,
          (cellSize/4) + crossSize.value*4,
          (cellSize/16) + crossSize.value*2);
        ctx.fillRect(
          (col * cellSize - cellSize/32) - crossSize.value,
          (row * cellSize - cellSize/8) - crossSize.value*2,
          (cellSize/16) + crossSize.value *2,
          (cellSize/4) + crossSize.value * 4);
      }
    }
  }
  ctx.restore()

  tick++
}

gameLoop()
