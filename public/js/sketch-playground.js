let canvas;
let container;
let containers;

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

let x = 100
let y = 0
let testWidth = 500
let testHeight = 500

// p5.js built-in method
function draw () {
    background(200);
    rect(x, y, testWidth, testHeight)
    for (let i = 0; i < containers.length; i++){
        containers[i].draw();
    }

}

function recreateCanvas(){
    // portrait or landscape orientation?
    let portrait = windowWidth < windowHeight;
    // container = new Container(index=)
    containers = []
    // let length = 200;
    let param;
    for (let i = 0; i < 1; i++){
        // constructor(offset, y, length, widthOfCanvas, heightOfCanvas, portrait, numberOfContainers, indexOfContainer){
        param = {width:50, height: 50, widthOfParent: testWidth, eightOfParent: testHeight, len:3, index: 1, row:true, offsetX:x}
        container = new Container(param)
        containers.push(container)
        console.log(container.getParameterList())
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
