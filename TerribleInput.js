/*
TerribleInput.js
Jacky Lui

function moveKey
Input: keyname, x_pos, y_pos, direction
do: moves key 
Output: key current position
Do:
moves along a certain axis like a bouncy ball but with slight noise in movements
constrained by jumbotron

function hoverKey
Input:
do:
Output:
Do:

function pressKey
Input: key Number (int)
do: input a number into form
Output: currentNumber
Do:

buttonListeners(keyName)
Input: keyName
do:
Output:

*/

function moveKey(keyName,keyPosition, direction, distance) {
    var d = document.getElementById(keyName);
    d.style.position = "absolute";
    // set direction opposition if hits wall
    if (keyPosition[0] <= 10){
        // console.log("left wall");
        distance = 40;
        if (direction < 180 && direction >= 90) direction = 180-direction;
        else direction = 360-(direction - 180);
    } 
    if (keyPosition[0] >= 990){
        distance = 40;
        // console.log("right wall");
        if (direction > 0 && direction <= 90)direction =180 - direction;
        else direction = (360 - direction) + 180;
    }
    if (keyPosition[1] <= 10){
        distance = 40;
        // console.log("bottom wall");
        if (direction >= 270 && direction < 360) direction  = 360- direction;
        else direction = 180 - (direction-180);
    } 
    if (keyPosition[1] >= 490){
        distance = 40;
        // console.log("top wall");
        if (direction > 90 && direction <=180) direction = (180-direction) + 180;
        else direction = 360 - direction;
    } 
    direction = direction %360;
    // convert direction to rads
    var directionRads = direction /180 * Math.PI;
    var xAdd = Math.floor(distance * Math.cos(directionRads));
    var yAdd = Math.floor(distance * Math.sin(directionRads));
    var newKeyPos = [keyPosition[0]+ xAdd, keyPosition[1] + yAdd];
    d.style.left = newKeyPos[0]+'px';
    d.style.top = newKeyPos[1]+'px';
    return [newKeyPos,direction];
}

function hoverKey(id){
    var button = 'button'+id;
    if (id < 10) var text = id;
    else var text = id-10;
    document.getElementById(button).innerHTML  = "button "+text;
}
function hoverOff(id){
    var button = 'button'+id;
    document.getElementById(button).innerHTML = "Push Me!";
}

function buttonListeners(keyName){
        // set button listener
    document.getElementById(keyName[0]).addEventListener("click", function(){
        pressKey(0);
    });
    document.getElementById(keyName[1]).addEventListener("click", function(){
        pressKey(1);
    });
    document.getElementById(keyName[2]).addEventListener("click", function(){
        pressKey(2);
    });
    document.getElementById(keyName[3]).addEventListener("click", function(){
        pressKey(3);
    });
    document.getElementById(keyName[4]).addEventListener("click", function(){
        pressKey(4);
    });
    document.getElementById(keyName[5]).addEventListener("click", function(){
        pressKey(5);
    });
    document.getElementById(keyName[6]).addEventListener("click", function(){
        pressKey(6);
    });
    document.getElementById(keyName[7]).addEventListener("click", function(){
        pressKey(7);
    });
    document.getElementById(keyName[8]).addEventListener("click", function(){
        pressKey(8);
    });
    document.getElementById(keyName[9]).addEventListener("click", function(){
        pressKey(9);
    });
    document.getElementById(keyName[10]).addEventListener("click", function(){
        pressKey(0);
    });
    document.getElementById(keyName[11]).addEventListener("click", function(){
        pressKey(1);
    });
    document.getElementById(keyName[12]).addEventListener("click", function(){
        pressKey(2);
    });
    document.getElementById(keyName[13]).addEventListener("click", function(){
        pressKey(3);
    });
    document.getElementById(keyName[14]).addEventListener("click", function(){
        pressKey("BackSpace");
    });
}
function pressKey(input){
    if (input !== "BackSpace"){
        phoneNumber.push(input);
    } else{
        phoneNumber.pop();
    }
    var formPhone = phoneNumber.join('');
    document.getElementById("form").value = formPhone;
    return phoneNumber;
}

function submitting(){
    if (phoneNumber.length == 10) alert("submitting");
    else alert("need more numbers");
    return false;
}

var buttonNum = 15;
var phoneNumber = [];
$(document).ready(function(){
    // variables
    var notAllNumbersInputted = true;        
    var distance = 20;
    // get initial position and directions of buttons    
    var keyDirection = [];
    var keyPos = [];
    var keyName = [];
    for (var ii =0; ii < buttonNum; ii++){
        keyName.push('Key' + ii);
        keyDirection.push(Math.floor((Math.random() * 360) + 1));
        keyPos.push([Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1)]);
        // set initial position of buttons
        var keyInfo = moveKey(keyName[ii], keyPos[ii],keyDirection[ii],distance);
        keyPos[ii] = keyInfo[0];
        keyDirection[ii] = keyInfo[1];
    }
    // Listen to Buttons
    buttonListeners(keyName);
    // loop to continually move buttons
    setInterval(function(){ 
        for (var ii =0; ii < buttonNum; ii++){
            var keyInfo = moveKey(keyName[ii], keyPos[ii],keyDirection[ii], distance);
            keyPos[ii] = keyInfo[0];
            keyDirection[ii] = keyInfo[1];
            if (phoneNumber.length >= 10) return phoneNumber;
        } 
    }, 80);
});