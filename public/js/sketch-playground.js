// the p5.js canvas
let canvas;

// orientation of the canvas. true for portrait
let portrait;
let uiElements;

// array of uiElements that can be interacted with.
let interactives;

// constants that control the size of the p5.js canvas
let grid;
let gridWidth;
let gridHeight;
let autoRefreshOn = true;

// p5.js built-in method
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(24);

    // just for testing: separated the static ui elements and interactive ones
    uiElements = []
    testContainerParams = {color:'green', offsetX: 200, width:400, height:400}
    test1Container = new Container(testContainerParams)
    uiElements.push(test1Container)
    interactives = []
    gridContainerParams = {row: portrait, color:'red', width:200, height:200, parent: test1Container}
    gridContainer = new Container(gridContainerParams)
    interactives.push(gridContainer)

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

    for (let i = 0 ; i < interactives.length; i++){
        interactives[i].draw();
    }


    // if (grid.checkForEndState() && autoRefreshOn){
    //     redrawElements();
    //     console.log('hi')
    // }
    // grid.draw();
}

function redrawElements(){
    portrait = windowWidth < windowHeight;

    // trying to maintain the placement of the interactive object relative to
        // its parent after resizing the window.
        // because interactives aren't recreated like other uiElements when this
        // method is called, you can't parent interactives at the moment.
        // need to fix how interactives function to be encapsulated.

        // also: all uiElements have their coordinates centered at the top left
        // corner and as a result can end up being drawn mostly outside the
        // parent container's boundaries.

        // also also: there is no stopping an interactive from being dragged
        // outside its parent.
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].hasBeenDragged){
            console.log('hi')
            interactives[i].x = interactives[i].ratioX * this.parent.width
            interactives[i].y = interactives[i].ratioY * this.parent.height
        }
    }

    // grid = new Grid(windowWidth/2,windowHeight/2,portrait);
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
    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].testForClick(clickLocation)){
            interactives[i].performClickFunctionality()
        }
    }
}

// p5.js built-in method
function mousePressed() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].testForClick(clickLocation) && interactives[i].isDragging != undefined){
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
