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
If you don't want to download all of the code please use this replit link
<https://google-bird.galacticbacon.repl.co/>

It will run the game on the replit website. :)


## **Code Index**

Preload function
~~~
Line 21
~~~

Setup function
~~~
Line 46
~~~

Scoreboard function
~~~    
Line 100
~~~

Draw function
~~~
Line 136
~~~

keypressed function
~~~
Line 201
~~~


Class Bird
~~~
Starts @ Line 258

  constructor
    Line 259
    
  draw
    Line 270
    
  fall
    Line 276
    
  jump
    Line 304

~~~

Class Tube
~~~
Starts @ Line 319

  constructor
    Line 321
	
  showTube
    Line 333

  move
    Line 340

  collide
    Line 348

  checkScore
    Line 359
~~~
GenerateTube function
~~~
Line 372
~~~

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [p5.js]: <https://p5js.org/>
   [p5.collide2D.js]: <https://github.com/bmoren/p5.collide2D>
   [p5.sound.js]: <https://p5js.org/reference/#/libraries/p5.sound>
   [Adobe Photoshop]: <https://www.adobe.com/products/photoshop.html>