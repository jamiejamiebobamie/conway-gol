let canvas;
let button;
let buttons;
let sliders;
let container;
let containers;
let innerContainers;
let portrait;
let uiElements;

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
    for (let i = 0 ; i < uiElements.length; i++){
            uiElements[i].draw();
    }
}

function recreateCanvas(){
    portrait = windowWidth < windowHeight;

    uiElements = []
    for (let i = 0; i < 2; i++){
        containerParameters = {
            // offsetX: windowWidth/2,
            // offsetY: windowHeight/2,
            // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
            // heightOfParent: windowHeight/2,
            row: true,
            index: i,
            len: 2,
            color: 'red',
            // func: this.nullFunction,
            // width: 40,
            // height: 40
        }
        container = new Container(containerParameters)
        uiElements.push(container)

        for (let j = 0; j < 3; j++){
                if (j%2){
                innerContainerParameters = {
                    // offsetX: windowWidth/2,
                    // offsetY: windowHeight/2,
                    // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                    // heightOfParent: windowHeight/2,
                    row: false,
                    index: j,
                    len: 3,
                    parent: container,
                    color: 'purple',
                    // func: this.nullFunction,
                    // width: 40,
                    // height: 40
                }
            } else {
                    innerContainerParameters = {
                        // offsetX: windowWidth/2,
                        // offsetY: windowHeight/2,
                        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                        // heightOfParent: windowHeight/2,
                        row: false,
                        index: j,
                        len: 3,
                        parent: container,
                        color: 'yellow',
                        // func: this.nullFunction,
                        // width: 40,
                        // height: 40
                    }
                }
                innerContainer = new Container(innerContainerParameters)
                uiElements.push(innerContainer)
                if (j%2){
                    for (let k = 0; k < 3; k++){
                    buttonParameters = {
                        // offsetX: windowWidth/2,
                        // offsetY: windowHeight/2,
                        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                        // heightOfParent: windowHeight/2,
                        row: portrait,
                        index: k,
                        len: 5,
                        parent: innerContainer,
                        color: 'green',
                        // func: this.nullFunction,
                        // width: 10,
                        // height: 10,
                    }
                    button = new Button(buttonParameters)
                    uiElements.push(button)
                    }
                }
            }
        }
    console.log(uiElements)
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
