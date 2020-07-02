
var count = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var playerspaceship;
var playerspaceship2;

var bagground;

var enemiesgroup;
var enemiesGroup;
var Enemiesgroup;
var bulletGroup;

var gameOver ;

var edges;

var restart;
var spaceshipImg;

var restartIMg;

var gameoverImg;

var baggroundImg;
var spaceship2Img;

function preload(){
  spaceshipImg = loadImage("spaceship.png")
  spaceship2Img = loadImage("spaceship2.png")
  restartIMg = loadImage("reset.png")
  gameoverImg = loadImage("gameover.png")
  baggroundImg = loadImage("background.png")
}



function setup() {

  createCanvas(1200, 400)

   playerspaceship = createSprite(200,359,2,29)
  playerspaceship.addImage(spaceshipImg);
  playerspaceship.scale = 0.1;
  playerspaceship.x = constrain(World.mouseX,0,400)
  playerspaceship2 = createSprite(800,359,2,29); 
  playerspaceship2.addImage(spaceship2Img);
  playerspaceship2.scale = 0.1;
  
   bagground  = createSprite(400,400,400,400);
  bagground.addImage(baggroundImg);
  bagground.scale = 1;
  
  
   enemiesgroup = new Group();
 enemiesGroup = new Group();
   Enemiesgroup = new Group();
   bulletGroup = new Group();
  
   gameOver = createSprite(187,297,30,30);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.05;
  gameOver.visible = false;
  
   restart = createSprite(177,203,20,20);
  restart.addImage(restartIMg);
  restart.scale = 0.1;
  restart.visble = false;

}

function draw() {
  
  background(0);

 
 //playerspaceship2.x = constrain(World.mouseX,600,1200)
  
edges =  createEdgeSprites()
  
if (gameState === PLAY) {
  
  bagground.velocityY = -4;


playerspaceship.bounceOff(edges[0]);
playerspaceship2.bounceOff(edges[0]);

if (bagground.y < 0){
    bagground.y = bagground.height/2;
}

playerspaceship.x = World.mouseX;
playerspaceship2.x = World.mouseX;

restart.visible = false;
gameOver.visible = false;

spawnenemies();
spawnEnemies();
Spawnenemies();
createbullet();

enemiesgroup.depth = playerspaceship.depth;
playerspaceship.depth = playerspaceship.depth + 1;
playerspaceship2.depth = playerspaceship2.depth + 5;

 if (keyDown("space")) {
    createbullet(playerspaceship.x);
 }

 if (keyDown("UP_ARROW")) {
  createbullet(playerspaceship2.x);
}

if(bulletGroup.isTouching(enemiesgroup)){
      enemiesgroup.destroyEach();
    bulletGroup.destroyEach();  
   
     count = count + 2;
    }
    
if(bulletGroup.isTouching(enemiesGroup)){
      enemiesGroup.destroyEach();
      bulletGroup.destroyEach();
     
     count = count + 2;
    }
    
if(bulletGroup.isTouching(Enemiesgroup)){
      Enemiesgroup.destroyEach();
      bulletGroup.destroyEach();
    
     count = count + 2;
    }
    
if (enemiesGroup.isTouching(edges[3])) {
    count  = count - 1;
  } 
  
  if (Enemiesgroup.isTouching(edges[3])) {
    count = count - 1;
  }    
  
  if (enemiesgroup.isTouching(edges[3])) {
    count = count - 1;
  }  
  
}
if(enemiesgroup.isTouching(playerspaceship)){
  gameState = END;
}

if(Enemiesgroup.isTouching(playerspaceship)){
  gameState = END;
}

if(enemiesGroup.isTouching(playerspaceship)){
  gameState = END;
}
if(enemiesgroup.isTouching(playerspaceship2)){
  gameState = END;
}

if(Enemiesgroup.isTouching(playerspaceship2)){
  gameState = END;
}

if(enemiesGroup.isTouching(playerspaceship2)){
  gameState = END;
}


  else if (gameState === END){
    

  bulletGroup.velocityY = 0;
  playerspaceship.velocityX = 0;
 playerspaceship2.velocityX = 0;
  bagground.velocityY = 0;

  enemiesgroup.setVelocityYEach(0);
  Enemiesgroup.setVelocityYEach(0);
  enemiesGroup.setVelocityYEach(0);
  bulletGroup.setVelocityYEach(0)

  enemiesGroup.setLifetimeEach(-1);
  Enemiesgroup.setLifetimeEach(-1);
  enemiesgroup.setLifetimeEach(-1);
  bulletGroup.setLifetimeEach(-1);

  gameOver.visible = true;
  restart.visible = true;
  
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  drawSprites();

text("PLAYER SCORE: "+ count, 10, 20);

}



function reset(){
  
  gameState = PLAY;
  
gameOver.visible = false;
restart.visible = false;

enemiesgroup.destroyEach();
enemiesGroup.destroyEach();
Enemiesgroup.destroyEach();
bulletGroup.destroyEach();

count = 0;

}
function createbullet(x){
 var bullet= createSprite(100, 50, 5, 10);
  bullet.y = 320;
  bullet.x = x;                                           
  bullet.shapeColor = "red";
  bullet.velocityY = -4;
  bullet.lifetime = 1000;
  bulletGroup.add(bullet);
  }
  
  function spawnenemies() { 
  if(frameCount % 100 === 0) {
  var enemy = createSprite(70,45,16,55);
  enemy.velocityY = 4 ;
  var rand =Math.round( random(1,4));
  //enemy.setAnimation("enemy" + rand);
  //enemy.scale = 0.5;
  enemy.lifetime = 70;
  enemy.shapeColor = "red"
  enemiesgroup.add(enemy);
  }    
  
  }
  
function spawnEnemies() { 
 if(frameCount % 80 === 0) {
    var Enemy = createSprite(220,45,10,40);
  Enemy.velocityY = 5;
    var rand = Math.round(random(1,4));
   // Enemy.setAnimation("e(nemy" + rand);
   // Enemy.scale = 0.5;
    Enemy.lifetime = 70;
    Enemy.shapeColor = "orange"
  Enemiesgroup.add(Enemy);
  }   
  
} 

function Spawnenemies() { 
 if(World.frameCount % 65 === 0) {
    var enemy = createSprite(345,45,10,40);
    enemy.velocityY = 6 ;
    var rand = Math.round(random(1,4));
   // enemy.setAnimation("enemy" + rand);
    //enemy.scale = 0.5;
    enemy.lifetime = 70;
    enemy.shapeColor = "green"
  enemiesGroup.add(enemy);
  } 
  
} 



