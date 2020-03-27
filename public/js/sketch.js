
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

    sliders = [];
    for( let i = 0; i < numSliders; i++){
            slider = new Slider(windowWidth, windowHeight, windowWidth<windowHeight, i, numSliders, nullFunction, 0);
            buttons.push(slider)
    }

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
    background(256);

    if (grid.checkForEndState() && autoRefreshOn){
        recreateCanvas();
    }
    grid.draw();
    for (let i = 0; i < buttons.length; i++){
        buttons[i].draw();
    }
}

function recreateCanvas(){

    // portrait or landscape orientation?
    let portrait = windowWidth < windowHeight;

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

    sliders = [];
    sliderCounter = 0;
    for( let i = 0; i < buttons.length; i++){
        let oldValue = buttons[i].getScaledUserDragButtonValue()
        console.log(oldValue)
        if (oldValue){
            sliderValue = buttons[i].getNewScaledUserDragButtonValue(oldValue)
            slider = new Slider(windowWidth, windowHeight, portrait, sliderCounter, 4, nullFunction, sliderValue);
            sliders.push(slider)
            sliderCounter++;
        }
    }

    buttons = [...sliders];
    // buttons = []
    let toggleAutoRefreshButton = new ToggleAutoRefresh(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 0, 3, togglefAutoRefresh);
    buttons.push(toggleAutoRefreshButton);
    let refreshButton = new RefreshButton(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 1, 3, refresh);
    buttons.push(refreshButton);
    let saveButton = new SaveButton(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 2, 3, saveToComputer);
    buttons.push(saveButton);

    canvas = createCanvas(windowWidth, windowHeight);
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
        // if (buttons[i].testForClick(clickLocation)){
        //     console.log('wow', buttons.length)
        // }
        if (buttons[i].testForClick(clickLocation) && buttons[i].isDragging != undefined){
                console.log('wow', buttons.length)
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
    console.log(value)
}

// function saveToComputer(){
//     let nums = Date.now()
//     let filename = nums.toString() + ".png"
//     let dimensions = grid.getGridDimensions()
//
//     let im = get(0, 0, dimensions[0], dimensions[1]);
//     im.save(filename);
// }
