export class Wall {
  constructor(x, y, toX, toY, color, ctx) {
    this.x = x
    this.y = y
    this.toX = toX
    this.toY = toY
    this.color = color
    this.ctx = ctx
  }

  getCoordinates() {
    let coordinates = {
      x: this.x,
      y: this.y,
      w: 10, // add to constructor
      h: this.toY - this.y
    }
    return coordinates
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.toX, this.toY)
    ctx.strokeStyle = `${this.color}`
    ctx.lineWidth = 10
    ctx.stroke()
  }
}