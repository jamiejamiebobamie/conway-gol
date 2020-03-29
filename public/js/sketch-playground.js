let portrait;
let uiElements;

let canvas;
let grid;
let buttons = [];
let slider;
let sliders = []

// constants that control the size of the p5.js canvas
let gridWidth;
let gridHeight;
let canvasDivisorWidth = 15;
let canvasDivisorHeight = 5;
let containerExtension = 0;
let buttonContainerWidth;
let autoRefreshOn = true;

let numSliders = 1;

// p5.js built-in method
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(24);
    redrawElements();
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
    background(200);
    for (let i = 0 ; i < uiElements.length; i++){
            uiElements[i].draw();
    }
    // if (grid.checkForEndState() && autoRefreshOn){
    //     redrawElements();
    //     console.log('hi')
    // }
    // grid.draw();
}

function redrawElements(){
    portrait = windowWidth < windowHeight;
    uiElements = []
    gridWidth = portrait ? windowWidth-windowWidth/5.7 : windowWidth/2-windowWidth/24
    gridHeight = portrait ? windowHeight/2-windowHeight/16 : windowHeight-windowHeight/2
    gridOffsetX = gridWidth/9
    gridOffsetY = gridHeight/9

    nullContainerParams = {row: portrait, color:'blue', len:2, index:1}
    nullContainer = new Container(nullContainerParams)
    uiElements.push(nullContainer)

    uiContainerParams = {row: portrait, color:'orange', len:2, index:0, parent: nullContainer}
    uiContainer = new Container(uiContainerParams)
    uiElements.push(uiContainer)

    sliderContainerParams = {row: portrait, color:'pink', len:2, index:0, parent: uiContainer}
    sliderContainer = new Container(sliderContainerParams)
    uiElements.push(sliderContainer)

    sliderParams = {row: portrait, parent: sliderContainer}
    slider = new Slider(sliderParams)
    uiElements.push(slider)

    buttonContainerParams = {row: portrait, color:'red', len:2, index:1, parent: uiContainer}
    buttonContainer = new Container(buttonContainerParams)
    uiElements.push(buttonContainer)

    buttonParams1 = {row: !portrait, color:'green', len:2, index:0, parent: buttonContainer}
    button1 = new Button(buttonParams1)
    uiElements.push(button1)

    buttonParams2 = {row: !portrait, color:'green', len:2, index:1, parent: buttonContainer}
    button2 = new Button(buttonParams2)
    uiElements.push(button2)

    gridContainerParams = {offsetX:gridOffsetX,offsetY:gridOffsetY, color:'red', width:gridWidth, height:gridHeight}
    gridContainer = new Container(gridContainerParams)
    uiElements.push(gridContainer)

    grid = new Grid(windowWidth/2,windowHeight/2,portrait);

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

// p5.js built-in method
function mouseClicked() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].testForClick(clickLocation)){
            buttons[i].performClickFunctionality()
        }
    }
}

// p5.js built-in method
function mousePressed() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].testForClick(clickLocation) && buttons[i].isDragging != undefined){
            buttons[i].isDragging = true;
        }
    }
}

// p5.js built-in method
function mouseReleased() {
    let value;
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].isDragging){
            value = buttons[i].getScaledUserDragButtonValue()
        }
        buttons[i].isDragging = false;
    }
}
