
// button base class
class Button extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);

        // button-specific member variables
        this.buttonWidth = 20;
        this.buttonHeight = 20;
        this.mouseOver = false;
        this.borderRadius = 15;

        // testing
        this.mouseOverColor = 'pink';
        // the button orientation needs to be set to the opposite of
            // the orientation of the container
        // let tempRow = super.row // not working
        // this.row = !tempRow


        // the placement of the button on the canvas based on the orientation
            //  and the bounds of the container.
        if (this.row) {
            this.offsetX = this.widthOfParent/2.35
            this.offsetY = this.heightOfParent/this.len/2.35
        } else {
            this.offsetX = this.widthOfParent/this.len/2.35
            this.offsetY = this.heightOfParent/2.35
        }

        this.x = this.x + this.offsetX
        this.y = this.y + this.offsetY
        // console.log(this.x)
    }

    performClickFunctionality(){
        if (this.func) {
            this.func();
        }
    }

    testForClick(clickLocation) {
        if (clickLocation.x > this.x - this.borderRadius
            && clickLocation.x < this.x + this.borderRadius
            && clickLocation.y > this.y - this.borderRadius
            && clickLocation.y < this.borderRadius + this.y) {
            return true;
        }
    }

    testForMouseOver(mouseX, mouseY) {
        if (mouseX > this.x - this.borderRadius
            && mouseX < this.x + this.borderRadius
            && mouseY > this.y - this.borderRadius
            && mouseY < this.borderRadius + this.y)
        {
            return true
        } else {
            return false
        }
    }

    // p5.js built-in method
    mouseDragged() {}

    draw() {
        // not all buttons will change color on mouseover.
        if (this.testForMouseOver(mouseX, mouseY)) {
            fill(this.mouseOverColor);
        } else {
            fill(this.color);
        }
        // testing will delete.
        // subclasses will draw their own icons and i'll call super.draw()
         rect(this.x, this.y, this.buttonWidth, this.buttonHeight, this.borderRadius);
    }
}
