export default class Bird {
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
  static draw() {
    image(birdImg, this.x, this.y, 50, 50)
  }
  // ----------------

  // bird falling
  static fall() {
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
  static jump() {
    // plays flapping sound and sets the volume of sound
    flapSound.setVolume(0.07);
    flapSound.play();
    // ----------------

    // velocity/distance of the jump
    this.velocity -= 13;
    // ----------------
  }
}