class Strike{
    constructor(xball , yball, x, y){
        this.xball = xball
        this.yball = yball
        this.x = x
        this.y = y
        this.length = dist(this.xball,this.yball,x,y)
    }

    shoot(ball){
        ball.xspeed += (this.xball - this.x)/8
        ball.yspeed += (this.yball - this.y)/8

    }

    show(){

        let x1 = this.xball
        let y1 = this.yball
        let x2 = this.x
        let y2 = this.y
        stroke(255,255-(this.length/1.5), 50, 120)
        strokeWeight(20)
        line(x1,y1,x2,y2)

    }
}
