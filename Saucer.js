class Saucer {
  static saucerRadius = 50

  static saucerFillStyle = '#9988AA'
  static saucerOutlineStrokeStyle = '#665599'
  static shadowFillStyle = 'rgba(0,0,0,0.1)'

  static saucerTrackCount = 20
  static saucerTrackLength = 0.8

  static saucerInlineStrokeStyle = '#8877BB'

  static domeRadius = 25
  static domeFillStyleNotHq = '#110000'
  static domeFillStyleHqLowlight = Saucer.domeFillStyleNotHq
  static domeFillStyleHqHighlight = '#BBDDDD'

  static deadFlashTime = 3
  static deadTickLimit = 30

  static hitTickLimit = 5

  constructor(id, x, y, path, hitPoints, powerUp, flyingEnemies) {

    this.id = id
    this.x = x
    this.y = y
    this.path = path
    this.pathI = 0
    this.pathTick = 0
    this.deadTick = 0
    this.hitTick = 0
    this.currentAction = 'wait'
    this.theta = 0
    this.hitPoints = hitPoints
    this.powerUp = powerUp
    this.flyingEnemies = flyingEnemies
  }

  update() {
    if (this.hitPoints <= 0) {
      if (this.deadTick > Saucer.deadTickLimit) {
        flyingEnemies.delete(this.id)
        if (typeof this.powerUp !== "undefined") {
          powerUps.set(powerUpId, new PowerUp(powerUpId, this.x, this.y, this.powerUp.type, this.powerUp.hitPoints))
          powerUpId++
        }
      }

      this.currentAction = 'wait'
      if (this.deadTick % (Saucer.deadFlashTime * 2) > Saucer.deadFlashTime) {
        this.draw()
      }
      this.deadTick++
      return
    }

    if (this.isHit) {
      if (this.hitTick > Saucer.hitTickLimit) {
        this.isHit = false
        this.hitTick = 0
      }
      this.hitTick++
    }

    if (this.pathI >= this.path.length) {
      this.currentAction = 'wait'
      if (this.isHit) {
        this.drawWhite()
      } else {
        this.draw()
      }
      return
    }

    this.currentAction = this.path[this.pathI][0]
    this.speed = this.path[this.pathI][1]
    const cosTheta = Math.cos(this.theta),
          sinTheta = Math.sin(this.theta)
    
    if (this.currentAction == 'forwards') {
      this.x -= this.speed * cosTheta
      this.y -= this.speed * sinTheta
    } else if (this.currentAction == 'left') {
      this.theta -= this.speed
    } else if (this.currentAction == 'right') {
      this.theta += this.speed
    }

    if (this.isHit) {
      this.drawWhite()
    } else {
      this.draw()
    }
    this.pathTick++

    const pathTicks = this.path[this.pathI][2]
    if (this.pathTick > pathTicks) {
      this.pathI++
      this.pathTick = 0
    }
  }

  draw() {
    ctx.save()

    ctx.fillStyle = Saucer.shadowFillStyle

    ctx.beginPath()
    ctx.arc(this.x + 5, this.y + 90, Saucer.saucerRadius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = Saucer.saucerFillStyle
    ctx.strokeStyle = Saucer.saucerOutlineStrokeStyle

    ctx.beginPath()
    ctx.arc(this.x, this.y, Saucer.saucerRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    var centroidX = this.x
    var centroidY = this.y

    ctx.strokeStyle = Saucer.saucerInlineStrokeStyle
    ctx.beginPath()
    const offset = 2 * Math.PI / Saucer.saucerTrackCount

    for (var i = 0; i < Saucer.saucerTrackCount; i++) {
      var startX = centroidX + Math.sin((offset*i) + (-this.pathTick / 100)) * Saucer.saucerTrackLength * Saucer.saucerRadius
      var startY = centroidY + Math.cos((offset*i) + (-this.pathTick / 100)) * Saucer.saucerTrackLength * Saucer.saucerRadius
      var endX = centroidX + Math.sin((offset*i) + (-this.pathTick / 100)) * Saucer.saucerRadius
      var endY = centroidY + Math.cos((offset*i) + (-this.pathTick / 100)) * Saucer.saucerRadius

      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.x, this.y, Saucer.saucerRadius * Saucer.saucerTrackLength, 0, 2 * Math.PI)
    ctx.stroke()

    if (hq) {
      const domeFillStyleHq = ctx.createRadialGradient(this.x - 10, this.y - 15, Saucer.domeRadius - 15, this.x - 10, this.y - 15, Saucer.domeRadius)
      domeFillStyleHq.addColorStop(0.1, Saucer.domeFillStyleHqHighlight)
      domeFillStyleHq.addColorStop(1, Saucer.domeFillStyleHqLowlight)

      ctx.fillStyle = domeFillStyleHq
    } else {
      ctx.fillStyle = Saucer.domeFillStyleNotHq
    }

    ctx.beginPath()
    ctx.arc(this.x, this.y, Saucer.domeRadius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }

  drawWhite() {
    ctx.save()

    ctx.fillStyle = Saucer.shadowFillStyle

    ctx.beginPath()
    ctx.arc(this.x + 5, this.y + 90, Saucer.saucerRadius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'

    ctx.beginPath()
    ctx.arc(this.x, this.y, Saucer.saucerRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  hit() {
    this.hitPoints--
    this.isHit = true
    this.hitTick = 0

    if (this.hitPoints == 0) {
      var boomAudio = new Audio('./boom2.mp3')
      boomAudio.volume = soundVolume
      boomAudio.play()
      var dieAudio = new Audio('./die.mp3')
      dieAudio.volume = soundVolume
      dieAudio.play()
      combo++
      if (combo > 1) {  
        foreground.set(foregroundId, new PowerUpHit(foregroundId, this.x, this.y, 'Combo x' + combo, '255, 255, 255', '24px'))
        foregroundId++
      }
      score += 50 + (combo * 50)
    } else {
      var hitAudio = new Audio('./hit.mp3')
      hitAudio.volume = soundVolume
      hitAudio.play()
    }
  }
}