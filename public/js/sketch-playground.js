// the p5.js canvas
let canvas;

// let shape;
// let shapes = []
// let storeShapeData = []
//
// let oldFR = 1;
// let newFR = 1.0000000002;

let uiElements = [];
let sliderContainer;
let slider;
let getMouseX;

// left-eyelid
let dumbPose = {
        firstAnchorPoint:{x:55,y:109},
        firstControlPoint:{x:142,y:7},
        secondAnchorPoint:{x:243,y:54},
        secondControlPoint:{x:309,y:247}
    }
let smartPose = {
        firstAnchorPoint:{x:202,y:55},
        firstControlPoint:{x:202,y:55},
        secondAnchorPoint:{x:202,y:55},
        secondControlPoint:{x:202,y:55}
    }

    getMouseX = false;

// let increaseSize;

let brainPart;
let brainParts = []

function preload(){
    // dumb = loadImage('imgs/dumb923x667.png');
    // smart = loadImage('imgs/smart copy.png');
    // brain = loadImage('imgs/brain_base.png');
}

// p5.js built-in method
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    // parents the canvas to the DOM element 'sketch-holder'
    canvas.parent('sketch-holder');
    // centers the canvas
    imageMode(CENTER);
    frameRate(24);

    // draws the elements on the canvas
    redrawElements();



        // constructor(
        //             dumbPose_bezierCoords,
        //             smartPose_bezierCoords,
        //             translationCoords,
        //             color,
        //             stroke,
        //             blend){



    sliderContainerParams = {offsetX:300, offsetY:300, width: 300, height:100}
    sliderContainer = new Container(sliderContainerParams)
    uiElements.push(sliderContainer)
    sliderParams = {row:true, parent:sliderContainer}
    slider = new Slider(sliderParams)
    uiElements.push(slider)


}

// p5.js built-in method
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redrawElements();
    // image(brain, 0, 0);
    // image(dumb, 200, 90,323,233);
}

// p5.js built-in method
function draw () {
    background(230);

    // for (let i = 0; i < shapes.length; i++){
    //     shapes[i].draw()
    // }
    // if (increaseSize){
    //     oldFR = newFR;
    //     newFR = frameRate();
    //     let diff = oldFR - newFR
    //     diff *= diff
    //     shape.width += diff;
    // }


    if (getMouseX){
        blendAmount = mouseX/windowWidth
        for (let i = 0; i < brainParts.length; i++){
            brainParts[i].blend(blendAmount)
        }

    }

    for (let i = 0; i < uiElements.length; i++){
        uiElements[i].draw()
    }

    for (let i = 0; i < brainParts.length; i++){
        brainParts[i].draw()
    }
}

function redrawElements(){
    // shapes = []
    // for (let i =0; i < storeShapeData.length; i++){
    //     shape = new Shape(storeShapeData[i].x,storeShapeData[i].y,storeShapeData[i].width)
    //     shapes.push(shape)
    // }
    brainParts = []
    let brainPart = new BrainParts(dumbPose,smartPose)
    brainParts.push(brainPart)
    // image(brain, windowWidth/2, windowHeight/4);
}

// p5.js built-in method
// function mouseReleased() {
//     increaseSize = false
//     storeShapeData = []
//     for (let i =0; i < shapes.length; i++){
//         storeShapeData.push(shapes[i])
//     }
//     console.log(shapes, storeShapeData)
//     redrawElements();
//
// }

function mousePressed(){
    getMouseX = true;
}


// p5.js built-in method
function mouseReleased() {
    getMouseX = false;
}

class BrainParts{
    constructor(dumbPose_bezierCoords,
                smartPose_bezierCoords,
                translationCoords,
                color,
                stroke,
                blend){
    this.pose1 = dumbPose_bezierCoords;
    this.pose2 = smartPose_bezierCoords;
    this.translation = {x:0,y:0};
    this.fillColor = color || 0;
    this.stroke = stroke || true;
    let blendAmount = 0;

    this.firstAnchorPointX = (blendAmount * (this.pose2.firstAnchorPoint.x - this.pose1.firstAnchorPoint.x) + this.pose1.firstAnchorPoint.x)
    this.firstAnchorPointY = (blendAmount * (this.pose2.firstAnchorPoint.y - this.pose1.firstAnchorPoint.y) + this.pose1.firstAnchorPoint.y)

    this.firstControlPointX = (blendAmount * (this.pose2.firstControlPoint.x - this.pose1.firstControlPoint.x) + this.pose1.firstControlPoint.x)
    this.firstControlPointY = (blendAmount * (this.pose2.firstControlPoint.y - this.pose1.firstControlPoint.y) + this.pose1.firstControlPoint.y)

    this.secondAnchorPointX = (blendAmount * (this.pose2.secondAnchorPoint.x - this.pose1.secondAnchorPoint.x) + this.pose1.secondAnchorPoint.x)
    this.secondAnchorPointY = (blendAmount * (this.pose2.secondAnchorPoint.y - this.pose1.secondAnchorPoint.y) + this.pose1.secondAnchorPoint.y)

    this.secondControlPointX = (blendAmount * (this.pose2.secondControlPoint.x - this.pose1.secondControlPoint.x) + this.pose1.secondControlPoint.x)
    this.secondControlPointY = (blendAmount * (this.pose2.secondControlPoint.y - this.pose1.secondControlPoint.y) + this.pose1.secondControlPoint.y)
    console.log(this.firstAnchorPointX, this.firstAnchorPointY,
            this.firstControlPointX, this.firstControlPointY,
            this.secondAnchorPointX, this.secondAnchorPointY,
            this.secondControlPointX, this.secondControlPointY)
    }

    blend(blendAmount){
        this.firstAnchorPointX = (blendAmount * (this.pose2.firstAnchorPoint.x - this.pose1.firstAnchorPoint.x) + this.pose1.firstAnchorPoint.x)
        this.firstAnchorPointY = (blendAmount * (this.pose2.firstAnchorPoint.y - this.pose1.firstAnchorPoint.y) + this.pose1.firstAnchorPoint.y)

        this.firstControlPointX = (blendAmount * (this.pose2.firstControlPoint.x - this.pose1.firstControlPoint.x) + this.pose1.firstControlPoint.x)
        this.firstControlPointY = (blendAmount * (this.pose2.firstControlPoint.y - this.pose1.firstControlPoint.y) + this.pose1.firstControlPoint.y)

        this.secondAnchorPointX = (blendAmount * (this.pose2.secondAnchorPoint.x - this.pose1.secondAnchorPoint.x) + this.pose1.secondAnchorPoint.x)
        this.secondAnchorPointY = (blendAmount * (this.pose2.secondAnchorPoint.y - this.pose1.secondAnchorPoint.y) + this.pose1.secondAnchorPoint.y)

        this.secondControlPointX = (blendAmount * (this.pose2.secondControlPoint.x - this.pose1.secondControlPoint.x) + this.pose1.secondControlPoint.x)
        this.secondControlPointY = (blendAmount * (this.pose2.secondControlPoint.y - this.pose1.secondControlPoint.y) + this.pose1.secondControlPoint.y)
    }

    draw(){
        push();
        stroke(0)
        fill(0)
        translate(this.translation.x,this.translation.y)
        // scale();
        bezier(this.firstAnchorPointX, this.firstAnchorPointY,
                this.firstControlPointX, this.firstControlPointY,
                this.secondAnchorPointX, this.secondAnchorPointY,
                this.secondControlPointX, this.secondControlPointY)
        pop();
    }
}




// for getting the right bezier curves.
// https://editor.p5js.org/allison.parrish/sketches/H1QQ3Nt67
// textSize(12);
// text(pts[0], 4, height);
// text(pts[1], 4, height-10);
// text(pts[2], 4, height-20);
// text(pts[3], 4, height-30);


// rotate(PI / 3.0);
// rect(30, 20, 55, 20, 15, 10, 5);

// ellipse()
// ellipse(x, y, w, h,)
// x Number: x-coordinate of the ellipse.
// y Number: y-coordinate of the ellipse.
// w Number: width of the ellipse.
// h Number: height of the ellipse. (Optional)

class Shape{
    constructor(x,y,width,height){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    draw(){
        stroke(0);
        strokeWeight(1)
        noFill();
        ellipse(this.x,this.y,this.width)
    }
}

// function createEllipse(){
//     shape = new Shape(mouseX, mouseY,10)
//     shapes.push(shape)
// }
