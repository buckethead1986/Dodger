//increases difficulty depending on accumulated points
function checkGameDifficulty() {
  if (points === 40) {
    spriteSize = 25;
    changeSpriteSize();
    bombSpeed = 2;
    bombFreq = 60;
    starFreq = 90;
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
    spriteSize = 20;
    changeSpriteSize();
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
    spriteSize = 15;
    changeSpriteSize();
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
    spriteSize = 10;
    changeSpriteSize();
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
  if (points === 580) {
    bombSpeed = 8;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 620) {
    bombSpeed = 8;
    starSpeed = 3;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 660) {
    bombSpeed = 8;
    starSpeed = 4;
    bombFreq = 3;
    starFreq = 6;
  }
  if (points === 700) {
    bombSpeed = 8;
    starSpeed = 4;
    bombFreq = 2;
    starFreq = 6;
  }
  if (points === 740) {
    bombSpeed = 9;
    starSpeed = 4;
    bombFreq = 2;
    starFreq = 6;
  }
  if (points === 780) {
    bombSpeed = 9;
    starSpeed = 5;
    bombFreq = 2;
    starFreq = 6;
  }
  if (points === 820) {
    bombSpeed = 9;
    starSpeed = 5;
    bombFreq = 2;
    starFreq = 6;
  }
  if (points === 860) {
    bombSpeed = 10;
    starSpeed = 5;
    bombFreq = 2;
    starFreq = 6;
  }
  if (points === 900) {
    bombSpeed = 10;
    starSpeed = 5;
    bombFreq = 1;
    starFreq = 6;
  }
}
