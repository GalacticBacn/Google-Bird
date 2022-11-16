<img align="right" width="25%" height="40%" src="/assets/images/GoogleBirdImage.png">

# **Google Bird**

###

#### Harvey Kyllonen
---
## Summary

This is my final project for Google CSSI 2021. It's a Flappy Bird type game with a Google theme made from the ground up using the p5.js library. The game will keep track of your score, which you can increase by safely navigating your way passed the green tubes, and by collecting Larry Page Power-Ups. If your Google Bird hits a tube or falls to the ground you will have to restart from the beginning.

## Tools

- [p5.js] - This is a JavaScript library which allows the game to run and create shape objects on the screen.
- [p5.collide2D.js] - This is part of the p5.js library, required to register collision between objects.
- [p5.sound.js] - This is part of the p5.js library, required to play sounds and background music
- [Adobe Photoshop] - All assets were created using photoshop. Including the beautiful Sundar Pichai Sun!

## How to start the game
Please use this replit link to play the game:
<https://google-bird.galacticbacon.repl.co/>

It will run the game on the replit website. :)

Press *spacebar* to start the game, reset it when you die, and to make the Google Bird jump


## **Code Index**

**Preload function**
>Line 11
~~~sh

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

~~~

**Setup function**
>Line 47
~~~sh


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
~~~

**Scoreboard function**
>Line 106
~~~sh

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
~~~

**Draw function**
>Line 142
~~~sh

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
~~~

**keypressed function**
>Line 220
~~~sh

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

    // sets birds y axis to 300
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

~~~


**Class Bird**
>Line 281

~~~sh


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

~~~

**Class Tube**
>Line 347

~~~sh

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
~~~

**GenerateTube**
>Line 424

~~~sh
const generateTube = () => {
  interval = setInterval(() => {
    if (startGame === true && gameIsOver === false) {
      let newTube = new Tube(width, 0, width, 90, random(50, 250));
      tubes.push(newTube);
    }
  }, 3000)
}
~~~

**Class PowerUp**
>Line 441
~~~sh
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
~~~

**Ranum**

return random number
>Line 494
~~~sh
const ranum = () => {
  return random(10000, 15000)
}
~~~

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [p5.js]: <https://p5js.org/>
   [p5.collide2D.js]: <https://github.com/bmoren/p5.collide2D>
   [p5.sound.js]: <https://p5js.org/reference/#/libraries/p5.sound>
   [Adobe Photoshop]: <https://www.adobe.com/products/photoshop.html>