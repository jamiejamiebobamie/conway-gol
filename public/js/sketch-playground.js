
let canvas;
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

// p5.js built-in method
function draw () {
    background(200);
    for (let i = 0; i < containers.length; i++){
        containers[i].draw();
    }
}

function recreateCanvas(){

    // portrait or landscape orientation?
    let portrait = windowWidth < windowHeight;

    containers = []
    let length = 200;
    for (let i = 0; i < 3; i++){
        // constructor(offset, y, length, widthOfCanvas, heightOfCanvas, portrait, numberOfContainers, indexOfContainer){
        let param = new Parameters();
        console.log(param.getParameterList());
        container = new Container(windowWidth/2,length*i,undefined,windowWidth, windowHeight, portrait, 3, i)
        containers.push(container)
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
