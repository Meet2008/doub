var player,invi1,invi2,pet,inviCirc,aliensGroup,bg,bulle,tsGroup,bullets,alien,aliens,safetyLine,fuel,health,bulletsGroup,bulletGroup,bulletLine,inviGroup,li,feGroup,heGroup,left,right,shoot,bbGroup,no,sa
var f = 500;
var h = 500;
var a = 500;
var count = 0;
var s = 100;
var score = 1;
var level = 1;
var playerImg,bulletsImg,petImg,alienImage1,alienImage2,backgroundImg,healthE,fuelE,powerE,sheildE,fuelImg,healthImg,abImg,limg,rimg,simg,boss1,boss2,boss3,boss4,bossBu

function preload(){
	playerImg = loadImage("images/playerShip.png");
	bulletsImg = loadImage("images/bullet.png");
	petImg = loadImage("images/pet.png");
	alienImage1 = loadImage("images/alienShip1.png");
	alienImage2 = loadImage("images/alienShip2.png");
	backgroundImg = loadImage("images/background1.png");
	healthE = loadImage("images/HealthEle.png");
	fuelE = loadImage("images/fuelEle.png");
	powerE = loadImage("images/powerEle.png");
	sheildE = loadImage("images/SheildEle.png");
	fuelImg = loadImage("images/fuel.png");
	healthImg = loadImage("images/health.png");
	abImg = loadImage("images/alBullet.png");
	limg = loadImage("images/left.png");
	rimg = loadImage("images/right.png");
	simg = loadImage("images/shoot.png");
	boss1 = loadImage("images/boss1.png");
	boss2 = loadImage("images/boss2.png");
	boss3 = loadImage("images/boss3.png");
	boss4 = loadImage("images/boss4.png");
}

function setup(){
	createCanvas(displayWidth,displayHeight);

	fuel = createSprite(20,460,50,50);
	fuel.addImage(fuelImg);

	bulletLine = createSprite(displayWidth/2,10,1500,15);
	bulletLine.shapeColor="#5E22B5";

	health = createSprite(20,520,50,50);
	health.addImage(healthImg);
	health.scale = 0.1;

	safetyLine = createSprite(displayWidth/2,displayHeight/2+50,1300,10);
    safetyLine.shapeColor = "green"

	inviCirc = createSprite(displayWidth/2,displayHeight/2+160,500,500);
	inviCirc.visible = false;

	player = createSprite(displayWidth/2,displayHeight/2+160);
	player.addImage(playerImg);
	player.scale = 0.3;
	
	left = createSprite(200,510,20,20);
	left.addImage(limg);
	left.scale = 0.1

	right = createSprite(1150,510,20,20);
	right.addImage(rimg);
	right.scale = 0.1

	no = createSprite(500,500);
	no.visible = false;

	sa = createSprite(displayWidth/2,displayHeight/2+50,1300,10);
	sa.visible = false;

	invi1=createSprite(20,340+160,20,100);
	invi1.visible = false;

	invi2 = createSprite(displayWidth-20,displayHeight-380+160,20,100);
	invi2.visible = false;

	li = createSprite(displayWidth/2,displayHeight/2+50,1300,10);
	li.visible = false;
	
	pet = createSprite(500,500);
	pet.addImage(petImg);
	pet.scale = 0.1

	aliensGroup = new Group();	
	bulletsGroup = new Group();
	bulletGroup = new Group();
	inviGroup = new Group();
	feGroup = new Group();
	heGroup = new Group();
	bbGroup = new Group();
  
}


function draw(){
  rectMode(CENTER);
  background(backgroundImg);

  //text

  fill("white");
  textSize(24);
  text(" : " + f,40,465);

  fill("white");
  textSize(24);
  text(" : " + h,40,520);

  fill("white");
  textSize(24);
  text("safety line health : " + s,5,400);

  fill("white");
  textSize(24);
  text("score : " + score,10,50);

  fill("white");
  textSize(24);
  text("level : " + level,10,80);

  //text over
  //controll lines

  if(keyWentDown("space")){
	  player.velocityX = 0;
	createBullet();
  }

 if(keyCode === 39){
	 player.velocityX = 5
 }

 if(mousePressedOver(right) || touches.length > 0){
	player.velocityX = 5;
	touches = [];
 }

 if(mousePressedOver(left) || touches.length > 0){
	player.velocityX = -5;
	touches = [];
 } 

 if(keyCode === 37){
	 player.velocityX = -5
 }

 //controll lines over
 //health decrease lines

 if(bulletGroup.isTouching(player)){
	 bulletGroup.destroyEach();
	 h=h-5;
 }

 if(aliensGroup.isTouching(safetyLine)){
	 aliensGroup.destroyEach();
	 count=0
	 s=s-10;
 }

 if(aliensGroup.isTouching(player)){
	 aliensGroup.destroyEach();
	 h=h-5
 }

 if(bulletGroup.isTouching(safetyLine)){
	 bulletGroup.destroyEach();
	 s=s-5;
 }

 //health decreased lines over
 //game over lines

 if(h <= 0){
	player.destroy();
	aliensGroup.destroyEach();
	bulletGroup.destroyEach();
	bulletGroup.setVelocityXEach=1999;
	bulletsGroup.destroyEach();
	pet.destroy();
	h=0;

	fill("yellow");
	textSize(100);
	text("Game Over",displayWidth/2-300,displayHeight/2);
}

if(f <= 0){
	player.destroy();
	aliensGroup.destroyEach();
	bulletGroup.destroyEach();
	bulletGroup.setVelocityXEach=1999;
	bulletsGroup.destroyEach();
	pet.destroy();
	f=0;

	fill("yellow");
	textSize(100);
	text("Game Over",displayWidth/2-300,displayHeight/2);
}

//game over lines over
//destroy lines

if(s <= 0){
	safetyLine.destroy();
	s=0;
}

if(bulletGroup.isTouching(bulletsGroup)){
	bulletGroup.destroyEach();
	bulletsGroup.destroyEach();
}

if(inviGroup.isTouching(li)){
	inviGroup.destroyEach();
	f=f-1
}

if(aliensGroup.isTouching(bulletsGroup)){
	bulletsGroup.destroyEach();
	count=count+1;
	score=score+1
}

if(count === 5){
	aliensGroup.destroyEach();
	spawnAlien();
	count=0;
	score=score+1;
}

// destroy lines over
//elements work

if(h === 50){
	hE();
	h=h-5
}

if(h === 20){
	hE();
	h=h-5
}

if(player.isTouching(heGroup)){
	heGroup.destroyEach();
	h=h+100
}

if(f === 50){
	fE();
	f=f-1
}

if(f === 20){
	fE();
	f=f-1
}

if(player.isTouching(feGroup)){
	feGroup.destroyEach();
	f=f+200
}

//elements work over
//other

if(score%10 === 0){
	level = level + 1;
	score = score + 1;
}

if(score%2 === 0){
	score = score + 1;
	bossBullets();
	boss();
}

if(aliensGroup.isTouching(sa)){
	
}

if(pet.isTouching(invi2)){
	pet.velocityX = -3;
}

if(pet.isTouching(invi1)){
	pet.velocityX = 3;
}

if(pet.isTouching(no)){
	pet.velocityX = 3;
	no.destroy();
}

 player.bounceOff(invi1);
 player.bounceOff(invi2);

 player.debug=false;
 player.setCollider("circle",0,0,150);

 //other over

 spawnAlien();
 petBullet();
 alBullets();
 invi3();
 sE();
 pE();

 drawSprites();
 
}

function createBullet() {
	var bullets = createSprite(100, 100, 60, 10);
	bullets.addImage(bulletsImg);
	bullets.x = player.x;
	bullets.y = player.y-30;
	bullets.velocityY = -4;
	bullets.lifetime = 200;
	bullets.scale = 0.5;
	bullets.debug=false;
	bullets.setCollider("circle",0,0,10);
	bulletsGroup.add(bullets);	 
}

function petBullet() {
	if(frameCount % 60 === 0){
	var pets = createSprite(100, 100, 60, 10);
	pets.addImage(bulletsImg);
	pets.x = pet.x;
	pets.y = pet.y;
	pets.velocityY = -4;
	pets.lifetime = 200;
	pets.scale = 0.5;
	pets.debug=false;
	pets.setCollider("circle",0,0,10);
	bulletsGroup.add(pets);
	}
}

function alBullets(){
	if(frameCount%60===0){
		var bullet = createSprite(200, 100, 60, 10);
		bullet.addImage(abImg);
		bullet.x=Math.round(random(10,1500));
		bullet.y=10
		bullet.velocityY = 4;
		bullet.lifetime = 200;
		bullet.scale = 0.5;
		bullet.debug=false;
		bullet.setCollider("circle",0,0,10);
		bulletGroup.add(bullet);	
	} 
}
  
  function spawnAlien() {
	if(frameCount % 150 === 0) {
	  var al = createSprite(200,200);
	  al.velocityY = 0.5
	  
	  var rand = Math.round(random(1,2));
	  switch(rand) {
		case 1: al.addImage(alienImage1);
				break;
		case 2: al.addImage(alienImage2);
				break;
		default: break;
	  }

	  al.scale = 0.2;
	  al.x = Math.round(random(50,1200));
	  al.y = Math.round(random(0,10));
	  al.debug=false;
	  al.setCollider("circle",0,0,150);
	  aliensGroup.add(al);
	}
  }

function sE(){
	if(frameCount%10000===0){
		var sp = createSprite(200,200,20,20);
		sp.addImage(sheildE);
		sp.x = Math.round(random(50,1350));
		sp.y = Math.round(random(0,10));
		sp.velocityY = 3;
		sp.lifetime = 600;
	}
}

function pE(){
	if(frameCount%10000===0){
		var pp = createSprite(200,200,20,20);
		pp.addImage(powerE);
		pp.x = Math.round(random(50,1350));
		pp.y = Math.round(random(0,10));
		pp.velocityY = 3;
		pp.lifetime = 600;
	}
}

function fE(){
		var fp = createSprite(200,200,20,20);
		fp.addImage(fuelE);
		fp.x = Math.round(random(50,1350));
		fp.y = Math.round(random(0,10));
		fp.velocityY = 3;
		fp.lifetime = 600;
		feGroup.add(fp);
}

function hE(){
		var hp = createSprite(200,200,20,20);
		hp.addImage(healthE);
		hp.x = Math.round(random(50,1350));
		hp.y = Math.round(random(0,10));
		hp.velocityY = 3;
		hp.lifetime = 600;
		heGroup.add(hp);
}

function invi3(){
	if(frameCount%50===0){
	var inv = createSprite(200,200,20,20);
		inv.x = Math.round(random(50,1350));
		inv.y = Math.round(random(0,10));
		inv.velocityY = 3;
		inv.lifetime = 600;
		inv.visible = false;
		inviGroup.add(inv);
	}
}

function boss(){
		var boss = createSprite(displayWidth/2,100);
		
		var rand = Math.round(random(1,4));
		switch(rand) {
		  case 1: boss.addImage(boss1);
				  break;
		  case 2: boss.addImage(boss2);
				  break;
		  case 3: boss.addImage(boss3);
		          break;
		  case 4: boss.addImage(boss4);
		          break;
		  default: break;
		}
		boss.scale = 0.4;
}

function bossBullets(){
	if(frameCount%60===0){
		var bulle = createSprite(200, 100, 60, 10);
		bulle.addImage(abImg);
		bulle.x=Math.round(random(10,1500));
		bulle.y=10
		bulle.velocityY = 4;
		bulle.lifetime = 200;
		bulle.scale = 2;
		bulle.visible = true;
		bbGroup.add(bulle);
	} 
}