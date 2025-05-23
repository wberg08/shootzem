class Level2 {

  tickCount = 0
  won = false
  wonTickCount = 0

  cellSize = 50; // Size of each square

  static gravelWidth = 20
  static gravelHeight = 20
  static gravelCellSize = 10

  static checkColour1WaterHue = 215
  static checkColour1WaterSat = 50
  static checkColour1WaterLum = 37
  static checkColour2WaterHue = 241
  static checkColour2WaterSat = 25
  static checkColour2WaterLum = 25

  static crossColour1WaterHue = 186
  static crossColour1WaterSat = 46
  static crossColour1WaterLum = 39
  static crossColour2WaterHue = 234
  static crossColour2WaterSat = 50
  static crossColour2WaterLum = 17

  static checkColour1SandHue = 36
  static checkColour1SandSat = 41
  static checkColour1SandLum = 37
  static checkColour2SandHue = 33
  static checkColour2SandSat = 47
  static checkColour2SandLum = 26

  static crossColour1SandHue = 40
  static crossColour1SandSat = 50
  static crossColour1SandLum = 42
  static crossColour2SandHue = 31
  static crossColour2SandSat = 50
  static crossColour2SandLum = 17

  static cellGrid1XOffset = -300
  static cellGrid1YOffset = 400
  static cellGrid1Rows = 16
  static cellGrid1Cols = 17
  static cellGrid1Transform1 = -0.1
  static cellGrid1Transform2 = 0.4
  static cellGrid1Transform3 = 0.7
  static cellGrid1Transform4 = 0
  static cellGrid1XAnimateDirection = 1
  static cellGrid1YAnimateDirection = 1

  static cellGrid2XOffset = 1000
  static cellGrid2YOffset = 200
  static cellGrid2Rows = 16
  static cellGrid2Cols = 17
  static cellGrid2Transform1 = 0.1
  static cellGrid2Transform2 = 0.4
  static cellGrid2Transform3 = 0.7
  static cellGrid2Transform4 = 0
  static cellGrid2XAnimateDirection = -1
  static cellGrid2YAnimateDirection = 1

  static loseLineX = 150

  static purpleTankBodyColour = '#791394'
  static purpleTankTrackColour = '#b063db'

  static tealTankBodyColour = '#0ecf8b'
  static tealTankTrackColour = '#6cd494'

  static redTankBodyColour = '#bf1b1b'
  static redTankTrackColour = '#c26161'

  constructor() {
    this.backgroundImage = new Image()
    this.backgroundImage.src = 'water_invert_transparency.png'

    this.roundBackgroundMask = ctx.createRadialGradient(canvasWidth / 3, canvasHeight * 1.5, 585, canvasWidth / 3, canvasHeight * 1.5 , 600)
    this.roundBackgroundMask.addColorStop(0, "rgba(0,0,0, 0)")
    this.roundBackgroundMask.addColorStop(1, "rgba(0,0,0, 1.0)")

    this.gravel = []
    for (var i = 0; i < 3 * Level2.gravelWidth; i++) {
      this.gravel[i] = []
      for (var j = 0; j < Level2.gravelHeight; j++) {
        this.gravel[i].push(Math.random())
      }
    }
  }

  static bigTankPath1 = [
    ['forwards', 1.5, 150],
    ['forwards', 1, 15],
    ['forwards', 0.5, 25],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 125],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 500]
  ]

  static bigTankPath2 = [
    ['wait', 0, 100],
    ['forwards', 0.75, 2000]
  ]

  static bigTankPath3 = [
    ['forwards', 1, 2000]
  ]

  static slowTankPath = [
    ['forwards', 0.5, 5000]
  ]

  static straightPath = [
    ['forwards', 1, 5000]
  ]

  static straightPathFast = [
    ['forwards', 4, 5000]
  ]

  static wave1() {
    if (!easyMode) {
      groundEnemies.set(2, new BigTank(
        2,
        canvasWidth + 100,
        100,
        Level2.bigTankPath3,
        Level2.purpleTankBodyColour,
        Level2.purpleTankTrackColour,
        1,
        undefined,
        groundEnemies
      ))
    }

    flyingEnemies.set(1, new Saucer(
      1,
      canvasWidth + 100,
      500,
      Level2.straightPath,
      2,
      { type: 'projectile', hitPoints: 5 },
      flyingEnemies
    ))
  }

  static wave2() {
    if (!easyMode) {
      flyingEnemies.set(3, new Saucer(
        3,
        canvasWidth + 100,
        400,
        Level2.straightPath,
        2,
        { type: 'projectile', hitPoints: 5 },
        flyingEnemies
      ))
    }

    groundEnemies.set(10, new BigTank(
      10,
      canvasWidth + 100,
      550,
      Level2.bigTankPath2,
      Level2.purpleTankBodyColour,
      Level2.purpleTankTrackColour,
      1,
      undefined,
      groundEnemies
    ))
  }

  drawGrid(cellGridRows,
    cellGridCols,
    cellGridXOffset,
    cellGridYOffset,
    checkColour1Hue,
    checkColour1Sat,
    checkColour1Lum,
    checkColour2Hue,
    checkColour2Sat,
    checkColour2Lum,
    cellGridTransform1,
    cellGridTransform2,
    cellGridTransform3,
    cellGridTransform4,
    xAnimateDirection,
    yAnimateDirection) {
    ctx.save()
    ctx.transform(cellGridTransform1, cellGridTransform2, cellGridTransform3, cellGridTransform4, 0, 0)

    for (let row = -2; row < cellGridRows; row++) {
      for (let col = -2; col < cellGridCols; col++) {
        const checkColourAlpFill = (row * 3 / (canvasHeight * 3 / this.cellSize)) + 0.2
        const checkColourAlpStroke = (row * 3 / (canvasHeight * 3 / this.cellSize)) - 0.2

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
          cellGridXOffset + ((xAnimateDirection * this.tickCount / 2) % (this.cellSize * 2)) + (col * this.cellSize),
          cellGridYOffset + ((yAnimateDirection * this.tickCount / 4) % (this.cellSize * 2)) + (row * this.cellSize),
          this.cellSize,
          this.cellSize);

        ctx.strokeRect(
          cellGridXOffset + ((xAnimateDirection * this.tickCount / 2) % (this.cellSize * 2)) + (col * this.cellSize),
          cellGridYOffset + ((yAnimateDirection * this.tickCount / 4) % (this.cellSize * 2)) + (row * this.cellSize),
          this.cellSize,
          this.cellSize);
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

    const crossColour1Hue = Level2.crossColour1SandHue + Math.sin(this.tickCount/500) * (Level2.crossColour1WaterHue - Level2.crossColour1SandHue)
    const crossColour1Sat = Level2.crossColour1SandSat + Math.sin(this.tickCount/500) * (Level2.crossColour1WaterSat - Level2.crossColour1SandSat)
    const crossColour1Lum = Level2.crossColour1SandLum + Math.sin(this.tickCount/500) * (Level2.crossColour1WaterLum - Level2.crossColour1SandLum)
    const crossColour2Hue = Level2.crossColour2SandHue + Math.sin(this.tickCount/500) * (Level2.crossColour2WaterHue - Level2.crossColour2SandHue)
    const crossColour2Sat = Level2.crossColour2SandSat + Math.sin(this.tickCount/500) * (Level2.crossColour2WaterSat - Level2.crossColour2SandSat)
    const crossColour2Lum = Level2.crossColour2SandLum + Math.sin(this.tickCount/500) * (Level2.crossColour2WaterLum - Level2.crossColour2SandLum)

    for (let row = -8; row < cellGridRows; row++) {
      for (let col = 0; col < cellGridCols; col++) {
        const crossColorAlp = (row * 3 / (canvasHeight * 3 / this.cellSize) ) + 0.2

        const crossColour1 = 'hsla(' + crossColour1Hue + ' ' + crossColour1Sat + ' ' + crossColour1Lum + ' / ' + crossColorAlp + ')'
        const crossColour2 = 'hsla(' + crossColour2Hue + ' ' + crossColour2Sat + ' ' + crossColour2Lum + ' / ' + crossColorAlp + ')'

        var a = (row + 8) % 8
        var b = (col + 8) % 8

        ctx.fillStyle = crossPatternWave[a][b] ?
          crossColour1
        : crossColour2

        ctx.fillRect(
          cellGridXOffset + ((xAnimateDirection * this.tickCount / 2) % (this.cellSize * 8)) + (col * this.cellSize - this.cellSize/8) - crossSize * 2,
          cellGridYOffset + ((yAnimateDirection * this.tickCount / 4) % (this.cellSize * 8)) + (row * this.cellSize - this.cellSize/32) - crossSize,
          (this.cellSize/4) + crossSize*4,
          (this.cellSize/16) + crossSize*2)
        ctx.fillRect(
          cellGridXOffset + ((xAnimateDirection * this.tickCount / 2) % (this.cellSize * 8)) + (col * this.cellSize - this.cellSize/32) - crossSize,
          cellGridYOffset + ((yAnimateDirection * this.tickCount / 4) % (this.cellSize * 8)) + (row * this.cellSize - this.cellSize/8) - crossSize*2,
          (this.cellSize/16) + crossSize *2,
          (this.cellSize/4) + crossSize * 4)
      }
    }

    ctx.restore()
  }

  draw() {
    ctx.save()

    ctx.fillStyle = '#db6377'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.fillStyle = '#42bfdb'
    ctx.fillRect(0, 0, Level1.loseLineX, canvasHeight)

    ctx.globalAlpha = 0.5
    ctx.drawImage(this.backgroundImage, 0, 0);
    ctx.globalAlpha = 1

    ctx.restore()

    background.forEach((backgroundElement) => {
      backgroundElement.update()
    })

    const checkColour1Hue = Level2.checkColour1SandHue + Math.sin(this.tickCount/500) * (Level2.checkColour1WaterHue - Level2.checkColour1SandHue)
    const checkColour1Sat = Level2.checkColour1SandSat + Math.sin(this.tickCount/500) * (Level2.checkColour1WaterSat - Level2.checkColour1SandSat)
    const checkColour1Lum = Level2.checkColour1SandLum + Math.sin(this.tickCount/500) * (Level2.checkColour1WaterLum - Level2.checkColour1SandLum)
    const checkColour2Hue = Level2.checkColour2SandHue + Math.sin(this.tickCount/500) * (Level2.checkColour2WaterHue - Level2.checkColour2SandHue)
    const checkColour2Sat = Level2.checkColour2SandSat + Math.sin(this.tickCount/500) * (Level2.checkColour2WaterSat - Level2.checkColour2SandSat)
    const checkColour2Lum = Level2.checkColour2SandLum + Math.sin(this.tickCount/500) * (Level2.checkColour2WaterLum - Level2.checkColour2SandLum)

    this.drawGrid(Level2.cellGrid1Rows,
      Level2.cellGrid1Cols,
      Level2.cellGrid1XOffset,
      Level2.cellGrid1YOffset,
      checkColour1Hue,
      checkColour1Sat,
      checkColour1Lum,
      checkColour2Hue,
      checkColour2Sat,
      checkColour2Lum,
      Level2.cellGrid1Transform1,
      Level2.cellGrid1Transform2,
      Level2.cellGrid1Transform3,
      Level2.cellGrid1Transform4,
      Level2.cellGrid1XAnimateDirection,
      Level2.cellGrid1YAnimateDirection)

    this.drawGrid(Level2.cellGrid1Rows,
      Level2.cellGrid2Cols,
      Level2.cellGrid2XOffset,
      Level2.cellGrid2YOffset,
      checkColour1Hue,
      checkColour1Sat,
      checkColour1Lum,
      checkColour2Hue,
      checkColour2Sat,
      checkColour2Lum,
      Level2.cellGrid2Transform1,
      Level2.cellGrid2Transform2,
      Level2.cellGrid2Transform3,
      Level2.cellGrid2Transform4,
      Level2.cellGrid2XAnimateDirection,
      Level2.cellGrid2YAnimateDirection)

    ctx.save()

    ctx.fillStyle = `#000`

    // gravel
    for (var a = 0; a < Level2.gravelWidth; a++) {
      for (var b = 0; b < Level2.gravelHeight; b++) {
        if (a + b > -2 + (Level2.gravelWidth + Level2.gravelHeight) / 2) {
          const intensity = Math.floor((Math.sin(this.tickCount / 100) * 10 + (10 * this.gravel[a][b]) * 10) - 60)
          const hex = intensity.toString(16).padStart(2, '0')
          ctx.fillStyle = `#${hex}${hex}${hex}`
          ctx.fillRect(600 + (a * Level2.gravelCellSize), (b * Level2.gravelCellSize),Level2.gravelCellSize, Level2.gravelCellSize)
        }
      }
    }
    for (var a = 0; a < 3 * Level2.gravelWidth; a++) {
      for (var b = 0; b < Level2.gravelHeight; b++) {
        const intensity = Math.floor((Math.sin(this.tickCount / 100) * 10 + (10 * this.gravel[a][b]) * 10) - 60)
        const hex = intensity.toString(16).padStart(2, '0')
        ctx.fillStyle = `#${hex}${hex}${hex}`
        ctx.fillRect(200 + (a * Level2.gravelCellSize), 200 + (b * Level2.gravelCellSize),Level2.gravelCellSize, Level2.gravelCellSize)
      }
    }
    for (var a = 0; a < Level2.gravelWidth; a++) {
      for (var b = 0; b < Level2.gravelHeight; b++) {
        if (a - b > -1) {
          const intensity = Math.floor((Math.sin(this.tickCount / 100) * 10 + (10 * this.gravel[a][b]) * 10) - 60)
          const hex = intensity.toString(16).padStart(2, '0')
          ctx.fillStyle = `#${hex}${hex}${hex}`
          ctx.fillRect(600 + (a * Level2.gravelCellSize), 400 + (b * Level2.gravelCellSize),Level2.gravelCellSize, Level2.gravelCellSize)
        }
      }
    }

    // polygon
    const points0 = [
      [200, 200],
      [600, 200],
      [canvasWidth, 0]
    ];

    const points1 = [
      [canvasWidth, canvasHeight],
      [600, 400],
      [200, 400]
    ];

    ctx.strokeStyle = '#119'
    ctx.beginPath()
    ctx.moveTo(points0[0][0], points0[0][1])
    for (let i = 1; i < points0.length; i++) {
      ctx.lineTo(points0[i][0], points0[i][1])
    }
    ctx.lineWidth = 13
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(points1[0][0], points1[0][1])
    for (let i = 1; i < points1.length; i++) {
      ctx.lineTo(points1[i][0], points1[i][1])
    }
    ctx.stroke()

    // ctx.fillStyle = '#db6377'
    // ctx.fillRect(200,200,400,200);

    ctx.restore()

    crumps.forEach((crump) => {
      crump.update()
    })
    groundEnemies.forEach((groundEnemy) => {
      groundEnemy.update()
    })
    projectiles.forEach((projectile) => {
      projectile.update()
    })
    flyingEnemies.forEach((flyingEnemy) => {
      flyingEnemy.update()
    })
    projectiles.forEach((projectile) => {
      if (projectile.xProgress < 0.6) {
        projectile.draw()
      }
    })
    powerUps.forEach((powerUp) => {
      powerUp.update()
    })
    player.update()
    muzzleFlashes.forEach((muzzleFlash) => {
      muzzleFlash.update()
    })
    foreground.forEach((foregroundElement) => {
      foregroundElement.update()
    })

    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = '#DDDDDD'
    ctx.rect(10, 10, canvasWidth - 20, canvasHeight - 20)
    ctx.stroke()
    ctx.fillRect(0, 0, canvasWidth, 10)
    ctx.fillRect(0, 0, 10, canvasHeight)
    ctx.fillRect(canvasWidth - 10, 0, 10, canvasHeight)
    ctx.fillRect(0, canvasHeight - 10, canvasWidth, 10)
    ctx.restore()

    if (lost) {
      var wipeAlpha = Math.min(0.5,(lostTickCount / 100))

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = "rgba(0,0,0, " + wipeAlpha + ")"
      ctx.fill()
      ctx.restore()

      this.drawButton((canvasWidth / 2) - 100, (canvasHeight / 2) - 50, 200, 100, "FAILED")
    }

    if (won) {
      var wipeAlpha = Math.min(0.5,(lostTickCount / 100))

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = "rgba(0,0,0, " + wipeAlpha + ")"
      ctx.fill()
      ctx.restore()

      this.drawButton((canvasWidth / 2) - 100, (canvasHeight / 2) - 50, 200, 100, "YOU WON")
    }
  }

  tick() {
    groundEnemies.forEach((groundEnemy) => {
      if (groundEnemy.x <= Level2.loseLineX) {
        lost = true
      }
    })
    flyingEnemies.forEach((flyingEnemy) => {
      if (flyingEnemy.x <= Level2.loseLineX) {
        lost = true
      }
    })

    if (this.tickCount == 0) {
      Level2.wave1()
    }
    if (this.tickCount == 300) {
      Level2.wave2()
    }
    // if (this.tickCount == 400) {
    //   Level2.wave1()
    // }
    // if (this.tickCount == 700) {
    //   Level2.wave1()
    // }
    // if (this.tickCount == 1000) {
    //   Level2.wave1()
    // }
    // if (this.tickCount == 1300) {
    //   Level2.wave1()
    // }

    if (this.tickCount > 300 && !groundEnemies.length && !flyingEnemies.length) {
      won = true
    }

    this.tickCount++
    if (lost) {
      lostTickCount++
    }
    if (won) {
      wonTickCount++
    }
  }

  mousedownListener(e) {
    for (let [id, powerUp] of powerUps) {
      if (Math.abs(e.clientX - powerUp.x) < 20
        && Math.abs(e.clientY - powerUp.y) < 20) {
        powerUp.hit()
        return
      }
    }

    if (e.clientX >= player.x
      && e.clientY <= player.y
      && e.clientX < canvasWidth
      && e.clientY < canvasHeight
      && projectiles.size < projectileCountLimit
      && !lost) {

      // calculate where the end of the barrel is using this code lifted from Player.js - yuck!
      var theta = Math.atan((yMouse - playerY) / (xMouse - playerX))
      if (xMouse - playerX < 0) {
        theta += Math.PI;
      }

      const d = 1 + (0.15 * Math.sqrt((xMouse - playerX) + (playerY - yMouse))) // foreshortening factor
      var a = 10 * d // fore barrel

      var ax = a * Math.cos(theta),
          ay = a * Math.sin(theta)

      projectiles.set(projectileId, new Projectile(
        projectileId,
        e.clientX,
        e.clientY,
        playerX + ax,
        playerY + ay
      ))
      projectileId++;

      muzzleFlashes.set(muzzleFlashId, new MuzzleFlash(
        muzzleFlashId,
        playerX + ax,
        playerY + ay
      ))
      muzzleFlashId++;
    }

    if (lost && (lostTickCount >= 200)) {
      currentScene.end()
      currentScene = new Start()
      currentScene.start()
    }

    if (won && (wonTickCount >= 200)) {
      currentScene.end()
      currentScene = new Level3()
      currentScene.start()
    }
  }

  mousemoveListener(e) {
    xMouse = e.clientX
    yMouse = e.clientY
  }

  start() {
    window.addEventListener('mousedown', this.mousedownListener)
    window.addEventListener('mousemove', this.mousemoveListener)

    slideZones.set(slideZoneId, new SlideZone1())
    slideZoneId++
    slideZones.set(slideZoneId, new SlideZone2())

    for (var i = 430; i <= 680; i += 125) {
      for (var j = 90; j <= 500; j += 125) {
        background.set(backgroundId, new Building2(backgroundId, i, j))
        backgroundId++
      }
    }

    background.set(backgroundId, new Building3(backgroundId, 250, 50))
    backgroundId++
  }

  end() {
    lostTickCount = 0

    groundEnemies = new Map()
    flyingEnemies = new Map()

    window.removeEventListener('mousedown', this.mousedownListener)
    window.removeEventListener('mousemove', this.mousemoveListener)
  }

  drawButton(x, y, width, height, text) {
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

}
