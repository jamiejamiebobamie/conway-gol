// the p5.js canvas
let canvas;

let uiElements = [];

// array of uiElements that can be interacted with.
let interactives = [];

// constants that control the size of the p5.js canvas
let grid;
let gridWidth;
let gridHeight;
let autoRefreshOn = true;

let opponentContainer;

// p5.js built-in method
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    frameRate(24);

    // draws the elements on the canvas
    redrawElements();

    // parents the canvas to the DOM element 'sketch-holder'
    canvas.parent('sketch-holder');

    // centers the canvas
    imageMode(CENTER);
}

// p5.js built-in method
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redrawElements();
}

// p5.js built-in method
function draw () {
    background(30);
    for (let k = 0; k < uiElements.length; k++){
        uiElements[i].draw();
    }
}

function redrawElements(){
    let portrait = windowWidth < windowHeight;

    let uiElements = [];
    let squareSide = portrait ? windowWidth : windowHeight;

    let opponentContainerParams = {row: portrait, width:200, height: 200, offsetX: 200, offsetY: 200}///width:squareSide/1.5, height:squareSide/1.5, offsetX:windowWidth/20, offsetY:windowHeight/7 };
    let opponentContainer = new Container(opponentContainerParams)
    uiElements.push(opponentContainer);

    let buttonParams = {offsetX: windowWidth/2, offsetY: windowHeight/2}
    let button = new Button(buttonParams)
    uiElements.push(button)

    let boardParams = {color:'black', width:squareSide/3, height:squareSide/3, offsetX:windowWidth/2, offsetY:windowHeight/2.2};
    let board = new Container(boardParams)
    uiElements.push(board)

    for (let i = 0; i < 3; i++){
        let rowParams = {color:'white', index: i, len:3, width:board.width - board.width*2/7, height:board.height - board.height*2/7, offsetX:board.width/7, offsetY:board.height/7, parent: board};
        let row = new Container(rowParams)
        uiElements.push(row)

        for (let j = 0; j < 3; j++){
            let columnParams = {color:'white', index: j, len:3, width:row.width/4, height:row.height/4, parent: row};
            let column = new Container(columnParams)
            uiElements.push(column)
        }
    }
}

// button functionality on click
let nullFunction = () => "I do nothing!";
let refresh = () => recreateCanvas();
let togglefAutoRefresh = () => autoRefreshOn = !autoRefreshOn;
let saveToComputer = () => {
    let nums = Date.now()
    let filename = nums.toString() + ".png"
    let dimensions = grid.getGridDimensions()
    let im = get(0, 0, dimensions[0], dimensions[1]);
    im.save(filename);
}

// mouse interactivity should be handled on the top level.
    // but uielements that have interactivity need to be added to the iterable

// p5.js built-in method
function mouseClicked() {
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].testForClick()){
            interactives[i].performClickFunctionality()
        }
    }
}

// p5.js built-in method
function mousePressed() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].testForClick() && interactives[i].isDragging != undefined){
            interactives[i].isDragging = true;
        }
    }
}

// p5.js built-in method
function mouseReleased() {
    let value;
    for (let i = 0; i < interactives.length; i++){
        interactives[i].performValuesResetAfterDrag()
        interactives[i].isDragging = false;
    }
}
