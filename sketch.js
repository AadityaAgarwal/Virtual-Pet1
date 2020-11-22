//Create variables here
var dog,dogHappy;
var dogImg,dogHappyImg;
var database;
var foodS,foodStock;

function preload()
{
  dogImg= loadImage("images/dogImg.png");
  dogHappyImg= loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  dog= createSprite(250,400,10,10);
  dog.addImage(dogImg);
  dog.scale= 0.2;
  
}


function draw() {  

  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
  }

 drawSprites();
  //add styles here

  fill("white");
  textSize(20);
  text("Note: Press the up arrow key to feed the Drago Milk!",0,30);
  text("Remaining: "+foodS,250,250);
}

function keyPressed(){

}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  if(x===0 && keyWentDown(UP_ARROW)){
    x=20;
    dog.addImage(dogImg);
  }
  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS= data.val();
}