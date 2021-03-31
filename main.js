let balls = [];
let strikes = [];
let barrierthickness = 30
pocketsize = 80 // this is not the actual size in pixels

let tempval = document.getElementById('number');





let temp = tempval.innerHTML
console.log(temp);



function setup() {
  createCanvas(900, 650);
  background(200);
  let ballradius = 20

  let startingcoordinates = [[600,height/2]]
  startingcoordinates.push([1+600+(3**0.5)*ballradius,height/2 - ballradius])
  startingcoordinates.push([1+600+(3**0.5)*ballradius,height/2 + ballradius])
  startingcoordinates.push([2+600+2*(3**0.5)*ballradius,height/2 - 2*ballradius])
  startingcoordinates.push([2+600+2*(3**0.5)*ballradius,height/2])
  startingcoordinates.push([2+600+2*(3**0.5)*ballradius,height/2 + 2*ballradius])
  startingcoordinates.push([3+600+3*(3**0.5)*ballradius,height/2 + 3*ballradius])
  startingcoordinates.push([3+600+3*(3**0.5)*ballradius,height/2 + ballradius])
  startingcoordinates.push([3+600+3*(3**0.5)*ballradius,height/2 - ballradius])
  startingcoordinates.push([3+600+3*(3**0.5)*ballradius,height/2 - 3*ballradius])





  let playerball = new Ball2(ballradius,300,height/2,0,0,ballradius**3)
  playerball.playerball = 1
  playerball.changeColour()
  balls.push(playerball)

  for(let i=0;i<startingcoordinates.length;i++){
    print('here we go')
    balls[i+1] = new Ball2(ballradius, startingcoordinates[i][0],startingcoordinates[i][1] ,0,0,ballradius**3)
  }

  // top left
  balls.push(new Ball2(barrierthickness, 0, pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, pocketsize, 0,0,0,9999999999999999))

  // top right
  balls.push(new Ball2(barrierthickness, width, pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, width-pocketsize, 0,0,0,9999999999999999))

  // bottom left
  balls.push(new Ball2(barrierthickness, 0, height-pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, pocketsize, height,0,0,9999999999999999))

  // bottom right
  balls.push(new Ball2(barrierthickness, width, height-pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, width-pocketsize, height,0,0,9999999999999999))

  // let playerball = new Ball2(20,300,height/2,0,0,20**3)
  // playerball.playerball = 1
  // playerball.changeColour()
  // balls.push(playerball)
  // console.log(playerball)
}



let selected = false

// function mousePressed(){
//   let x = mouseX
//   let y = mouseY
//   for(i=0;i<balls.length;i++){
//     if(dist(balls[i].x, balls[i].y, x, y) < balls[i].r){ //&& temp == 0){
//       selected = balls[i]
//       return
//     }else{
//       selected = false
//     }
//   }
// }

function mousePressed(){
  let x = mouseX
  let y = mouseY
  if(dist(balls[0].x, balls[0].y, x, y) < balls[0].r){ //&& temp == 0){
    selected = balls[0]
    return
  }else{
    selected = false
  }
}

function drawBarriers(){
  strokeWeight(0)
  fill(69,157,114)

  topbarrier = rect(pocketsize, 0, width - 2*pocketsize, barrierthickness)
  bottomtopbarrier = rect(pocketsize, height-barrierthickness, width - 2*pocketsize, barrierthickness)

  leftbarrier = rect(0, pocketsize, barrierthickness, height - 2*pocketsize)
  rightbarrier = rect(width-barrierthickness, pocketsize, barrierthickness, height - 2*pocketsize)
}
  


function draw() {
  strokeWeight(0)
  stroke(0)
  background(215,206,178);
  temp = 0
  activeballs = []

  for (i = 0; i< balls.length; i++){
    if(balls[i].potted == 0){
      activeballs.push(balls[i])
    }
  }

  for(i=0;i<(activeballs.length-1);i++){
    for(j=i+1;j<activeballs.length;j++){
      detectCollision(activeballs[i],activeballs[j])
    }
  } 

  for(i=activeballs.length-1;i>=0;i--){
    
    activeballs[i].move()
    activeballs[i].show()
    activeballs[i].checkifpotted()

    if(activeballs[i].mass<999999999){
      temp += ((activeballs[i].xspeed)**2 + (activeballs[i].yspeed)**2)**0.5
      temp /= 11
    }
    
    
  }

  drawBarriers()

  for(i=0;i<strikes.length;i++){
    strikes[i].show()
  }

  tempval.innerHTML = temp
}

function mouseDragged(){
  if(selected != false){
    strike1 = new Strike(selected.x, selected.y, mouseX, mouseY)
    strikes[0] = strike1
  }
}
function mouseReleased(){
  if(selected != false){
    strike1.shoot(selected)
    strikes = []
  }
}







var ballSoundLoud = new Howl({
  src: ['click1.mp3'],
  volume: 0.8
});
var ballSoundQuiet = new Howl({
  src: ['click1.mp3'],
  volume: 0.2
});

var edgeSoundLoud = new Howl({
  src: ['woodimpact.mp3'],
  volume: 0.8
});

var edgeSoundQuiet = new Howl({
  src: ['woodimpact.mp3'],
  volume: 0.1
});

var potSound = new Howl({
  src: ['rock.mp3'],
});
