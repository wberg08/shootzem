class Level1 {

  tickCount = 0

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
    groundEnemies.set(1, new BigTank(
      1,
      canvasWidth + 100,
      175,
      Level1.bigTankPath1,
      Level1.tealTankBodyColour,
      Level1.tealTankTrackColour,
      2,
      { type: 'projectile', hitPoints: 5 },
      groundEnemies
    ))

    if (!easyMode) {
      groundEnemies.set(2, new BigTank(
        2,
        canvasWidth + 100,
        300,
        Level1.bigTankPath2,
        Level1.purpleTankBodyColour,
        Level1.purpleTankTrackColour,
        1,
        undefined,
        groundEnemies
      ))
    }

    flyingEnemies.set(1, new Saucer(
      1,
      canvasWidth + 100,
      300,
      Level1.straightPath,
      2,
      { type: 'projectile', hitPoints: 5 },
      flyingEnemies
    ))
  }

  static wave2() {
    if (!easyMode) {
      groundEnemies.set(4, new BigTank(
        4,
        canvasWidth + 100,
        300,
        Level1.bigTankPath2,
        Level1.purpleTankBodyColour,
        Level1.purpleTankTrackColour,
        1,
        undefined,
        groundEnemies
      ))
    }
  }

  static wave2a() {
    if (!easyMode) {
      groundEnemies.set(7, new BigTank(
        7,
        canvasWidth + 100,
        175,
        Level1.bigTankPath1,
        Level1.redTankBodyColour,
        Level1.redTankTrackColour,
        2,
        undefined,
        groundEnemies
      ))
    }
  }

  static wave3a() {
    groundEnemies.set(3, new BigTank(
      3,
      canvasWidth + 100,
      175,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      groundEnemies
    ))
  }

  static wave3() {
    groundEnemies.set(5, new BigTank(
      5,
      canvasWidth + 100,
      175,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      groundEnemies
    ))
  }

  static wave4() {
    if (!easyMode) {
      groundEnemies.set(6, new VeryBigTank(
        6,
        canvasWidth + 100,
        428,
        Level1.slowTankPath,
        Level1.redTankBodyColour,
        Level1.redTankTrackColour,
        5,
        groundEnemies
      ))
    }
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
      const xRange = projectile.targetX - projectile.startX
      const xProgress = (projectile.currentX - projectile.startX) / xRange
      if (xProgress < 0.6)
      projectile.draw()
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

    // render the score

    // ctx.save()
    // var gradient3
    // if (hq) {
    //   var highlight = Math.sin(this.tickCount / 50) * 10

    //   gradient3 = ctx.createLinearGradient(highlight * 40, 0, highlight * 25 + 505, -50);
    //   // Add three color stops
    //   gradient3.addColorStop(0, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(0.20, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(0.25, "rgba(255, 255, 255, 1)")
    //   gradient3.addColorStop(0.3, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(0.5, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(0.70, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(0.75, "rgba(255, 255, 255, 1)")
    //   gradient3.addColorStop(0.8, "rgba(255, 255, 255, 0)")
    //   gradient3.addColorStop(1, "rgba(255, 255, 255, 0)")
    // }

    // var text = "SCORE: " + score

    // ctx.font = "20px titleText"
    // ctx.textAlign = 'left'
    // ctx.fillStyle = "rgba(255, 255, 255)"
    // ctx.fillText(text, 15, 35)
    // if (hq) {
    //   ctx.lineWidth = 10

    //   // ctx.strokeStyle = "rgba(255, 255, 255)"
    //   ctx.strokeStyle = gradient3
    //   ctx.strokeText(text, 15, 35)
    // }
    // ctx.restore()

    if (lost) {
      var wipeAlpha = Math.min(0.5,(lostTickCount / 100))

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = "rgba(0,0,0, " + wipeAlpha + ")"
      ctx.fill()
      ctx.restore()

      ctx.save()
      this.drawButton((canvasWidth / 2) - 100, (canvasHeight / 2) - 50, 200, 100, "FAILED")
      ctx.restore()
    }

    if (won) {
      var wipeAlpha = Math.min(0.5,(wonTickCount / 100))

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = "rgba(0,0,0, " + wipeAlpha + ")"
      ctx.fill()
      ctx.restore()

      ctx.save()
      this.drawButton((canvasWidth / 2) - 100, (canvasHeight / 2) - 50, 200, 100, "YOU WON")
      ctx.restore()
    }
  }

  tick() {
    if (!won) {
      groundEnemies.forEach((groundEnemy) => {
        if (groundEnemy.x <= Level1.loseLineX) {
          lost = true
        }
      })
      flyingEnemies.forEach((flyingEnemy) => {
        if (flyingEnemy.x <= Level1.loseLineX) {
          lost = true
        }
      })
    }

    if (this.tickCount == 0) {
      Level1.wave1()
    }
    if (this.tickCount == 300) {
      Level1.wave2()
    }
    if (this.tickCount == 400) {
      Level1.wave2a()
    }
    if (this.tickCount == 700) {
      Level1.wave3a()
    }
    if (this.tickCount == 1000) {
      Level1.wave3()
    }
    if (this.tickCount == 1300) {
      Level1.wave4()
    }

    if (this.tickCount > 2000 && !groundEnemies.length) {
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
      && !lost && !won) {

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
      won = false
      wonTickCount = 0
      currentScene = new Level2()
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
