

let canvas = document.getElementById('canvas')
canvas.style.backgroundColor = 'black'
let ctx = canvas.getContext("2d")

class Box {
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

  logVelocity() {
    ctx.font = "20px Arial"
    ctx.fillStyle = 'red'
    ctx.fillText(`
    Velocity X: ${this.velocity.x.toFixed(2)}
    Velocity Y: ${this.velocity.y.toFixed(2)}
    Position X: ${this.x.toFixed(2)}
    Position Y: ${this.y.toFixed(2)}
    `, 0, 25)
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
    if (this.x < 0) { this.x = 0; this.velocity.x = -(this.velocity.x) * 0.2 }
    if (this.x + this.width > canvas.width) { this.x = canvas.width - this.width; this.velocity.x = 0 }
    if (this.y < 0) { this.y = 0; this.velocity.y = -(this.velocity.y) * 0.2 }
  }
}

class Wall {
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

const box = new Box(100, 100, 50, 50, ctx, 10, 'yellow')
const box2 = new Box(200, 100, 100, 100, ctx, 10, 'rgba(50,175,100,0.5)')

const wall = new Wall(500, 100, 500, 500, 'white', ctx)

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      box.updatePosition(0.2, 0)
      break
    case 'a':
      box.updatePosition(-0.2, 0)
      break
    case 'w':
      box.updatePosition(0, -0.2)
      break
    case 's':
      box.updatePosition(0, 0.2)
      break
    case 'j':
      box2.updatePosition(0.2, 0)
      break
    case 'g':
      box2.updatePosition(-0.2, 0)
      break
    case 'y':
      box2.updatePosition(0, -0.2)
      break
    case 'h':
      box2.updatePosition(0, 0.2)
      break
  }
})

function detectCollision() {
  box1Coords = box.getCoordinates()
  box2Coords = box2.getCoordinates()

  if (box1Coords.x < box2Coords.x + box2Coords.w &&
    box1Coords.x + box1Coords.w > box2Coords.x &&
    box1Coords.y < box2Coords.y + box2Coords.h &&
    box1Coords.y + box1Coords.h > box2Coords.y) {
    console.log('COLLISION')
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  box.logVelocity()
  // BOX - 1
  box.draw(ctx)
  box.continiousMove()
  box.friction(0.006)
  box.gravity(0.1)
  box.stayInCanvas()
  // BOX - 2
  box2.draw(ctx)
  box2.continiousMove()
  box2.friction(0.006)
  box2.gravity(0.1)
  box2.stayInCanvas()
  // WALL - 1
  wall.draw(ctx)

  detectCollision()

  requestAnimationFrame(render)
}

requestAnimationFrame(render)








