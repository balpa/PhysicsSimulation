import { Box } from './box.js'
import { Wall } from './wall.js'
import { Food } from './food.js'


let canvas = document.getElementById('canvas')
canvas.style.backgroundColor = 'black'
let ctx = canvas.getContext("2d")

// CREATE OBJECTS
const box = new Box(100, 100, 50, 50, ctx, 10, 'yellow')
const box2 = new Box(200, 100, 100, 100, ctx, 10, 'rgba(50,175,100,0.5)')
const wall = new Wall(500, Math.floor(Math.random() * canvas.height), 500, canvas.height, 'white', ctx)

// CREATE FOOD
let foods = []
function createFood(amount) {
  for (let x = 0; x < amount; x++) {
    let food = new Food(
      Math.floor(Math.random() * (canvas.width - 50)),
      Math.floor(Math.random() * (canvas.height - 50)),
      10,
      0, 2 * Math.PI, 'crimson', ctx)
    foods.push(food)
  }
}
createFood(10)

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
  let box1Coords = box.getCoordinates()
  let box2Coords = box2.getCoordinates()

  let wallCoords = wall.getCoordinates()



  if (box1Coords.x < box2Coords.x + box2Coords.w &&
    box1Coords.x + box1Coords.w > box2Coords.x &&
    box1Coords.y < box2Coords.y + box2Coords.h &&
    box1Coords.y + box1Coords.h > box2Coords.y) {
    console.log('COLLISION')
    box.changeVelocity(0.8)
    box2.changeVelocity(0.8)
  }
}

function logVelocity() {

  let box1Velocity = box.getVelocity()
  let box2Velocity = box2.getVelocity()

  ctx.font = "20px Arial"
  ctx.fillStyle = 'red'
  ctx.fillText(`
    Box 1 Velocity X: ${box1Velocity.velocityX} 
    Box 1 Velocity Y: ${box1Velocity.velocityY}
    Box 1 Position X: ${box1Velocity.positionX}
    Box 1 Position Y: ${box1Velocity.positionY}
    `, 0, 25)
  ctx.fillText(`
    Box 2 Velocity X: ${box2Velocity.velocityX} 
    Box 2 Velocity Y: ${box2Velocity.velocityY}
    Box 2 Position X: ${box2Velocity.positionX}
    Box 2 Position Y: ${box2Velocity.positionY}
    `, 0, 50)

}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // log velocity-position data
  logVelocity()
  // BOX - 1
  box.draw(ctx)
  box.continiousMove()
  box.friction(0.006)
  box.gravity(0.1)
  box.stayInCanvas()
  box.updateColor()
  // BOX - 2
  box2.draw(ctx)
  box2.continiousMove()
  box2.friction(0.006)
  box2.gravity(0.1)
  box2.stayInCanvas()
  // WALL - 1
  wall.draw(ctx)

  // FOOD
  // foods.map((food) => {
  //   food.draw(ctx)
  // })

  detectCollision()

  requestAnimationFrame(render)
}

requestAnimationFrame(render)








