/************Constructor Functions************** */

var player = [];

// CONSTRUCTOR FUNCTION FOR PLAYER

function Player(name) {
    this.name = name;
    this.health = 100;
    this.attack = "";
    this.blockAmount = "";
    this.hitCount = 0;
    this.currentDefense = "None"
    this.items = [];
    this.imgs = [
        "assets/imgs/progression/start-smile.jpg",
        "assets/imgs/progression/level2-worried.jpg",
        "assets/imgs/progression/level3-sad.jpg",
        "assets/imgs/progression/level4-ko.jpg",
        "assets/imgs/progression/pinch.jpg",
        "assets/imgs/progression/pinch-vs-flex.jpg",
        "assets/imgs/progression/pinch-vs-hand.jpg",
        "assets/imgs/progression/pinch-vs-bite.jpg",
        "assets/imgs/progression/poke.jpg",
        "assets/imgs/progression/poke-vs-flex.jpg",
        "assets/imgs/progression/poke-vs-hand.jpg",
        "assets/imgs/progression/poke-vs-bite.jpg",
        "assets/imgs/progression/punch.jpg",
        "assets/imgs/progression/punch-vs-flex.jpg",
        "assets/imgs/progression/punch-vs-hand.jpg",
        "assets/imgs/progression/punch-vs-bite.jpg"
    ]

    player.push(this);
}

// CONSTRUCTOR FUNCTION FOR BLOCKS

var Block = function(name, modify, description, attackId){
	this.name = name;
	this.modify = modify
    this.description = description;
    this.attackId = attackId
}

/************Creating Variables************** */

// ADDING NEW PLAYER

var newPlayer = new Player("Player One")

// BLOCK MODIFIERS

var blocks = {
    flexOnEm: new Block("Flex On Em", .5, "Flex your muscles to avoid pinching", 001),
    handBlock: new Block("Hand Block", .2, "Put you hand between your eyes and block that eye poke", 002),
    biteEm: new Block("Da Catch", .8, "Catch the elbow to save your damage", 003)
}

//blocks.flexOnEm.name = "Flex On Em"
//blocks.flexOnEm.modify = 0.5

/************DEFENSE BUABILITIES***************/

// ADDS/SUBTRACTS HAND BLOCK DEFENSE FROM ITEMS ARRAY

function handBlock() {
    if (newPlayer.items.length == 1 && newPlayer.items[0] == blocks.handBlock){ 
        newPlayer.items.pop()
        newPlayer.currentDefense = "None"
    } else if(newPlayer.items.length > 0 ){
        newPlayer.items.pop()
        newPlayer.items.push(blocks.handBlock)
        newPlayer.currentDefense = "Hand Block"
    } else {
        newPlayer.items.push(blocks.handBlock)
        newPlayer.currentDefense = "Hand Block"
    }
    drawPlayer(player);
}

// ADDS/SUBTRACTS BITE DEFENSE FROM ITEMS ARRAY

function biteEm() {
    if (newPlayer.items.length == 1 && newPlayer.items[0] == blocks.biteEm){ 
        newPlayer.items.pop()
        newPlayer.currentDefense = "None"
    } else if(newPlayer.items.length > 0 ){
        newPlayer.items.pop()
        newPlayer.items.push(blocks.biteEm)
        newPlayer.currentDefense = "Bite"
    } else {
        newPlayer.items.push(blocks.biteEm)
        newPlayer.currentDefense = "Bite"
    }
    drawPlayer(player);
}   

// ADDS/SUBTRACTS FLEX DEFENSE FROM ITEMS ARRAY

function flex() {
    if (newPlayer.items.length == 1 && newPlayer.items[0] == blocks.flexOnEm){ 
        newPlayer.items.pop()
        newPlayer.currentDefense = "None"
    } else if(newPlayer.items.length > 0 ){
        newPlayer.items.pop()
        newPlayer.items.push(blocks.flexOnEm)
        newPlayer.currentDefense = "Flex"
    } else {
        newPlayer.items.push(blocks.flexOnEm)
        newPlayer.currentDefense = "Flex"
    }
    drawPlayer(player);
}

// ADDS DEFENSE ABILITIES TO ITEMS ARRAY

function addMods(arr){
    var totalBlock = 0;
    for (let i = 0; i < arr.length; i++) {
        var currentItems = arr[i];
        totalBlock += currentItems.modify
    }
    return totalBlock;
}

/************GET ELEMENT BY ID VARIABLES ie. HOOKS***************/

var playerElem = document.getElementById('player-create');
var resetElem = document.getElementById('reset-toggle');
var imgElem = document.getElementById('image-animation');

/************Draw Functions************** */

// SHOW HEALTH IMAGES

function drawHealthImages() {
    if(newPlayer.health >= 75) { // show smile when above 75 health
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[0]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.health >= 25 && newPlayer.health <= 74) { // show worried
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[1]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.health >= 1 && newPlayer.health <= 24) { // show sad
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[2]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.health == 0) { // show KO
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[3]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
        
    } 

}

// STOPS DRAWING IMAGES ONCE GAME OVER

function stopDrawImage() {
    theme = `

    <img class="mar-r img-style" src="${newPlayer.imgs[3]}">
    <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
    
    `
    imgElem.innerHTML = theme
}

// DRAWS PINCH IMAGES

function drawPinchedImage() {
    if(newPlayer.attack == "-10 DMG") { // vs no block
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[4]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-5 DMG") { // vs flex
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[5]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-2 DMG") { // vs hand
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[6]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-8 DMG") { // vs bite
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[7]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } 
}

// DRAWS POKE IMAGES

function drawPokedImage() {
    if(newPlayer.attack == "-20 DMG") { // vs no block
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[8]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-10 DMG") { // vs flex
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[9]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-4 DMG") { // vs hand
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[10]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-16 DMG") { // vs bite
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[11]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    }
}

// DRAWS PUNCH IMAGES

function drawPunchImage() {
    if(newPlayer.attack == "-30 DMG") { // vs no block
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[12]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-15 DMG") { // vs flex
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[13]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-6 DMG") { // vs hand
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[14]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    } else if(newPlayer.attack == "-24 DMG") { // vs bite
        theme = `
    
        <img class="mar-r img-style" src="${newPlayer.imgs[15]}">
        <div class="health-bar" style="height: calc(${newPlayer.health} * 4px);"></div>
        
        `
        imgElem.innerHTML = theme
    }
}

drawHealthImages()

// DRAWS PLAYER ON THE SCREEN

function drawPlayer(arr) {
    theme = `
    
    <div class="attack-controls">
        <h3>${newPlayer.name}</h3>
        <h4>Health: ${newPlayer.health}</h4>
        <h5>You've been hit: ${newPlayer.hitCount}</h5>
        <hr>
        <h4>Attacks: ${newPlayer.attack}</h4>
        <div class="attacks">
            <button onclick="pinch(-10)" class="btn btn-block btn-danger">PINCH</button>
            <button onclick="pokeEyes(-20)" class="btn btn-block btn-danger">POKE EYES</button>
            <button onclick="punch(-30)" class="btn btn-block btn-danger">PUNCH</button>
        </div>
        <hr>
        <h4>Defenses: ${newPlayer.blockAmount}</h4>
        <div class="defence">
            <button id="hold" onclick="flex()" class="btn btn-block btn-success">FLEX</button>
            <button onclick="handBlock(10)" class="btn btn-block btn-success">BLOCK</button>
            <button onclick="biteEm(15)" class="btn btn-block btn-success">BITE</button>
        </div>
        <hr>
        <h6>Current Defense: ${newPlayer.currentDefense}</h6>
    </div>
    
    `
    playerElem.innerHTML = theme
} 

drawPlayer(player);


// SHOWS/HIDES THE RESET BUTTON

function drawResetButton(){
    if(newPlayer.health == 0){
        theme = `
        
        <div class="">
            <button onclick="resetGame()" class="btn btn-danger">RESET GAME!</button>
        </div>
        
        `
        resetElem.innerHTML = theme;
    } else if (newPlayer.health == 100) {
        theme = `
        
        <div class=""></div>
        
        `
        resetElem.innerHTML = theme;
    }
    drawHealthImages();
}

/**********ATTACKS**************/

// PINCH ATTACK

function pinch(num) {
    if(addMods(newPlayer.items) == 0) {
        num = -10;
        newPlayer.health += num
        newPlayer.attack = num +  " DMG";
        drawPinchedImage();
    } else {
        num = -10 * addMods(newPlayer.items)
        newPlayer.health += num
        newPlayer.attack = num +  " DMG";
        newPlayer.blockAmount = "BLK " + (10 + num) + " DMG"
        drawPinchedImage();
    }
    stopCount();

    drawPlayer(player);
    setTimeout(drawHealthImages, 750);
}

// EYE POKE ATTACK

function pokeEyes(num) {
    if(addMods(newPlayer.items) == 0) {
        num = -20
        newPlayer.health += num
        newPlayer.attack = num + " DMG"
        drawPokedImage();
    } else {
        num = -20 * addMods(newPlayer.items)
        newPlayer.health += num
        newPlayer.attack = num + " DMG"
        newPlayer.blockAmount = "BLK " + (20 + num) + " DMG"
        drawPokedImage();
    }
    stopCount();

    drawPlayer(player);
    setTimeout(drawHealthImages, 750);
}

// PUNCH ATTACK

function punch(num) {
    if(addMods(newPlayer.items) == 0) {
        num = -30
        newPlayer.health += num
        newPlayer.attack = num + " DMG"
        drawPunchImage();
    } else {
        num = -30 * addMods(newPlayer.items)
        newPlayer.health += num
        newPlayer.attack = num + " DMG"
        newPlayer.blockAmount = "BLK " + (30 + num) + " DMG"
        drawPunchImage();
    }
    stopCount();

    drawPlayer(player);
    setTimeout(drawHealthImages, 750);
}

/**********HELPER FUNCTIONS**************/

// GAME RESET

function resetGame(){
    if(newPlayer.health < 100) {
        var reset = 100
        newPlayer.health = reset;
        newPlayer.attack = "";
        newPlayer.blockAmount= ""
        newPlayer.hitCount = 0;
        newPlayer.currentDefense = "None"
        
    }
    drawResetButton();
    drawPlayer(player);
}

// STOP COUNTERS AFTER USER HITS 0

function stopCount(){
    if(newPlayer.health >= 0) {
        newPlayer.hitCount++
    }
    else if(newPlayer.health < 0 || newPlayer.healh == 0) {
        loseWarning();        
    }
}

// LOSE MESSAGE ONCE PLAYER HITS 0

function loseWarning(){
    num = 0
    hitCounter = 0
    newPlayer.health = num
    newPlayer.attack = "You Lose!"
    newPlayer.blockAmount = "You Lose!"
    newPlayer.currentDefense = "None"
    newPlayer.items.pop()
    drawResetButton();
    stopDrawImage()
}


// OTHER CODE THAT DID NOT WORK OUT BUT HAD SOME INTERESTING USE

// checkFlex(newPlayer.items)
// if(newPlayer.items)
// newPlayer.items.push(blocks.flexOnEm)


/*
function checkFlex(arr) {
    
    for (let i = 0; i < arr.length; i++) {
        var chkFlex = arr[i];
        if(chkFlex[i].attackId == 001){
            newPlayer.items.pop(blocks.flexOnEm)
        } else {
            newPlayer.items.push(blocks.flexOnEm)
        }
     }
    
}
*/


// addMods(newPlayer.items)
// console.log(addMods(newPlayer.items))