
// button base class
class Button extends UIElement{
    constructor(parameterObject){
        super(parameterObject);

        // button-specific member variables
        this.buttonWidth = 20;
        this.buttonHeight = 20;
        this.mouseOver = false;
        this.borderRadius = 15;

        // testing
        this.mouseOverColor = 'pink';
            console.log(this.offsetX)
        // the placement of the button on the canvas based on the orientation
            //  and the bounds of the container.
        if (this.row){
            this.offsetX = 10//this.widthOfParent/this.len
            this.offsetY = 10//this.heightOfParent.height/2
        } else {
            this.offsetX = 10//this.widthOfParent/2
            this.offsetY = 10//this.heightOfParent/this.len
        }

    }

    performClickFunctionality(){
        if (this.func){
            this.func();
        }
    }

    testForClick(clickLocation){
        if (clickLocation.x > this.x - this.borderRadius
            && clickLocation.x < this.x + this.borderRadius
            && clickLocation.y > this.y - this.borderRadius
            && clickLocation.y < this.borderRadius + this.y){
            return true;
        }
    }

    testForMouseOver(mouseX, mouseY){
        if (mouseX > this.x - this.borderRadius
            && mouseX < this.x + this.borderRadius
            && mouseY > this.y - this.borderRadius
            && mouseY < this.borderRadius + this.y){
                return true
        } else {
            return false
        }
    }

    // p5.js built-in method
    mouseDragged() {}

    draw(){
    // need to delay the check on this as well as abstract away the functionality.
        // not all buttons will change color on mouseover.
    if (this.testForMouseOver(mouseX, mouseY)){
        fill(this.mouseOverColor);
    } else {
        fill(this.color);
    }
      rect(this.x+this.offsetX, this.y+this.offsetY, this.buttonWidth, this.buttonHeight, this.borderRadius);
    }
}
