var trex ,trex_running;
var ground;
var groundImg;
var invisibleGround;
var cloudImg;
//crear 6 variables para guardar a cada obstaculo
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score= 0;
var gameState="play";
var cloudsGroup;
var obstaclesGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var trex_collided;
var teroImg, teroGroup;
var checkPointSound, dieSound, jumpSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage ("cloud.png");
  //Cargar las seis imágenes de los obstáculos
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOverImg = loadImage ("gameOver.png");
  restartImg = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
  teroImg = loadAnimation("tero1.png", "tero2.png");
  //Precargar los sonidos
  checkPointSound = loadSound ("checkPoint.mp3");
  dieSound = loadSound ("die.mp3");
  jumpSound = loadSound ("jump.mp3");
}

function setup(){
  createCanvas(600,200)

  //crear sprite de Trex
  trex = createSprite(50,170,20,40)
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  ground = createSprite (200,180,400,20);
  ground.addImage(groundImg)
  invisibleGround = createSprite (200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  teroGroup = new Group();
  gameOver = createSprite(300,100,10,10);
  restart = createSprite(300,140,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart.addImage(restartImg);
  restart.scale= 0.5;

  gameOver.visible= false;
  restart.visible = false;
  //var numeroAleatorio;
  //numeroAleatorio = Math.round(random(0,10));
  //console.log(numeroAleatorio);
  //trex.debug = true;
  trex.setCollider("circle",0,0,40);
}

function draw(){
  background(180);
  text("Puntuación: " + Math.round(score), 400,50);
  trex.collide(invisibleGround);

  if(gameState==="play"){
    ground.velocityX = -(4+3*score/100);
    score += 1/10;
    
    if(score%100===0 && score>0){
      checkPointSound.play();
    }

    if (keyDown("space") &&  trex.y>150){
      trex.velocityY = -10;
      jumpSound.play();
    }
    
    if(ground.x<0 ){
      ground.x = ground.width/2;
    }

    trex.velocityY= trex.velocityY +0.5;
    spawnClouds();
    spawnObstacles();
    spawnTero();
    
    if(trex.isTouching(obstaclesGroup)){
      gameState= "end";
      dieSound.play();
    }
    
  }

  

  if(gameState==="end"){
    ground.velocityX = 0;
    trex.velocityY = 0;
    console.log(gameState);
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach (0);
    obstaclesGroup.setLifetimeEach (-1);
    trex.changeAnimation("collided", trex_collided);
  }

  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%60 ===0){
    //crear un sprite para los obstaculos
    var obstacle = createSprite(700,170,20,40); 
    //El obstaculo se mueve hacia la izquierda
    obstacle.velocityX= -(4+3*score/100);
    var num= Math.round(random(1,6))
    switch (num){
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime= 200;
    obstaclesGroup.add(obstacle);
  }
}


function spawnClouds(){
  // declarar una variable para las nubes
  // Crear un sprite
  if(frameCount%60 ===0){
    var cloud = createSprite(600,50,40,20);
    // La nube se mueve hacia la izquierda
    cloud.velocityX = -(4+3*score/100);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(10,120));
    cloud.scale = 0.5;
    trex.depth = cloud.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 150;
    cloudsGroup.add(cloud);
  }
}

function spawnTero(){
  // declarar una variable para las nubes
  // Crear un sprite
  if(frameCount%100 ===0){
    var tero = createSprite(600,50,40,20);
    // La nube se mueve hacia la izquierda
    tero.velocityX = -(10+3*score/100);
    tero.addAnimation("tero",teroImg);
    tero.y = Math.round(random(10,120));
    tero.lifetime = 150;
    teroGroup.add(tero);
  }
}
