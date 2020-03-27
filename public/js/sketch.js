
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
let autoRefreshOn = true;

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
    background(255);
    if (grid.checkForEndState() && autoRefreshOn){
        recreateCanvas();
    }
    grid.draw();
    for (let i = 0; i < 3; i++){
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

    buttons = [];
    let toggleAutoRefreshButton = new ToggleAutoRefresh(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 0, 3, togglefAutoRefresh);
    buttons.push(toggleAutoRefreshButton);
    let refreshButton = new RefreshButton(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 1, 3, refresh);
    buttons.push(refreshButton);
    let saveButton = new SaveButton(windowHeight/10, buttonContainerWidth, windowHeight, portrait, 2, 3, saveGrid);
    buttons.push(saveButton);

    // let refresh = () => recreateCanvas();
    // let togglefAutoRefresh = () => autoRefreshOn = !autoRefreshOn;
    // let saveGrid = () => saveGrid();
    //
    // refreshButton.func = refresh;

    canvas = createCanvas(windowWidth, windowHeight);
}

function nullFunction(){}

function mouseClicked() {

    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].testForClick(clickLocation)){
            buttons[i].performClickFunctionality()
        }
    }
}

function returnColors(){
    return grid.returnColors();
}

function saveToComputer(){
    let nums = Date.now()
    let filename = nums.toString() + ".png"
    let dimensions = grid.getGridDimensions()

    let im = get(0, 0, dimensions[0], dimensions[1]);
    im.save(filename);
}

let refresh = () => recreateCanvas();
let togglefAutoRefresh = () => autoRefreshOn = !autoRefreshOn;
let saveGrid = () => saveToComputer();
