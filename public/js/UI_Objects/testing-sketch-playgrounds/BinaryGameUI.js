// the p5.js canvas
let canvas;

// orientation of the canvas. true for portrait
let portrait;
let uiElements;

// array of uiElements that can be interacted with.
let interactives = [];

// constants that control the size of the p5.js canvas
let grid;
let gridWidth;
let gridHeight;
let autoRefreshOn = true;

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

    let storeRatios = []
    for (let i = 0; i < interactives.length; i++){
        if (interactives[i].hasBeenDragged){
            let ratio = {index: i, x:interactives[i].ratioX, y:interactives[i].ratioY};
            storeRatios.push(ratio);
        }
    }

    // just for testing: separated the static ui elements and interactive ones
    uiElements = [];
    interactives = []
    let squareSide = portrait ? windowWidth : windowHeight;

    // let bodyParams = {row: portrait, color:'pink', offsetY:90};
    // let body = new Container(bodyParams);
    // uiElements.push(body);

    let gameCircleParams = {color:'blue',width:squareSide/1.5, height:squareSide/1.5, offsetX:windowWidth/20, offsetY:windowHeight/7 };
    let gameCircle = new Container(gameCircleParams)
    uiElements.push(gameCircle);

    let testCircleParams = {color:'yellow',width:gameCircle.width, parent:gameCircle };
    let testCircle = new Button(testCircleParams)
    // testCircle =
    uiElements.push(testCircle);

    let scoreboardParams = {color:'red',width:squareSide/3, height:squareSide/3, offsetX:windowWidth/2, offsetY:windowHeight/2.2};
    let scoreboard = new Container(scoreboardParams)
    interactives.push(scoreboard)

    //
    // gridContainerParams = {row: false, color:'blue', width:20, height:20}
    // gridContainer2 = new Container(gridContainerParams)
    // uiElements.push(gridContainer2)
    //

    for (let i = 0; i < storeRatios.length; i++){
        let interactive = interactives[storeRatios[i].index]
        interactive.hasBeenDragged = true;
        let parentWidth = interactive.parent ? interactive.parent.width : windowWidth
        let parentHeight = interactive.parent ? interactive.parent.height : windowHeight
        console.log(storeRatios[i])
        interactive.ratioX = storeRatios[i].x// parentWidth
        interactive.ratioY = storeRatios[i].y
        interactive.x = storeRatios[i].x * parentWidth// parentWidth
        interactive.y = storeRatios[i].y * parentHeight
        }

        let navbarWidth = portrait ? windowWidth : 120;
        let navbarHeight = portrait ? 120 : windowHeight;
        let offset = !portrait ? windowWidth - 120 : 0 ;

        let navBarParams = {row: portrait, color:'green', width: navbarWidth, height:navbarHeight, offsetX:offset};
        let navBar = new Container(navBarParams);
        uiElements.push(navBar);

        for (let i = 0; i < 6; i++){
            let navBarButtonParams = {row: !portrait, color:'black', width:20, len:6, index: i, parent:navBar};
            let navBarButton = new Button(navBarButtonParams);
            uiElements.push(navBarButton);
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
