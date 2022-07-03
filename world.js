"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

//the width
function p3_tileWidth() {
  return 64;
}
//the height
function p3_tileHeight() {
  return 64;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

//main function?!
function p3_drawTile(i, j) {
  noStroke();

  // Adjacent tiles
  let left = noise(i - 1, j);
  let right = noise(i + 1, j);
  let up = noise(i, j - 1);
  let down = noise(i, j + 1);
  push();
  // beginShape();
  // vertex(0, 0);
  // vertex(0, tw);
  // vertex(th, tw);
  // vertex(th, 0);
  // endShape(CLOSE);

  if(noise(i, j) < 0.4){
    push();
    hell_forest();
    //if the forest's side is lava, run lava auto
    if(left >= 0.4 && left < 0.7) {
      //forest left is the autotile for left side
      lavaleft();
    }
    if (right >= 0.4 && right < 0.7) {
      //forest right is the autotile for left side
      lavaright();
    }
    if (up >= 0.4 && up < 0.7) {
      //forest up is the autotile for up side
      lavatop();
    }
    if (down >= 0.4 && down < 0.7) {
      //forest bottom is the autotile for bottom side
      lavabottom();
    }
  pop(); 
  }else if(noise(i, j) < 0.7 && noise(i, j) >= 0.4){
    //the lava is the main function
    drawlava();
  }else{
    normalb();
    //if the forest's side is lava, run lava auto
    if(left >= 0.4 && left < 0.7) {
      //forest left is the autotile for left side
      lavaleft();
    }
    if (right >= 0.4 && right < 0.7) {
      //forest right is the autotile for left side
      lavaright();
    }
    if (up >= 0.4 && up < 0.7) {
      //forest up is the autotile for up side
      lavatop();
    }
    if (down >= 0.4 && down< 0.7) {
      //forest bottom is the autotile for bottom side
      lavabottom();
    }
  }

  //given already, no need to change
  // let n = clicks[[i, j]] | 0;
  // if (n % 2 == 1) {
  //   fill(255, 255, 0, 180);
  //   ellipse(th/2, tw/2, 10, 10);
  // }

  //update, need to change something
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    if(noise(i, j) < 0.4){
      //add tree on forst
      hellforest1();
      //if the forest's side is lava, run lava auto
    if(left >= 0.4 && left < 0.7) {
      //forest left is the autotile for left side
      lavaleft();
    }
    if (right >= 0.4 && right < 0.7) {
      //forest right is the autotile for left side
      lavaright();
    }
    if (up >= 0.4 && up < 0.7) {
      //forest up is the autotile for up side
      lavatop();
    }
    if (down >= 0.4 && down< 0.7) {
      //forest bottom is the autotile for bottom side
      lavabottom();
    }
    }else if(noise(i, j) < 0.70 && noise(i, j) >= 0.4){
      //add ghost on lava
      ghost();
    }
    else{
      //the normal background
      bg();
      //if the forest's side is lava, run lava auto
    if(left >= 0.4 && left < 0.7) {
      //forest left is the autotile for left side
      lavaleft();
    }
    if (right >= 0.4 && right < 0.7) {
      //forest right is the autotile for left side
      lavaright();
    }
    if (up >= 0.4 && up < 0.7) {
      //forest up is the autotile for up side
      lavatop();
    }
    if (down >= 0.4 && down< 0.7) {
      //forest bottom is the autotile for bottom side
      lavabottom();
    }
    }
  }

  pop();
}

//greenblock to show the location,
//no need to edit
function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

//keep
function p3_drawAfter() {}

//title for lava
//the lava is the main background
function drawlava() {
  fill('#CF1020');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke('#FF4500');
  strokeWeight(4);
  rect(10, 10, 10, 10);
  rect(40, 40, 10, 10);
  rect(35, 15, 10, 10);
  rect(15, 35, 10, 10);
  rect(25, 25, 3.5, 3.5);
  rect(35, 35, 3.5, 3.5);
  rect(15, 55, 3.5, 3.5);
  rect(25, 45, 3.5, 3.5);
  rect(55, 45, 3.5, 3.5);
  
  stroke('yellow');
  rect(12, 12, 3.5, 3.5);
  rect(42, 42, 3.5, 3.5);
  rect(37, 17, 3.5, 3.5);
  rect(17, 37, 3.5, 3.5);
  rect(45, 45, 3.5, 3.5);
}

function hell_forest(){
  //thebackground color
  fill('#008080');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke("#00fa9a");
  //stroke("#480607");
  strokeWeight(4);
  rect(5,5,1,1);
  rect(50,50,1,1);
  rect(30,40,1,1);
  rect(10,45,1,1);
  rect(26,21,1,1);
  rect(28,55,1,1);
  rect(45,10,1,1);
  rect(55,25,1,1);
}

//need a walk fire block
function bg(){
  fill('#FF4500');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke('#610c04');
  strokeWeight(10);
  rect(5, 5, 15, 5);
  rect(35, 5, 25, 5);
  rect(5, 25, 45, 5);
  rect(30, 45, 30, 1);
  rect(5, 50, 1, 1);
  rect(5, 60, 55, 1);
}

function normalb(){
  //thebackground color
  fill('#610c04');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
   stroke("#c0c0c0");
  //stroke("#480607");
  strokeWeight(8);
  rect(15,50,2,2);
  rect(25,50,2,2);
  rect(35,50,2,2);
  rect(45,50,2,2);
  
  stroke("#dcdcdc");
  rect(25,40,8,8);
  rect(30,40,8,8);
  rect(25,30,8,8);
  rect(30,30,8,8);
  strokeWeight(10.5);
  circle(31.5,25,10.5,10.5);
  
  stroke("#696969");
  strokeWeight(4);
  rect(29,40,4,4);
  rect(29,30,4,4);
}

function ghost(){
  stroke('white');
  strokeWeight(22);
  circle(30,26,15,15);
  strokeWeight(3);
  rect(28,40,3,15);
  rect(18,40,3,15);
  rect(38,40,3,15);
  
  //the black color part
  stroke('black');
  strokeWeight(5);
  circle(20,24,1,1);
  circle(40,24,1,1);
}

function hellforest1(){
  //thebackground color
  fill('#008080');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke("#ffcc00");
  //stroke("#480607");
  strokeWeight(4);
  rect(5,5,1,1);
  rect(50,50,1,1);
  rect(30,40,1,1);
  rect(10,45,1,1);
  rect(26,21,1,1);
  rect(28,55,1,1);
  rect(55,10,1,1);
  rect(59,25,1,1);
  
  //the wood of the hell tree
  stroke("#480607");
  strokeWeight(8);
  rect(30,50,4,4);
  rect(30,40,4,4);
  rect(30,30,4,4);
  
  //the hell tree leave
  stroke("#7fffd4");
  rect(15,25,35,4);
  rect(25,15,20,4);
  rect(35,10,3,4);
}

//https://www.youtube.com/watch?v=o9sgjuh-CBM
//auto useful
function lavaleft() {
  stroke('#CF1020');
  strokeWeight(9);
  circle(0,14,1,1);
  circle(0,20,1,1);
  circle(0,34,1,1);
  circle(0,40,1,1);
  circle(0,54,1,1);
  circle(0,64,1,1);
 }

function lavaright(){
  stroke('#CF1020');
  strokeWeight(9);
  circle(64,3,1,1);
  circle(64,20,1,1);
  circle(64,34,1,1);
  circle(64,40,1,1);
  circle(64,55,1,1);
  circle(64,64,1,1);
}

function lavatop(){
  stroke('#CF1020');
  strokeWeight(9);
  circle(0,0,1,1);
  circle(16,0,1,1);
  circle(23,0,1,1);
  circle(35,0,1,1);
  circle(45,0,1,1);
  circle(64,0,1,1);
}

function lavabottom(){
  stroke('#CF1020');
  strokeWeight(9);
  circle(0,64,1,1);
  circle(14,64,1,1);
  circle(34,64,1,1);
  circle(38,64,1,1);
  circle(48,64,1,1);
  circle(64,64,1,1);
}
