class Projectile {
  static airtime = 150
  static shadowOffsetX = 5

  constructor(id, targetX, targetY, currentX, currentY) {
    this.id = id
    this.targetX = targetX
    this.targetY = targetY
    this.startX = currentX
    this.startY = currentY
    this.currentX = currentX
    this.currentY = currentY
    this.fire2Audio = new Audio('./fire2.mp3')
    this.fire2Audio.volume = soundVolume / 2
    this.fire2Audio.play()
  }

  update() {
    const xRange = this.targetX - this.startX
    this.xProgress = (this.currentX - this.startX) / xRange
    const zProgress = this.xProgress * Projectile.airtime

    this.currentX += xRange / Projectile.airtime
    this.currentY += (this.targetY - this.startY) / Projectile.airtime
    this.currentZ = (-2 * (zProgress * zProgress)) + (Projectile.airtime * 2 * zProgress)

    var hit = false

    if (0.6 < this.xProgress && this.xProgress < 0.8) {
      flyingEnemies.forEach((enemy) => {
        if (enemy.constructor.name == 'Saucer') {
          if (Math.abs(this.currentX - enemy.x) < 50
            && Math.abs(this.currentY - enemy.y) < 50) {
            hit = true
            enemy.hit()
            projectiles.delete(this.id)
          }
        }
      })
    }

    if (this.currentX >= this.targetX
      && this.currentY <= this.targetY) {
      this.fire2Audio.pause()

      groundEnemies.forEach((enemy) => {
        if (enemy.constructor.name == 'BigTank') {
          if (Math.abs(this.currentX - enemy.x) < 30
            && Math.abs(this.currentY - enemy.y) < 30) {
            hit = true
            enemy.hit()
          }
        } else if (enemy.constructor.name == 'VeryBigTank') {
          if (Math.abs(this.currentX - enemy.x) < 50
            && Math.abs(this.currentY - enemy.y) < 50) {
            hit = true
            enemy.hit()
          }
        }
      })

      projectiles.delete(this.id)
      if (!hit) {
        combo = 0
      }
      crumps.set(crumpId, new Crump(crumpId, this.targetX, this.targetY))
      crumpId++
    } else {
      this.draw()
    }
  }

  draw() {
    const shadowOffsetY = ((2 * (this.currentZ * this.currentZ)) + (300 * this.currentZ)) / 5000000

    ctx.save()
    ctx.fillStyle = "rgba(0, 0, 0, " + (this.currentZ / 113000) + ")"
    ctx.beginPath()
    ctx.arc(this.currentX + Projectile.shadowOffsetX, this.currentY + shadowOffsetY, (this.currentZ / 500) * 1.5, 0, Math.PI * 2, false)
    ctx.fill()

    ctx.beginPath()
      ctx.arc(this.currentX, this.currentY, (this.currentZ / 500) + 5, 0, Math.PI * 2, false)
    const octet = ("0" + (Math.floor(this.currentZ / 75) + 25).toString(16)).substr(-2,2)
    // 
    const xRange = this.targetX - this.startX
    const xProgress = (this.currentX - this.startX) / xRange
    const color = '#' + octet + octet + octet
    // var color
    // if (0.6 < xProgress && xProgress < 0.8) {
    //   color = '#FFF'
    // } else {
      // color = '#' + octet + octet + octet
    // }
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }
}
