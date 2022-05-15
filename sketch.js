let xoff1 = 0;
let xoff2 = 100000;
let circSize = 100;
let playerSize = 20;
let speed = 0.005;
let num = 0;
let seconds = 0;
let counter = 0;
let s1 = 8000;
let s2 = 2000;
let i = 0;
let k = 0;
const projectiles = [];


function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES); 
  ellipseMode(CENTER);
  circSize = windowWidth;
  noiseDetail(2);
  noCursor();
  

    
}

function draw() {

  background(20);
  drawPlayer();

  if(millis() < 3000){

    num = round(3-(millis()/1000));
    push();
    textSize(width / 5);
    fill(0,255,0);
    if(num == 0){
      text("Go!", width/2, height/2);
    } else {
      text(num, width/2, height/2);     
    }
    
   

    pop();

  } else{
      
    
    let dX = 0;
    let dy = 0;
    let r = dist(0, 0, width/2, height/2);
    seconds = round(millis()/1000);
    
    if(seconds>counter){
      
      dX = r*cos(117*i);
      dY = r*sin(117*i);
      
      //ellipse((dX+(width/2)), (dY+(width/2)), 4);
      if(i==1 || (i%3)>1){
        projectiles[k] = new projectile((dX+(width/2)), (dY+(width/2)), 5, false);
        k++;
      } else if(i%10>8){
        projectiles[k] = new projectile((dX+(width/2)), (dY+(width/2)), 1, true); 
        k++;
      }
      
      i++;
    }
    
    for(j = 0; j < k; j++){
      projectiles[j].move();
      projectiles[j].show();
      
      if(projectiles[j].collided(playerSize)){
       gameOver();
       //console.log(millis());
      }
    } 
 
  }//Close after countdown code.

    xoff1 += speed;
    xoff2 += speed;
    speed = speed + 0.000002;
    counter = seconds;
    //playerSize += 0.1;

  
}

function gameOver(){
    noLoop();
    push();
    cursor();
  

    //button.show();
    
  
    fill(255, 0 ,0);
    textSize(width / 7);
    text('GameOver', width/2, height*0.10);
  
    textSize(width / 17);
    fill('#54c45a');
    let score = round(millis())-3000;
    text('SCORE: ' + score, width/2, height*0.2);
    
    pop(); 
  
  
    let button = createButton('Play Again');
    button.position(415, 500);
    button.mousePressed(reset);
}

function drawPlayer(){
  
  let mx = constrain(mouseX, 0, width);
  let my = constrain(mouseY, 0, height);
  push();
  noStroke();
  fill('white');
  ellipse(mx, my, playerSize, playerSize);
  pop();
}

function reset(){
  
  window.location.reload();
  //console.log("Test");
}


