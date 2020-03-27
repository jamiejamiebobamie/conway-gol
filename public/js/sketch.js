
let canvas;
let grid;
let buttons = [];

// constants that control the size of the p5.js canvas
let gridWidth;
let gridHeight;
let canvasDivisorWidth = 15;
let canvasDivisorHeight = 5;
let containerExtension = 0;
let buttonContainerWidth;

// p5.js built-in method
function setup() {
    recreateCanvas();
    canvas.parent('sketch-holder');

    // centers the canvas
    imageMode(CENTER);
}

// p5.js built-in method
function windowResized() {
    recreateCanvas();
}

// p5.js built-in method
function draw () {
    background(0,255,0);
    grid.draw();
    for (let i = 0; i < 3; i++){
        buttons[i].draw();
    }
}

function recreateCanvas(){

    // portrait or landscape orientation?
    let portrait = windowWidth < windowHeight

    if (portrait){
        gridWidth = windowWidth;
        gridHeight = windowHeight - windowHeight / canvasDivisorHeight;
        buttonContainerWidth = windowWidth - windowWidth / canvasDivisorWidth;;
    } else {
        gridWidth = windowWidth - windowWidth / canvasDivisorWidth;
        gridHeight = windowHeight;
        buttonContainerWidth = windowWidth+windowWidth/1.5;
    }

    grid = new Grid(gridWidth, gridHeight, portrait);
    grid.randomizeCellState();

    buttons = [];
    for (let i = 0; i < 3; i++){
        let button = new Button(windowHeight/10, buttonContainerWidth, windowHeight, portrait, i, 3);
        buttons.push(button);
    }
    canvas = createCanvas(windowWidth, windowHeight);
}

function mouseClicked() {

    // let result;
    // clickLocation = { 'x': mouseX, 'y' : mouseY };
    // for (let i = 0; i < buttons.length; i++){
    //     if (buttons[i].testForClick(clickLocation)){
    //         result = buttons[i].performClickFunctionality()
    //     }
    // }
    // if (result){
    //
    // }
    // console.log(buttons.length)
    // // refresh();
    // addSnapshot(widthOfCanvas, heightOfCanvas);
    grid.randomizeCellState();

    console.log(returnColors());
}


function returnColors(){
    return grid.returnColors();
}
