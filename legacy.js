// Flappy Bird type of game, with a google theme!

// Design doc: https://docs.google.com/document/d/1RUiSC8F6PDFZDHCgAF7BShCb7LWpAF1-f37nM58lXC8/edit?usp=sharing&resourcekey=0-IglEsycsaeqhF2-P6WLzeQ

// 'Pichai Power-Ups', fail on falling to floor,
// fix score bug, add CSS finishing touches, possibly add a jump animation??
// make a new Google Icon with wings?
// BUGSSSSS$$$$$$$$$$$$$$$ D:

let currentHighScore, score, birdImg, bird, newFont, width, height, backgroundSong, bgx1 = 0, bgx2, scrollSpeed, scroll, startGame, topTube, bottomTube, tube, isFalling, tubes, gameIsOver;

let randomHeights = [];
function preload() {
  flappyBackground = loadImage('./assets/images/FlappyBackground.png');
  birdImg = loadImage('./assets/images/googleLogo.png');
  newFont = loadFont('./assets/fonts/flappy.TTF');
  soundFormats('mp3', 'ogg');
  backgroundSong = loadSound('./assets/sounds/ChipTune.mp3');
  flapSound = loadSound('./assets/sounds/flap.mp3');
  topTube = loadImage('./assets/images/topTube.png')
  bottomTube = loadImage('./assets/images/bottomTube.png')
}

function setup() {
  width = 500;
  height = 500;
  createCanvas(width, height);
  gameisOver = false;
  score = 0;
  scroll = false;
  scrollSpeed = 1;
  // bird class
  bird = new Bird(25, 300);
  tubes = [new Tube(width, 0, width, 90, random(50, 250))]
  bgx2 = width
  startGame = false;
  isFalling = true;
  scoreBoard();
  // initialize scoreboard
  if (!currentHighScore) {
    localStorage.setItem("score", 0);
  }

  // change font
  textSize;
  textFont(newFont);

  backgroundSong.setVolume(0.02);
  backgroundSong.loop();
}

function scoreBoard() {
  currentHighScore = localStorage.getItem("score");
  // text(`High Score: ${}`, 90,20);
  fill('white')
  if (gameisOver === true) {
    textSize(60);
    text("GAME OVER", 100, 200);

    textSize(40);
    text(`Score ${score}`, 200, 250);

    textSize(40);
    text(`Best ${currentHighScore}`, 200, 300);

    textSize(60);
    text("Press Any Key to Restart", 50, 360);
  }
}


function draw() {
  //background image scrolling
  image(flappyBackground, bgx1, 0, width, height);
  image(flappyBackground, bgx2, 0, width, height);

  if (startGame) {
    bgx1 -= scrollSpeed;
    bgx2 -= scrollSpeed;
    bird.fall();
  }

  if (bgx1 < -width) {
    bgx1 = width;
  }
  if (bgx2 < -width) {
    bgx2 = width;
  }

  if (!gameisOver) {
    bird.draw();
    // if() {

    // bird.jump()
    // } else
    //   bird.jump();

    textSize(60);
    text('Google Bird', 100, 100);
    // if (keyIsPressed && keyCode === 32) {
    //   bird.moveDown();
    // }

    if (startGame) {
      text(score, width / 2, 200)
      tubes.forEach(function (newTube) {
        newTube.showTube()
        newTube.move()
        newTube.collide()
        newTube.checkScore()
      });
    }
  }
  scoreBoard();
}

function keyPressed() {
  // if (keyCode === 32) {}
  if (!startGame) {
    startGame = true
    generateTube()
  }

  if (keyCode === 32) { // spacebar(32) makes bird jump
    bird.jump()
  }

  if (startGame && gameIsOver) { // restarts game
    // tubes = []
    // bird.y = 300;
    // score = 0;
    gameIsOver = false;
    // generateTube()
    // bird.y = 300;
    // score = 0;
    // tubes = [];
    
    // startGame = true;
  }
}

class Bird {
  constructor(x, y) {
    this.x = x,
      this.y = y,
      this.currentHeight = this.y,
      this.gravity = 0.5,
      this.velocity = 0;
  }

  draw() { // draws the bird
    image(birdImg, this.x, this.y, 50, 50)
  }

  fall() { // bird falling
    if (this.y < height - 90) {
      this.velocity += this.gravity;
      this.y += this.velocity

      if (this.y > height - 90) {
        gameisOver = true; 90;
        this.velocity = 0;
        gameIsOver = true;
      }

      if (this.y < 0) {
        this.y = 0
        this.velocity = 0
      }
    }
  }

  jump() { // bird jumping
    flapSound.setVolume(0.07);
    flapSound.play();
    this.velocity -= 13;
  }
}

class Tube { // the church of tube
  constructor(x1, y1, x2, y2, h1) {
    this.x1 = x1,
    this.y1 = y1,
    this.x2 = x2,
    this.clone = false,
    this.h1 = h1,
    this.h2 = (250 - this.h1) + 50,
    this.y2 = (height - y2) - (250 - this.h1)
  }

  showTube() { // creates tube
    image(topTube, this.x1, this.y1, 100, this.h1)
    image(bottomTube, this.x2, this.y2, 100, this.h2)
  }

  move() { // moves tubes to the left of the screen
    this.x1 -= 3;
    this.x2 -= 3;
  }

  collide() { // tube collision with player bird
    let hit1 = collideRectRect(bird.x, bird.y, 50, 50, this.x1, this.y1, 100, this.h1);
    let hit2 = collideRectRect(bird.x, bird.y, 50, 50, this.x2, this.y2, 100, this.h2);
    if (hit1 || hit2) {
      gameisOver = true;
    }
  }

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

const generateTube = () => { // generates random tube
  setInterval(() => {
    if (startGame  && !gameIsOver) {
      let newTube = new Tube(width, 0, width, 90, random(50, 250));
      tubes.push(newTube);
    }
  }, 3000)
}

