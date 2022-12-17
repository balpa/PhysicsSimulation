export class Wall {
  constructor(x, y, toX, toY, color, ctx) {
    this.x = x
    this.y = y
    this.toX = toX
    this.toY = toY
    this.color = color
    this.ctx = ctx
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.toX, this.toY)
    ctx.strokeStyle = `${this.color}`
    ctx.stroke()
  }
}