// ==UserScript==
// @name         dice forge
// @namespace    https://boardgamearena.com/
// @version      0.1
// @description  Lets see
// @author       slonepi
// @match        https://boardgamearena.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Your code here...
    console.log('123');
})();


var counters=document.getElementsByClassName("card-counter");
var pointsInit=false;


var i = setInterval(function() {
    console.log('~~ Hello World');
    if(! pointsInit) {
        initPoints();
    }
    updatePlayerPoints(0);
    updatePlayerPoints(1);

}, 10000);


function updatePlayerPoints(player) {
  let pointsArea = document.getElementById("cardPoints"+player);
  if (pointsArea) {
    pointsArea.innerText = getCardsPoints(player)
  }
}

// Init the player points
function initPoints(){
    console.log('~~ Init point CardPoints...');
    let cardSpanPoints = document.getElementsByClassName("player_score_value");
    console.log(cardSpanPoints.length);
    if (cardSpanPoints.length > 0) {
        console.log('~~ game started, inititialing');
        pointsInit=true;
        console.log(cardSpanPoints[0]);
        cardSpanPoints[0].appendChild(createText(0,'0'));
        cardSpanPoints[1].appendChild(createText(1,'0'));
    }
}

// Prepare Score location
function createText(player, value) {
    let para = document.createElement("P");
    let t = document.createTextNode(value);
    para.id='cardPoints'+player
    para.appendChild(t);
    return para;
}

function getCardsPoints(player) {
  let cards = document.getElementsByClassName("cards-pile")[player].getElementsByClassName("exploit")
  let points = 0;
  for (let card of cards) {
    let i = formatCoodinate(getComputedStyle(card).backgroundPositionY)
    let j = formatCoodinate(getComputedStyle(card).backgroundPositionX)
    console.log("i=" + i + " j=" + j)
    console.log("points="+ cardPoints[i][j-1])
    points += cardPoints[i][j-1]
  }
  return points
}

function formatCoodinate(cor) {
  return Number(cor.substring(0, cor.length - 1)) / (- 100)
}

var cardPoints = [
[0,NaN,2,NaN,4,NaN,8,NaN,14,NaN,10],
[NaN,10,NaN,26,NaN,8,NaN,4,NaN,12,NaN],
[6,NaN,2,NaN,2,NaN,0,NaN,4,NaN,6],
[NaN,8,NaN,8,NaN,16,NaN,6,NaN,6,NaN],
[4,NaN,4,NaN,4,NaN,4,NaN,2,NaN,27]
]
