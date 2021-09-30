var ground,background_Img,background;
var rider_animation,main_Character;
var coin_Animation,coinGroup;
var boat_Img,boatGroup;
var score = 0;
var gameOver_Img;
var gameState = "Play";
var coin_smash;

function preload(){
  rider_animation = loadAnimation("images/Rider01.png","images/Rider02.png","images/Rider03.png","images/Rider04.png","images/Rider05.png")
  background_Img = loadImage("images/background.jpg");
  coin_Animation = loadAnimation("images/coin01.png","images/coin02.png","images/coin03.png","images/coin04.png","images/coin05.png","images/coin06.png")
  boat_Img = loadImage("images/obstacle 1.png");
  gameOver_Img = loadImage("images/game Over.png");
  coin_smash = loadSound("images/coinSound");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  background.addImage("background",background_Img);
  background.x = windowWidth/2;
  background.scale = 3;
  background.velocityX = -3;
  ground = createSprite(windowWidth/2,windowHeight-20,windowWidth,20);
  ground.visible = false;
  main_Character = createSprite(windowWidth/3,windowHeight-160,10,10);
  main_Character.addAnimation("rider",rider_animation);
  main_Character.scale = 2;

  coinGroup = new Group();
  boatGroup = new Group();
  
}

function draw() {
  drawSprites();
  if (gameState === "Play"){ 
  if(background.x<100){
    background.x = windowWidth/2;
  }
  if(keyDown("SPACE")){
    main_Character.velocityY = -10;
  }
  for (var i=0;i<coinGroup.length;i++){
    if (coinGroup.get(i).isTouching(main_Character)){
      coin_smash.play();
      score = score+1;
      coinGroup.get(i).destroy();
    }
  }
  if(boatGroup.isTouching(main_Character)){
    boatGroup.destroyEach();
    coinGroup.destroyEach();
    gameState = "End";
  }
  main_Character.velocityY = main_Character.velocityY+0.5;

  main_Character.collide(ground);
  spawnCoins();
  spawnBoats();
  }
  if (gameState === "End"){
    gameOver = createSprite(windowWidth/2,windowHeight/2,20,20);
    gameOver.addImage("over",gameOver_Img);
    background.velocityX = 0;
    main_Character.destroy();
  }
  textSize(70);
  fill("blue");
  text("score"+score,1120,100);
  
}

function spawnCoins(){
if(frameCount%150 === 0){
  var coin = createSprite(windowWidth,random(displayHeight/2,displayHeight/2+200),20,30);
  coin.velocityX = -5;
  coin.addAnimation("points",coin_Animation);
  coinGroup.add(coin);
}

}

function spawnBoats(){
  if (frameCount%350 === 0){
    var boat = createSprite(windowWidth,windowHeight/2+200,25,25);
    boat.velocityX = -5;
    boat.scale = 0.5;
    boat.addImage("Obstacle",boat_Img);
    boatGroup.add(boat);
  }
}