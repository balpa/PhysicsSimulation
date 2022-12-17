export class Food {
  constructor(x, y, radius, startAngle, endAngle, color, ctx) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.ctx = ctx
    this.color = color
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    ctx.fillStyle = `${this.color}`
    ctx.fill()
  }
}