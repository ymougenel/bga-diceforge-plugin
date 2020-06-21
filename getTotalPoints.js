// ==UserScript==
// @name         dice forge - points counter
// @namespace    https://boardgamearena.com/
// @version      1.0
// @description  Lets see
// @author       slonepi
// @match        https://boardgamearena.com/*
// @grant        none
// ==/UserScript==

// Periodic points update
var i = setInterval(function() {
    updatePlayerPoints(0);
    updatePlayerPoints(1);
}, 2000);


/**
 * Update player total ploints
 *
 * @input player turn order (either 0 or 1)
 */
function updatePlayerPoints(player) {
  let totalPointsArea = document.getElementById("totalPoints"+player);
  if (!totalPointsArea) {
    initPoints(player);
    totalPointsArea = document.getElementById("totalPoints"+player);
  }
  let cardsPoints = getCardsPoints(player);
  let dicePoints = document.getElementsByClassName("player_score_value")[player].innerText;
  let totalPoints = Number(dicePoints) + Number(cardsPoints);
  console.log("Total points of player:" + player + "=" + totalPoints);
  totalPointsArea.innerText = totalPoints + " PV";
}

/**
 * Init the player points HTML area
 *
 * @input player turn order (either 0 or 1)
 */
 function initPoints(player) {
    let totalPoints = document.getElementsByClassName("player-name");
    totalPoints[player].appendChild(createTotalPoints(player,'0 PV'));
}

/**
 * Create the player points HTML area
 *
 * @input player turn order (either 0 or 1)
 */
function createTotalPoints(player, value) {
    let para = document.createElement("P");
    let t = document.createTextNode(value);
    para.id='totalPoints'+player
    para.appendChild(t);
    return para;
}

/**
 * Count the player card points
 *
 * @input player turn order (either 0 or 1)
 * @output the player card points
 */
function getCardsPoints(player) {
  let cards = document.getElementsByClassName("cards-pile")[player].getElementsByClassName("exploit")
  let points = 0;
  for (let card of cards) {
    // Cards are regrouped in a file, the displayed sprite depends on the background postions
    let i = formatCoodinate(getComputedStyle(card).backgroundPositionY)
    let j = formatCoodinate(getComputedStyle(card).backgroundPositionX)
    points += cardPoints[i][j]
  }
  return points
}

/**
 * Transform the background style into matrix coordinate
 *
 * (example: "-500%" -> 5)
 * @input the background style
 * @output the coordinate
 */
function formatCoodinate(cor) {
  return Number(cor.substring(0, cor.length - 1)) / (- 100)
}

var cardPoints = [
[NaN,0,NaN,2,NaN,4,NaN,8,NaN,14,NaN],
[10,NaN,10,NaN,26,NaN,8,NaN,4,NaN,12],
[NaN,6,NaN,2,NaN,2,NaN,0,NaN,4,NaN],
[6,NaN,8,NaN,8,NaN,16,NaN,6,NaN,6],
[NaN,4,NaN,4,NaN,4,NaN,4,NaN,2,NaN]
]
