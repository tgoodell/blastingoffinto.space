/*eslint-env browser */
/*Stop viewing my code and get your own, you dirty cheater! */
// Set Up Variables
var canvas;
var context;
var WIDTH = 600;
var HEIGHT = 400;
var player = new Sprite();
var score = 0;
var message = "Score: " + score;
var x = 0;
var y = 0;
var speed = 7;
var isUpDown = false;
var isDownDown = false;
var isRightDown = false;
var isLeftDown = false;
var maxHealth = 100;
var healthbar = new Sprite();
healthbar.x = 10;
healthbar.y = 10;
healthbar.width = 200;
healthbar.height = 20;
player.x = 10
player.y = 300

//variables for scrolling game
var scrollSpeed = 5;
var totalCollectables = 250;
var totalEnemies = 50;
var sceneLength = 5000;
var goalx = 5000;

var goalImage = new Image();
goalImage.src = 'images/GoalPixel.png';
goalImage.onLoad = function () {
    context.drawImage(goalImage, 69, 50);
}

//Declare an array variable called collectables. the opening and closing square brackets '[]' mean array in javascript
var collectables = [];
//Use a for loop to fill the array with collectable items
for (var i = 0; i < totalCollectables; i++) {
    collectables.push(new Sprite());
    collectables[i].x = Math.random() * sceneLength;
    collectables[i].y = Math.random() * 400;
    collectables[i].width = 25;
    collectables[i].height = 25;
}
//Declare an array variable called enemies.
var enemies = [];
//Use a for loop to fill the array with enemy items
for (var j = 0; j < totalEnemies; j++) {
    enemies.push(new Sprite());
    enemies[j].x = Math.random() * sceneLength;
    enemies[j].y = Math.random() * 400;
    enemies[j].width = 35;
    enemies[j].height = 35;
}
// splash screen image settings
var splashScreenImage = new Image();
var splashScreenClicked = false;
splashScreenImage.src = "images/DHCode.png";
// end splash screen image settings

//Variable for Background Image
var backgroundImage = new Image();
backgroundImage.src = "images/DirtyHacker.png";
// end background image settings

//Variable for Player Image
var playerImage = new Image();
playerImage.src = "images/PlayerPixel.png";
// end player image settings

//Variable for Collectable Image
var collectableImage = new Image();
collectableImage.src = "images/CollectablePixel.png";
// end collectable image settings

//Variable for Enemy Image
var enemyImage = new Image();
enemyImage.src = "images/EnemyPixel.png";
// end enemy image settings

//Sound variables
var collectableSound = new Audio('sounds/TestF.mp3');

//Sound variables
var enemySound = new Audio('sounds/Explosion+1F.mp3');

var health = 100;
var message2 = "Health: " + health;

// Set Up Functions
function init (){
    // Get reference to canvas
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');

//Call the update function every 10 milliseconds
setInterval(update, 10);

//Listen for player click on splash screen
canvas.onmousedown = canvasClicked;
function canvasClicked(event) {
  splashScreenClicked = true;
}
window.addEventListener('keydown',handleKeyDown,true);
window.addEventListener('keyup',handleKeyUp,true);
}
function update() {
//Draw splash screen
context.drawImage(splashScreenImage, 0, 0);
//Check if the user has clicked to start playing
if(splashScreenClicked){

	//Clear canvas
    clear();

 //Draw background
context.drawImage(backgroundImage, 0, 0);

//Draw goal
context.drawImage(goalImage, goalx, 0);
goalx -= scrollSpeed;

//Check if player has reached the goal
if(goalx == 0){
    //When the player reaches the goal, open the victory page
    window.open("00_victoryScreen.html", "_self");
}

//Draw collectable
for (var i = 0; i < totalCollectables; i++) {
    var collectable = collectables[i];
    collectable.x -= scrollSpeed;
    if (collectable.isVisible == true) {
	    context.drawImage(collectableImage, collectable.x, collectable.y);
	    }

   //Check for collisions between the player and collectable. Also check if the collectable is visible
    if(collectable.isVisible & collides(player, collectable)) {
    //If a collision occurs and the collectable is visible, increase the score
    score ++;
    //Change the collectable's visibility to false so that it only get picked up once
    collectable.isVisible = false;
    collectableSound.play();
    }

    }

//Draw enemies
for (var j = 0; j < totalEnemies; j++) {
    var enemy = enemies[j];
    enemy.x -= scrollSpeed;
    if (enemy.isVisible == true) {
        context.drawImage(enemyImage, enemy.x, enemy.y);
      }


    //Check for collisions between the player and enemy. Also check if the enemy is visible
    if(enemy.isVisible & collides(player, enemy)) {
	//If a collision occurs and the enemy is visible, decrease the score
	health = health - 20;
	//Change the enemy visibility to false
	enemy.isVisible = false;
	enemySound.play();

	if(health < 1) {
     window.open("00_gameOverScreen.html", "_self");
}
	}
	}

	//Draw player
context.drawImage(playerImage, player.x, player.y)


   //Score text font and color
context.font = "25px 'Comic Sans MS', cursive, sans-serif";
context.fillStyle = "#00abff";
//Display score
message = "Score: " + score;
context.fillText(message, 225, 40);

//draw health bar
context.fillStyle = 'green';
	if(health < 40){
		context.fillStyle = 'red';
 	}
context.fillRect(healthbar.x, healthbar.y, healthbar.width*health/maxHealth, healthbar.height);

handleInput();

} //closing brace for if(splashscreenclicked)
} //end update function

function handleInput() {
	if(isUpDown){
		player.y-=speed;
	}
	if(isDownDown){
		player.y+=speed;
	}
	if(isLeftDown){
		player.x-=speed;
	}
	if(isRightDown){
		player.x+=speed;
	}
}

function handleKeyDown(evt) {

    if(evt.keyCode == 39) // Right
    {
        isRightDown = true;
    }
    if(evt.keyCode == 40) // Down
    {
        isDownDown = true;
    }
    if(evt.keyCode == 38) // Up
    {
        isUpDown = true;
    }
    if(evt.keyCode == 37) // Left
    {
        isLeftDown = true;
    }

}

function handleKeyUp(evt) {

    if(evt.keyCode == 39) // Right
    {
        isRightDown = false;
    }
    if(evt.keyCode == 40) // Down
    {
        isDownDown = false;
    }
    if(evt.keyCode == 38) // Up
    {
        isUpDown = false;
    }
    if(evt.keyCode == 37) // Left
    {
        isLeftDown = false;
    }

}

function clear() {
 context.clearRect(0, 0, WIDTH, HEIGHT);
}

function Sprite() {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.isVisible = true;
}
function movePlayer(event) {
    player.x = event.pageX - canvas.offsetLeft;
    player.y = event.pageY - canvas.offsetTop;
}
//Check if object a and object b are colliding
function collides(a, b) {
   var val = false;

   val = (a.x < b.x + b.width) &&
   (a.x + a.width > b.x) &&
   (a.y < b.y + b.height) &&
   (a.y + a.height > b.y);

   return val;
}

//Call the init function as soon as the page has finished loading
window.onload = init;
