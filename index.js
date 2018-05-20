let bombSpeed = 1; //how fast bombs fall
let starSpeed = 1; //how fast stars fall
let bombFreq = 80; //how frequently bombs spawn
let starFreq = 100; //spawn frequency is 'makeStarCounter % starFreq === 0, then spawn.'
let makeBombCounter = 0; //used to determine difficulty of game and how frequent bomb drops are.
let makeStarCounter = 0;
const game = document.getElementById("game");
let endGame = false;
let points = 0;
let spriteSize = 30;
let isEs = false;

document.addEventListener("keydown", function(e) {
  //turn the stars into
  if (e.which === 69) {
    if (isEs) {
      isEs = false;
    } else {
      isEs = true;
    }
  }
});

var sprite = {
  el: $("#sprite"),
  x: 280,
  y: 10,
  dx: 0,
  dy: 0
};

const pressed = []; //queue of movement commands.
$(document).on("keydown keyup", function(e) {
  //check for boundary conflicts before adding movement queues onto 'pressed'. Otherwise, I got weird delays while the extraneous 'right' queues were dequeued, for example.
  if (
    sprite.x >= 0 &&
    sprite.x <= 600 - spriteSize && //allows for changes in sprite dimensions.
    sprite.y <= 100 &&
    sprite.y >= 0
  ) {
    pressed[e.which] = e.type === "keydown";
  }
  e.preventDefault();
});

var keys = {
  UP: 38,
  RIGHT: 39,
  LEFT: 37,
  DOWN: 40,
  P: 80
};

function makeStar() {
  const xValue = Math.random() * 590;
  let newStar;
  if (isEs) {
    newStar = document.createElement("img");
    newStar.src = "es_face.png";
    newStar.className = "star";
    // newStar.classname = "starEs";
    // newStar.setAttribute('img')
  } else {
    newStar = document.createElement("div");
    newStar.className = "star";
  }
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

//main play runner
function loop() {
  if (pressed[keys.P]) {
    pauseGame();
  } else {
    //normal game mechanics, update, re-render elements, loop every 1/60th sec
    checkGameDifficulty(); //game gets harder with the more points you have
    update(); //sprite movement
    render(); //
    //frequency of bomb drops. higher = fewer
    if (makeBombCounter % bombFreq === 0) {
      makeBomb();
    }
    //frequency of star drops. higher = fewer
    if (makeStarCounter % starFreq === 0) {
      makeStar();
    }
    makeStarCounter += 0.5; //increase frequency of star appearance
    makeBombCounter += 1; //increase frequency of bomb appearance
    moveBombOrStar("star"); //abstracted because similar mechanics.  Not sure If its worth the loss of human readability
    moveBombOrStar("bomb");
    //end game conditions. endGame is false by default
    if (!endGame) {
      setTimeout(loop, 17);
    } else {
      loseGame();
    }
  }
}

function changeSpriteSize() {
  sprite.el.css({
    width: spriteSize + "px",
    height: spriteSize + "px"
  });
}

function loseGame() {
  const endGame = document.createElement("div");
  endGame.id = "endGame";
  endGame.innerText = `Great Game! You scored ${points} points`;
  game.appendChild(endGame);
}

function moveBombOrStar(bombOrStarString) {
  debugger;
  //stars and bombs have same movement style, not sure if this made things cleaner or less human readable.
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
    bombOrStarBottom <= sprite.y + spriteSize &&
    (bombOrStarLeft + 10 >= sprite.x && bombOrStarLeft <= sprite.x + spriteSize)
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

function pauseGame() {
  //conditional set in loop() function, this triggers on 'p' press. Overlays game, prevents keystroke input, resumes on click.
  const pause = document.createElement("img");
  pause.id = "pause";
  pause.src = "es_face.png";
  game.appendChild(pause);
  document.addEventListener("click", function(e) {
    e.preventDefault();
    pause.parentNode.removeChild(pause);
    loop();
  });
}

function update() {
  // -------Y movement
  if (pressed[keys.UP] && sprite.y < 100) {
    //check boundary for upward movement
    sprite.dy = 5;
  } else if (pressed[keys.DOWN] && sprite.y > 0) {
    //check boundary for downward movement
    sprite.dy = -5;
  } else {
    sprite.dy = 0;
  }
  //-------X movement
  if (pressed[keys.RIGHT] && sprite.x < 600 - spriteSize) {
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
  //update x and y locations to new positions.
  sprite.el.css({
    bottom: sprite.y,
    left: sprite.x
  });
}
