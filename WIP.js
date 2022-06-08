/*
Game Info:
  Flappy Bird type of game, with a google theme!

  Design doc: https://docs.google.com/document/d/1RUiSC8F6PDFZDHCgAF7BShCb7LWpAF1-f37nM58lXC8/edit?usp=sharing&resourcekey=0-IglEsycsaeqhF2-P6WLzeQ
*/
// import Bird from './Bird.js'

let currentHighScore, score, birdImg, bird, newFont, width, height, backgroundSong, bgx1 = 0, bgx2, scrollSpeed, scroll, startGame, topTube, bottomTube, tube, isFalling, tubes, gameIsOver, interval, pagePowerUp, sundarSun, powerup, birdImgFlapped, powerupInterval, powerupSound;

function preload() {
  // loads background image (clear blue sky with cityscape)
  flappyBackground = loadImage('./assets/images/FlappyBackground.png');
  // ----------------

  // loads the google G as the bird
  birdImg = loadImage('./assets/images/GoogleWithWing.png'); // Google with wing image, might be buggy
  birdImgFlapped = loadImage('./assets/images/GoogleFlapped.png');
  // ----------------

  // loading Flappy Bird font
  newFont = loadFont('./assets/fonts/flappy.TTF');
  // ----------------

  // loading background music and the flapping sound
  soundFormats('mp3', 'ogg');
  backgroundSong = loadSound('./assets/sounds/ChipTune.mp3');
  flapSound = loadSound('./assets/sounds/flap.mp3');
  //powerupSound = loadSound('./assets/sounds/powerupSound.mp3');
  // ----------------

  // loading images of the tubes
  topTube = loadImage('./assets/images/topTube.png');
  bottomTube = loadImage('./assets/images/bottomTube.png');
  // ----------------

  // Living like Larry
  pagePowerUp = loadImage('./assets/images/PagePowerUp.png');
  // ----------------

  // SUNdar the sun
  sundarSun = loadImage('./assets/images/SundarTheSun.png');
  // ----------------

}

function setup() {
  // initialize canvas
  width = 500;
  height = 500;
  createCanvas(width, height);
  // ----------------

  // initialize gameisOver & startGame as false
  gameIsOver = false;
  startGame = false;
  // ----------------

  // sets score on setup to 0
  score = 0;
  // ----------------

  // initializing the background scrolling
  scroll = false;
  scrollSpeed = 1;
  // ----------------

  // setting up the bird class & tubes in setup
  bird = new Bird(25, 300);
  tubes = [new Tube(width, 0, width, 90, random(50, 250))]
  powerup = new PowerUp()
  // ----------------

  //background scroll variable
  bgx2 = width;
  // ----------------

  // isFalling is used for the bird to constantly drop unless told to do otherwise
  isFalling = true;
  // ----------------

  // initialize scoreboard & the local storage high score
  scoreBoard();
  if (!currentHighScore) {
    localStorage.setItem("score", 0);
  }
  // ----------------

  // change font and size
  textSize;
  textFont(newFont);
  // ----------------

  // background music loop and volume control
  backgroundSong.setVolume(0.02);
  backgroundSong.loop();
  // ----------------

  // generates new page power ups
  powerup.generate();
  // ----------------
}


// scoreboard function
function scoreBoard() {

  // high score call
  currentHighScore = localStorage.getItem("score");
  // ----------------

  // filling font color as white
  fill('white')
  // ----------------

  // if game isnt started & the game is currently over, run this
  if (startGame === false && gameIsOver === true) {
    // sets game over font size, and also postions the text
    textSize(60);
    text("GAME OVER", 100, 200);
    // ----------------

    // sets the current scores font size and position
    textSize(40);
    text(`Score ${score}`, 160, 250);
    // ----------------

    // sets high score font size and position
    textSize(40);
    text(`Best ${currentHighScore}`, 160, 300);
    // ----------------

    // sets text size and position for text to indicate player to reset the game
    textSize(60);
    text("Press Any Key to Restart", 50, 360);
    // ----------------
  }
  // ----------------
}
// ----------------

function draw() {
  //background image scrolling
  image(flappyBackground, bgx1, 0, width, height);
  image(flappyBackground, bgx2, 0, width, height);
  // ----------------

  // drawing the 'bird' inside of the draw function
  bird.draw();
  // ----------------


  // ----------------

  // background scroll
  if (bgx1 < -width) {
    bgx1 = width;
  }
  if (bgx2 < -width) {
    bgx2 = width;
  }
  // ----------------

  // sundar Sun and Google bird text
  image(sundarSun, width - 240, -110, 450, 300);
  textSize(60);
  text('Google Bird', 100, 100);
  // ----------------

  // if game is started scroll background & bird must fall unless told otherwise
  if (startGame === true) {
    // background scroll
    bgx1 -= scrollSpeed;
    bgx2 -= scrollSpeed;
    // ----------------

    // calls bird fall from class, makes the bird drop unless told otherwise
    bird.fall();
    // ----------------

    // page powerup
    powerup.showPowerUp();
    powerup.move();
    powerup.collide();

    // ----------------

    // if() {
    //bird.jump()
    // } else
    //   bird.jump();

    // background text saying "google bird", shows up during active game play

    // ----------------


    // if (keyIsPressed && keyCode === 32) {
    //   bird.moveDown();
    // }

    // current in game score shown on screen below Google Bird text
    text(score, width / 2, 200);
    tubes.forEach((newTube, index) => {
      newTube.showTube()
      newTube.move(index)
      newTube.collide()
      newTube.checkScore()
    });
  }
  // ----------------



  // calls scoreboard function inside of the draw function, required for the scoreboard to be 'drawn' on screen
  scoreBoard();
  // ----------------
}

function keyPressed() {

  // if the game isnt started, start it and begin drawing tubes
  if (startGame === false && gameIsOver == false) {
    startGame = true;
    gameIsOver = false;
    generateTube();
  }
  // ----------------


  // spacebar(32) makes bird jump, this is the user input for jumps
  if (keyCode === 32) {
    bird.jump();
  }
  // ----------------


  // restarts the game.   If the game is over, and the game is not started, do the listed commands
  if (gameIsOver === true && startGame === false) {
    clearInterval(interval);
    clearInterval(powerupInterval)
    tubes = [new Tube(width, 0, width, 90, random(50, 250))]

    powerup.x = -50
    powerup.generate()

    // sets bird's y axis to 300
    bird.y = 300;
    // ----------------

    // reset score to zero?
    score = 0;
    // ----------------

    // change gameisOver from true to false to begin game
    gameIsOver = false;
    // ----------------

    // changes startGame to true, it is required to be false in order to run this if statement
    startGame = true;
    generateTube()
    // calls the function to generate tubes
    // generateTube();
    // ----------------


    // ----------------


    // bird.y = 300;
    // score = 0;
    // tubes = [];

    // startGame = true;
  }
  // ----------------
}


// bird class
class Bird {

  // constructor initializing values
  constructor(x, y) {
    this.x = x,
      this.y = y,
      this.currentHeight = this.y,
      this.gravity = 0.5,
      this.velocity = 0;
  }
  // ----------------


  // draws the bird
  draw() {
    image(birdImg, this.x, this.y, 70, 50)
  }
  // ----------------

  // bird falling
  fall() {
    // as long as the bird is above the gress
    // if (this.y < height - 90) {

    //make bird fall constantly
    this.velocity += this.gravity;
    this.y += this.velocity;
    // ----------------      
    // }


    //if the bird hits the floor
    if (this.y > height - 90) {
      this.y = height - 90;
      this.velocity = 0;

      startGame = false;
      gameIsOver = true;
    }
    // ----------------

    //if the bird hits the ceiling
    if (this.y < 0) {
      this.velocity = 0
      this.y = 0
    }
    // ----------------
  }
  // ----------------

  // bird jumping
  jump() {
    // plays flapping sound and sets the volume of sound
    flapSound.setVolume(0.07);
    flapSound.play();
    // ----------------

    // velocity/distance of the jump
    this.velocity -= 13;
    // ----------------
  }
}
// ----------------


// the church of tube || tube class to make some tubes :D
class Tube {
  // constructor setting initial values for our class
  constructor(x1, y1, x2, y2, h1) {
    this.x1 = x1,
      this.y1 = y1,
      this.x2 = x2,
      this.clone = false,
      this.h1 = h1,
      this.h2 = (250 - this.h1) + 50,
      this.y2 = (height - y2) - (250 - this.h1);
    this.num = 5
    // this.powerup = image(powerup, )
  }
  // ----------------

  // creates/draws tube
  showTube() {
    image(topTube, this.x1, this.y1, 100, this.h1)
    image(bottomTube, this.x2, this.y2, 100, this.h2)
    let ranum = 5
    if (ranum === this.num) {
      // this.showPowerUp()
    }
  }
  // ----------------

  // moves tubes to the left of the screen (starting from the right)
  move(index) {
    this.x1 -= 3;
    this.x2 -= 3;
    if (this.x1 < -100) {
      tubes.splice(index, 1)
    }
  }
  // ----------------

  // drawing powerup
  showPowerUp() {
    if (this.x1 > 0) {
      this.powerup = image(pagePowerUp, this.x1 + 15, this.h1 + 20, 50, 50)
    }
  }
  // ----------------

  // resets powerups
  resetPowerUp() {
    if (this.x1 < 0) {
      this.powerup = image(pagePowerUp, width + 70, width / 2, 70, 80)
    }
  }
  // ----------------

  // checking tube collision with player bird
  collide() {
    let hit1 = collideRectRect(bird.x, bird.y, 70, 50, this.x1, this.y1, 100, this.h1);
    let hit2 = collideRectRect(bird.x, bird.y, 70, 50, this.x2, this.y2, 100, this.h2);
    if (hit1 || hit2) {
      startGame = false;
      gameIsOver = true
    }
  }
  // ----------------

  // checks score and adds +1 for each tube successfully passed, compares score to high score for improvement
  checkScore() {
    if (bird.x > this.x1 && this.x1 == 8) {
      score += 1
      currentHighScore = localStorage.getItem("score");
      if (score > currentHighScore) {
        localStorage.setItem("score", score)
      }
    }
  }
}
// ----------------

// generates random tube
const generateTube = () => {
  interval = setInterval(() => {
    if (startGame === true && gameIsOver === false) {
      let newTube = new Tube(width, 0, width, 90, random(50, 250));
      tubes.push(newTube);
    }
  }, 3000)
}
// ----------------

// const test = () => {
//   setInterval(() => {
//     // tubes[random(0, tu)].showPo
//   }, random(5, 15))
// }

// power up class, larry page
class PowerUp {
  constructor() {
    this.x;
    this.y;
    this.collected = false
  }
  // draw power up
  showPowerUp() {
    image(pagePowerUp, this.x, this.y, 50, 50);
  }
  // ----------------

  // reset power up X to go back to right side
  resetPowerUp() {
    this.x = width + 50
  }
  // ----------------

  // powerup collision with player bird
  collide() {
    let collide = collideRectRect(bird.x, bird.y, 70, 50, this.x, this.y, 50, 50)
    if (collide) {
      score += 2;
      //poweupSound.play();
      this.collected = true
      this.resetPowerUp()
    }
  }
  // ----------------


  // power up moving
  move() {
    if (!this.collected && !gameIsOver) {
      this.x -= 2;
    }
  }
  // ----------------

  // delay for powerup, will generate when no delay
  generate() {
    powerupInterval = setInterval(() => {
      if (!gameIsOver) {
        this.collected = false
        this.x = random(width / 2, width - 50);
        this.y = random(0, height - 100);
      }
      // this.showPowerUp()
    }, ranum())
  }
  // ----------------
}

const ranum = () => {
  return random(10000, 15000)
}