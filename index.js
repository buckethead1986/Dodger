let bombSpeed = 1;
let starSpeed = 1;
let bombFreq = 80;
let starFreq = 100;
let makeBombCounter = 0; //used to determine difficulty of game and how frequent bomb drops are.
let makeStarCounter = 0;
const game = document.getElementById("game");
let endGame = false;
let points = 0;
// let spriteSize = 30;

// let sprite = document.getElementById("sprite");
var sprite = {
  // el: document.getElementById("sprite"), //sprite.el.css doesnt work for the render function with this, but does with jquery
  el: $("#sprite"),
  x: 280,
  y: 10,
  dx: 0,
  dy: 0
};

const pressed = [];
$(document).on("keydown keyup", function(e) {
  if (sprite.x >= 0 && sprite.x <= 570 && sprite.y <= 80 && sprite.y >= 0) {
    //check for boundary conflicts before adding movement queues onto 'pressed'
    pressed[e.which] = e.type === "keydown";
  }
  e.preventDefault();
});

var keys = {
  UP: 38,
  RIGHT: 39,
  LEFT: 37,
  DOWN: 40
};

function makeStar() {
  const xValue = Math.random() * 590;
  const newStar = document.createElement("div");
  newStar.className = "star";
  newStar.style.left = xValue + "px";
  newStar.style.bottom = "390px"; //appears just above game window
  game.appendChild(newStar);
}

function makeBomb() {
  const xValue = Math.random() * 590;
  const newBomb = document.createElement("div");
  newBomb.className = "bomb";
  newBomb.style.left = xValue + "px";
  newBomb.style.bottom = "390px"; //appears just above game window
  game.appendChild(newBomb);
}

function loop() {
  //normal game mechanics, update, re-render elements, loop every 1/60th sec
  checkGameDifficulty();
  update();
  render();
  if (makeBombCounter % bombFreq === 0) {
    //frequency of bomb drops. higher = fewer
    makeBomb();
  }
  if (makeStarCounter % starFreq === 0) {
    //frequency of star drops. higher = fewer
    makeStar();
  }
  makeStarCounter += 0.5;
  makeBombCounter += 1;
  moveBombOrStar("star"); //abstracted because similar mechanics.  Not sure I its worth the loss of human readability
  moveBombOrStar("bomb");
  if (!endGame) {
    //end game conditions
    setTimeout(loop, 17);
  } else {
    loseGame();
  }
}

function checkGameDifficulty() {
  if (points === 40) {
    bombSpeed = 2;
    bombFreq = 60;
    starFreq = 90;
    // debugger;
    // sprite.style.width = spriteSize + "px";
  }
  if (points === 80) {
    bombSpeed = 3;
    starSpeed = 2;
    bombFreq = 40;
    starFreq = 75;
  }
  if (points === 120) {
    bombSpeed = 4;
    starSpeed = 3;
    bombFreq = 20;
    starFreq = 60;
  }
  if (points === 160) {
    bombSpeed = 4;
    starSpeed = 3;
    bombFreq = 10;
    starFreq = 45;
  }
  if (points === 180) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 10;
    starFreq = 30;
  }
  if (points === 220) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 8;
    starFreq = 25;
  }
  if (points === 260) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 6;
    starFreq = 20;
  }
  if (points === 300) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 5;
    starFreq = 15;
  }
  if (points === 340) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 4;
    starFreq = 10;
  }
  if (points === 380) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 8;
  }
  if (points === 420) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 460) {
    bombSpeed = 5;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 500) {
    bombSpeed = 6;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 540) {
    bombSpeed = 7;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
}

function loseGame() {
  const endGame = document.createElement("div");
  endGame.id = "endGame";
  endGame.innerText = `Great Game! You scored ${points} points`;
  game.appendChild(endGame);
}

function moveBombOrStar(bombOrStarString) {
  const allBombsOrStars = document.getElementsByClassName(
    `${bombOrStarString}`
  );
  for (const bombOrStar of allBombsOrStars) {
    let bombOrStarBottom = parseInt(bombOrStar.style.bottom.replace("px", ""));
    let bombOrStarLeft = parseInt(bombOrStar.style.left.replace("px", ""));
    var newY;
    if (bombOrStarString === "bomb") {
      newY = bombOrStarBottom - bombSpeed;
    } else if (bombOrStarString === "star") {
      newY = bombOrStarBottom - starSpeed;
    }
    bombOrStar.style.bottom = newY + "px";
    checkIfLostOrScoredPoints(
      bombOrStar,
      bombOrStarString,
      bombOrStarBottom,
      bombOrStarLeft
    );
  }
}

function checkIfLostOrScoredPoints(
  bombOrStar,
  bombOrStarString,
  bombOrStarBottom,
  bombOrStarLeft
) {
  if (
    //stars and bombs same size, same hit box criteria
    bombOrStarBottom + 10 >= sprite.y &&
    bombOrStarBottom <= sprite.y + 30 &&
    (bombOrStarLeft + 10 >= sprite.x && bombOrStarLeft <= sprite.x + 30)
  ) {
    if (bombOrStarString === "bomb") {
      //lose game
      endGame = true;
    } else if (bombOrStarString === "star") {
      //score some points
      bombOrStar.remove();
      points += 10;
      document.getElementById("score").innerText = `Score: ${points}`;
    }
  }
}

function update() {
  //-------Y movement
  if (pressed[keys.UP] && sprite.y < 80) {
    //check boundary for upward movement
    sprite.dy = 5;
  } else if (pressed[keys.DOWN] && sprite.y > 0) {
    //check boundary for downward movement
    sprite.dy = -5;
  } else {
    sprite.dy = 0;
  }
  //-------X movement
  if (pressed[keys.RIGHT] && sprite.x < 570) {
    //check boundary for rightward movement
    sprite.dx = 5;
  } else if (pressed[keys.LEFT] && sprite.x > 0) {
    //check boundary for leftward movement
    sprite.dx = -5;
  } else {
    sprite.dx = 0;
  }
  sprite.y += sprite.dy;
  sprite.x += sprite.dx;
}

function render() {
  // debugger;

  //update x and y locations to new positions.
  sprite.el.css({
    //this works with jquery, javascript had issues
    bottom: sprite.y,
    left: sprite.x
  });
}
