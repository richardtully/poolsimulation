class Ball2{
    constructor(r, x, y, xs, ys, m){
        this.col1 = 83
        this.col2 = 88
        this.col3 = 98
        this.r = r;
        this.mass = m
        this.x = x
        this.y = y
        this.xspeed = xs;
        this.yspeed = ys;
        this.yacc = 0
        this.hardness = 0.1 // lower is harder
        this.friction = 0.012 // how much it slows down by rolling normally
        this.dissipation = 0.1 // how much is lost on impact to sound, heat etc
        this.pause = 0 // this feature adds a delay to the reflection of balls from the edge.
        this.potted = 0
        this.playerball = 0
    }
    changeColour(){
        if (this.col1 == 83){
            this.col1 = 51
            this.col2 = 73
            this.col3 = 214
        }else{
            this.col1 = 83
            this.col2 = 88
            this.col3 = 98
        }

    }
    dampen(){
        this.yspeed*= (1-this.dissipation)
        this.xspeed*= (1-this.dissipation)

        if(this.yspeed>this.hardness){
                this.yspeed -= this.hardness
            } 
            else if(this.yspeed < -this.hardness) {
                this.yspeed += this.hardness
            } 
            else{
                this.yspeed = 0
        }

        if(this.xspeed>this.hardness){
                this.xspeed-=this.hardness
            } 
            else if(this.xspeed<-this.hardness) {
                this.xspeed += this.hardness
            } 
            else{
                this.xspeed = 0
            }
    }

    makeNoise(){
        if (Math.abs(this.xspeed+this.yspeed) > 4){
      edgeSoundLoud.play()
    } 
    else if (Math.abs(this.xspeed+this.yspeed) > 0){
      edgeSoundQuiet.play()
    }
    }

    move(){
        if(Math.abs(this.yspeed)<5*this.friction){
            this.yspeed = 0
        }
        if(Math.abs(this.xspeed)<5*this.friction){
            this.xspeed = 0
        }
        this.yspeed *= (1-this.friction)
        this.xspeed *= (1-this.friction)

        if (this.pause == 1){
            this.pause = 0
        }else{
            this.y += this.yspeed
            this.x += this.xspeed
        }
        // this.y += this.yspeed
        // this.x += this.xspeed

        this.yspeed += this.yacc


        if(this.mass < 999999999999){


            // ceiling behaviour
            if(this.y<this.r + barrierthickness && this.x < width-pocketsize && this.x > pocketsize){
                this.makeNoise()
                this.y = this.r + barrierthickness
                this.yspeed*=-1
                this.pause = 1
                this.dampen()
            }
            
            //floor behaviour
            if(this.y > height-this.r-barrierthickness && this.x < width-pocketsize && this.x > pocketsize){
                // this.yspeed -= this.yacc
                this.makeNoise()
                this.y = height - this.r - barrierthickness
                this.yspeed*=-1
                this.pause = 1
                this.dampen()

            }

            //left wall behaviour
            if(this.x < this.r + barrierthickness && this.y < height-pocketsize && this.y > pocketsize){ //} && this.xspeed<0){
                this.makeNoise()
                this.x = this.r + barrierthickness
                this.xspeed*=-1
                this.pause = 1
                this.dampen()
            }

            // right wall behaviour
            if(this.x > width-this.r - barrierthickness && this.y < height-pocketsize && this.y > pocketsize ){ //} && this.xspeed>0){
                this.makeNoise()
                this.x = width - this.r - barrierthickness
                this.xspeed*=-1
                this.pause = 1
                this.dampen()
            }
        }

    }
    checkifpotted(){
        if(this.mass < 999999999999){
            if(this.x < barrierthickness/1.5 || this.y < barrierthickness/1.5 || this.x > width-barrierthickness/1.5 || this.y > height-barrierthickness/1.5 ){
                console.log(this.x)
                console.log('potted')
                potSound.play()
                if(this.playerball == 1){
                    console.log('player ball potted')
                    this.x = 300
                    this.y = height/2
                    this.xspeed = 0
                    this.yspeed = 0
                }else{
                    this.potted = 1
                    console.log('normal ball potted')
                }
                
            }
        }
    }
    show(){
        fill(this.col1,this.col2,this.col3)
        circle(this.x, this.y, 2*this.r)
    }
}
