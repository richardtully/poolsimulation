// var ballSound = new Audio('Sounds/woodimpact.mp3')


function detectCollision(b1,b2){
  if(dist(b1.x,b1.y,b2.x,b2.y) < b1.r+b2.r){


    let m = unitVectors(b1.x,b1.y,b2.x,b2.y)
    reposition(b1,b2,m[0])
    changeDirection(b1,b2,m)
    b1.dampen()
    b2.dampen()
    if (Math.abs(b1.xspeed+b1.yspeed+b2.xspeed+b2.yspeed) > 4){
      ballSoundLoud.play()
    } 
    else if (Math.abs(b1.xspeed+b1.yspeed+b2.xspeed+b2.yspeed) > 0){
      ballSoundQuiet.play()
    }
    // 
       
  }
}

// Eliminate overlap
function reposition(b1,b2,un){
  let overlap = b1.r + b2.r - dist(b1.x,b1.y,b2.x,b2.y)
  let tm = b1.mass+b2.mass
  b1.x = b1.x - (overlap*un[0]*(b2.mass/tm))
  b1.y = b1.y - (overlap*un[1]*(b2.mass/tm))
  b2.x = b2.x + (overlap*un[0]*(b1.mass/tm))
  b2.y = b2.y + (overlap*un[1]*(b1.mass/tm))
}

// Calculate the unit normal and unit tangent vectors for the collision
function unitVectors(x1,y1,x2,y2){
  let un = [x2-x1,y2-y1];
  let length = Math.sqrt(Math.pow(un[0],2)+Math.pow(un[1],2));
  un = [un[0]/length,un[1]/length];
  ut = [-un[1],un[0]]
  m = [un,ut]
  return m;
}

// Swap the speed-in-opposing-direction of the two balls
function changeDirection(b1,b2,m){

  v1 = [b1.xspeed,b1.yspeed]
  v2 = [b2.xspeed,b2.yspeed]

  v1n = math.dot(m[0],v1)
  v1t = math.dot(m[1],v1)
  v2n = math.dot(m[0],v2)
  v2t = math.dot(m[1],v2)


  v1tnew = v1t
  v2tnew = v2t

  v1nnew = (v1n*(b1.mass - b2.mass) + 2*b2.mass*v2n)/(b1.mass+b2.mass)
  v2nnew = (v2n*(b2.mass - b1.mass) + 2*b1.mass*v1n)/(b1.mass+b2.mass)

  vector1n = math.multiply(v1nnew,m[0])
  vector1t = math.multiply(v1tnew,m[1])
  vector2n = math.multiply(v2nnew,m[0])
  vector2t = math.multiply(v2tnew,m[1])

  newv1 = math.add(vector1n,vector1t)
  newv2 = math.add(vector2n,vector2t) 

  b1.xspeed = newv1[0]
  b1.yspeed = newv1[1]
  b2.xspeed = newv2[0]
  b2.yspeed = newv2[1]

}