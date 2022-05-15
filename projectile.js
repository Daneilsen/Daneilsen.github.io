class projectile { 
  
  constructor(iX, iY, iSpeed, isHoming){
  this.x = iX;
  this.y = iY;
  this.speed = iSpeed;
  this.yDiff= mouseY - this.y;
  this.xDiff = mouseX - this.x; 
  this.a = atan2(this.yDiff/2, this.xDiff/2);
  this.yspeed = iSpeed*sin(this.a);
  this.xspeed = iSpeed*cos(this.a); 
  this.size = 20;
  this.homing = isHoming;
    
    if(this.homing){
        this.distance = 50;
        this.yforce = 0;
        this.xforce = 0;
        this.force = 0;
        this.g =0; //gravitational force
        this.drag = 0.02; 
        this.dragC = 0.0000085//drag coefficient
    }
    
  }



  move() {
    if(!this.homing){
      if(this.x < 0 || this.y > width || this.x > width || this.y < 0){
        this.yDiff= mouseY - this.y;
        this.xDiff = mouseX - this.x; 
        this.a = atan2(this.yDiff/2, this.xDiff/2);
        this.yspeed = this.speed*sin(this.a);
        this.xspeed = this.speed*cos(this.a);
      }

      if(this.speed < 22){
        this.speed += 0.00025; 
        //this.size = this.speed+10;
      } 
      
    } else {
      
      if((this.x < 0 && this.xspeed < 0) || (this.x > width && this.xspeed > 0 )){
        this.xspeed = this.xspeed*-1;
      }
      
      if((this.y < 0 && this.yspeed < 0) || (this.y > height && this.yspeed > 0 )){
        this.yspeed = this.yspeed*-1;
      }
      
      this.yDiff = mouseY - this.y;
      this.xDiff = mouseX - this.x;
      this.distance = sqrt(sq(this.xDiff)+sq(this.yDiff));
      this.distance = map(this.distance, 2, (width*2), 1, 15);

        this.force = sq(log(1.5+this.g))/this.distance;
        this.g += 0.0002;        


        this.a = atan2(this.yDiff/2, this.xDiff/2);

        this.yforce = this.force*sin(this.a);
        this.xforce = this.force*cos(this.a);

        this.yspeed = this.yspeed + this.yforce;
        this.xspeed = this.xspeed + this.xforce;
        this.speed = sqrt(sq(this.xspeed)+sq(this.yspeed));
        this.drag = this.dragC*sq(this.speed*10);
      
        if(this.speed != 0){
          this.a = atan2(this.yspeed, this.xspeed);
          this.xspeed = this.xspeed - (this.drag*cos(this.a));
          this.yspeed = this.yspeed - (this.drag*sin(this.a));  
        }
      
    }
    
      this.y = this.y + this.yspeed;
      this.x = this.x + this.xspeed;
      //this.size = this.speed+10;


  }
  
  collided(playerSize){
    
    let mx = constrain(mouseX, 0, width);
    let my = constrain(mouseY, 0, height);
    
    if(dist(this.x, this.y, mx, my) < (this.size/2)+(playerSize/2)) {
      return true;    
    } else {
      return false;
    }
  }

  show() {
    
    noStroke();
    
    if(!this.homing){
      fill(214, 32, 32);    
    } else {
      fill(230, 175, 37);
    }


    ellipse(this.x, this.y, this.size, this.size);
  }
}
