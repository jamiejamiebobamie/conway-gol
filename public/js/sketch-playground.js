let canvas;
let button;
let buttons;
let container;
let containers;
let portrait;

// constants that control the size of the p5.js canvas
let canvasDivisorWidth = 15;
let canvasDivisorHeight = 5;

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
    background(200);
    container.draw();
    for (let i = 0; i < buttons.length; i++){
        buttons[i].draw();
    }

}

function recreateCanvas(){
    portrait = windowWidth < windowHeight;

    containerParameters = {
        // offsetX: windowWidth/2,
        // offsetY: windowHeight/2,
        widthOfParent: windowWidth/2, // this should be a pointer to a parent object
        heightOfParent: windowHeight/2,
        row: portrait,
        index: 2,
        len: 5,
        // func: this.nullFunction,
        // width: 40,
        // height: 40
    };

    container = new Container(containerParameters)

    buttons = []
    for (let i = 0; i < 5; i++){
        buttonParameters = {
            // offsetX: windowWidth/2,
            // offsetY: windowHeight/2,
            // widthOfParent: windowWidth, // this should be a pointer to a parent object
            // heightOfParent: windowHeight,
            row: portrait,
            index: i,
            len: 5,
            parent: container,
            // func: this.nullFunction,
            // width: 40,
            // height: 40
        };
        button = new Button(buttonParameters)
        buttons.push(button)
    }
    canvas = createCanvas(windowWidth, windowHeight);
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
