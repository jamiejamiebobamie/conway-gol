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
    canvas = createCanvas(windowWidth, windowHeight);
    recreateCanvas();
    canvas.parent('sketch-holder');

    // centers the canvas
    imageMode(CENTER);
}

// p5.js built-in method
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
    for (let i = 0; i < 4; i++){
        if (i%2){

            containerParameters = {
                // offsetX: windowWidth/2,
                // offsetY: windowHeight/2,
                // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                // heightOfParent: windowHeight/2,
                row: portrait,
                index: i,
                len: 4,
                color: 'red',
                // func: this.nullFunction,
                // width: 40,
                // height: 40
            }
            container = new Container(containerParameters)
            uiElements.push(container)

            for (let k = 0; k < 10; k++){
            buttonParameters = {
                // offsetX: windowWidth/2,
                // offsetY: windowHeight/2,
                // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
                // heightOfParent: windowHeight/2,
                row: !portrait,
                index: k,
                len: 10,
                color: 'green',
                parent: container,
                // func: this.nullFunction,
                // width: 10,
                // height: 10,
            }
            // button = new Button(buttonParameters)
            // uiElements.push(button)
    }

} else if (i != 3) {

    containerParameters = {
        // offsetX: windowWidth/2,
        // offsetY: windowHeight/2,
        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
        // heightOfParent: windowHeight/2,
        row: portrait,
        index: i,
        len: 4,
        color: 'red',
        name:"container"

        // func: this.nullFunction,
        // width: 40,
        // height: 40
    }
    container = new Container(containerParameters)
    uiElements.push(container)

    for (let k = 0; k < 2; k++){
    contParameters = {
        // offsetX: windowWidth/2,
        // offsetY: windowHeight/2,
        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
        // heightOfParent: windowHeight/2,
        row: !portrait,
        index: k,
        len: 2,
        color: 'green',
        parent: container,
        name:"cont"

        // func: this.nullFunction,
        // width: 10,
        // height: 10,
    }
    cont = new Container(contParameters)
    uiElements.push(cont)

    for (let j = 0; j < 2; j++){
    cParams = {
        // offsetX: windowWidth/2,
        // offsetY: windowHeight/2,
        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
        // heightOfParent: windowHeight/2,
        row: portrait,
        index: j,
        len: 2,
        color: 'blue',
        parent: cont,
        name:"cParams"
        // func: this.nullFunction,
        // width: 10,
        // height: 10,
    }
    c = new Container(cParams)
    uiElements.push(c)

    for (let l = 0; l < 2; l++){
    buttonParameters = {
        // offsetX: windowWidth/2,
        // offsetY: windowHeight/2,
        // widthOfParent: windowWidth/2, // this should be a pointer to a parent object
        // heightOfParent: windowHeight/2,
        row: !portrait,
        index: l,
        len: 2,
        color: 'blue',
        parent: c,
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
}
// console.log(uiElements)
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
