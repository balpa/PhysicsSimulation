

export class Box {
  constructor(x, y, w, h, ctx, mass, color) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.ctx = ctx
    this.mass = mass
    this.color = color
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  gravity(val) {
    this.y += val
  }

  getCoordinates() {
    let coordinates = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    }
    return coordinates
  }

  getVelocity() {
    let velocityData = {
      velocityX: `${this.velocity.x.toFixed(2)}`,
      velocityY: `${this.velocity.y.toFixed(2)}`,
      positionX: `${this.x.toFixed(2)}`,
      positionY: `${this.y.toFixed(2)}`,
    }
    return velocityData
  }

  draw(ctx) {
    this.ctx.fillStyle = `${this.color}`
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  updatePosition(x, y) {
    this.velocity.x += x
    this.velocity.y += y
  }

  continiousMove() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  friction(amount) {
    this.velocity.x >= 0.01 ? this.velocity.x -= amount : this.velocity.x += amount
    this.velocity.y >= 0.01 ? this.velocity.y -= amount : this.velocity.y += amount
  }

  stayInCanvas() {
    if (this.x < 0) {
      this.x = 0
      this.velocity.x = -(this.velocity.x) * 0.2
    }
    if (this.x + this.w > canvas.width) {
      this.x = canvas.width - this.w
      this.velocity.x = -(this.velocity.x) * 0.2
    }
    if (this.y + this.h > canvas.height) {
      this.y = canvas.height - this.h
      this.velocity.y = -(this.velocity.y) * 0.2
    }
    if (this.y < 0) {
      this.y = 0
      this.velocity.y = -(this.velocity.y) * 0.2
    }
  }
}
