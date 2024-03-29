let canvas;
let button;
let buttons;
let sliders;
// let container;
let containers;
let innerContainers;
let portrait;
let uiElements;

// constants that control the size of the p5.js canvas
let canvasDivisorWidth = 15;
let canvasDivisorHeight = 5;

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
    if (frameCount % 24 == 0 ) {
        console.log(frameRate())
    }
}

function redrawElements(){
    portrait = windowWidth < windowHeight;

    uiElements = []
    for (let i = 0; i < 2; i++){
            containerParameters = {
                // offsetX: windowWidth/2,
                // offsetY: windowHeight/2,
                // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                // heightOfParent: windowHeight/2,
                row: portrait,
                index: i,
                len: 2,
                color: i%2?'green':'red',
                // func: this.nullFunction,
                // width: 40,
                // height: 40
            }
            let container = new Container(containerParameters)
            uiElements.push(container)
            for (let j = 0; j< 5; j++){

            sliderParameters = {
                // offsetX: windowWidth/2,
                // offsetY: windowHeight/2,
                // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                // heightOfParent: windowHeight/2,
                // row: portrait,
                index: j,
                len: 5,
                color: 'blue',
                parent: container,
                // func: this.nullFunction,
                // width: 10,
                // height: 10,
            }
            let slider = new Slider(sliderParameters)
            uiElements.push(slider)
    // for (let j = 0; j < 3; j++){
    //         buttonParameters = {
    //             // offsetX: windowWidth/2,
    //             // offsetY: windowHeight/2,
    //             // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
    //             // heightOfParent: windowHeight/2,
    //             row: !portrait,
    //             index: j,
    //             len: 3,
    //             color: 'blue',
    //             parent: container,
    //             // func: this.nullFunction,
    //             // width: 10,
    //             // height: 10,
    //         }
    //         button = new Button(buttonParameters)
    //         uiElements.push(button)
    //     }
    }
}
    console.log(uiElements)
}

// button functionality on click
let nullFunction = () => "I do nothing!";

// p5.js built-in method
function mouseClicked() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
}

// p5.js built-in method
function mousePressed() {
    clickLocation = { 'x': mouseX, 'y' : mouseY };
}

// p5.js built-in method
function mouseReleased() {
    let value;
}
