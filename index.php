<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Platformer</title>
    <link rel="stylesheet" type="text/css" href="index.css">
  </head>
  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <div id="game">
      <div id="sprite">
      </div>
      <div id="score">Score:   </div>
      <p id="calltoaction" onclick="$(this).remove();loop()">
        Avoid the Red! Collect the Green! Play with Arrow Keys.
    </div>
    <div id="leaderboard">
      <tr id="leaderboard-data">
  </tr>

    </div>
    <script type="text/javascript" src="difficulty.js"></script>
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
