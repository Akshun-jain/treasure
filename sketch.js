var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var GameState=PLAY;

var gameoversound;
var collectingsound;
var winsound;
var restartimg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  collectingsound = loadSound("achievement.mp3");
  winsound=loadSound("win.mp3");
  gameoversound=loadSound("gameover.mp3");
  restartimg=loadImage("restart.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);

restart=createSprite(300,200,30,20);
  restart.addImage(restartimg);
  restart.scale=0.5;
  restart.visible=false;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  if (treasureCollection>500){
    textSize(20);
  fill(255);
  text("You won ",150,200);
    winsound.play()
  }

  background(0);
  boy.x = World.mouseX;
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if (boy.isTouching(swordGroup)){
    boy.collide(swordGroup)
    gameoversound.play()
    GameState=END;
    treasureCollection=0;
  }
  
  if(boy.isTouching(jwelleryG)){
    collectingsound.play()
  }
  
  if(boy.isTouching(diamondsG)){
    collectingsound.play()
  }
  
  if(boy.isTouching(cashG)){
    collectingsound.play()
  }
  
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  boy.setCollider("circle",0,0,520);
  boy.debug=false;
  
  if (GameState===PLAY){
    

    
        if(boy.isTouching(jwelleryG)){
    treasureCollection=treasureCollection+1
          
  }
    if(boy.isTouching(diamondsG)){
    treasureCollection=treasureCollection+2
      
  }
    if(boy.isTouching(cashG)){
    treasureCollection=treasureCollection+3
      
  }
  
    swordGroup.velocityY=3;
    diamondsG.velocityY=3;
    jwelleryG.velocityY=3;
    cashG.velocityY=3;
  
     createCash();
    createDiamonds();
    createJwellery();
    createSword();

    endgame.visible=false;
    
    
    path.velocityY = (4+2*treasureCollection/20)
    
  }
  
  else if (GameState===END){
    cashG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    boy.visible=false;
    path.velocityY=0;
   endgame();
    
    
  }
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
    }
  
  

  

  
  drawSprites();
 
 textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}
  
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY =  (4+2*treasureCollection/20);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY =  (4+2*treasureCollection/20);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY =  (4+2*treasureCollection/20);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY =  (4+2*treasureCollection/20);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function reset(){
  swordGroup.velocityY=3;
    diamondsG.velocityY=3;
    jwelleryG.velocityY=3;
    cashG.velocityY=3;
  GameState="PLAY";
  treasureCollection=0
}



function endgame(){
  gameover=createSprite(200,200)
  gameover.scale=0.5 
  gameover.addAnimation("game",endImg);
}



