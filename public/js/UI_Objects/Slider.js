
// button base class
class Slider extends UIElement {
    constructor(parameterObject){
        super(parameterObject);

        if (this.row){

            this.offset = this.widthOfParent/10

            this.buttonX = this.userDragButtonAmount || this.offset;
            this.buttonY = this.offset + this.index * this.heightOfParent / this.len;

            this.sliderX = this.offset
            this.sliderY = this.buttonY + this.buttonHeight/2.6

            this.sliderWidth = this.widthOfParent - this.offset*2;
            this.sliderHeight = this.buttonWidth/4;

        } else {

            this.offset = this.heightOfParent/10

            this.buttonX = this.index * this.widthOfParent / this.len + (this.widthOfParent/(this.len*2));
            this.buttonY = this.userDragButtonAmount | this.offset;

            this.sliderX = this.buttonX + this.buttonWidth/2.6
            this.sliderY = this.offset

            this.sliderWidth = this.buttonWidth/4;
            this.sliderHeight = this.heightOfParent - this.heightOfParent/10 - this.offset;
        }

        // button-specific member variables
        this.width = 20;
        this.height = 20;
        this.mouseOver = false;
        this.isDragging = false;
        this.userDragButtonAmount = 0;

        this.buttonWidth = 20;
        this.buttonHeight = 20;

        // testing
        this.borderRadius = 40;
        this.color = 'black';
        this.mouseOverColor = 'blue';
    }

    performClickFunctionality(){
        if (this.func){
            this.func();
        }
    }

    testForClick(clickLocation){
        if (mouseX > this.buttonX - this.borderRadius/2
            && mouseX < this.buttonX + this.borderRadius/2
            && mouseY > this.buttonY - this.borderRadius/2
            && mouseY < this.borderRadius/2 + this.buttonY){
            return true;
        }
    }

    testForMouseOver(mouseX, mouseY){
        if (mouseX > this.buttonX - this.borderRadius/2
            && mouseX < this.buttonX + this.borderRadius/2
            && mouseY > this.buttonY - this.borderRadius/2
            && mouseY < this.borderRadius/2 + this.buttonY){
                return true
        } else {
            return false
        }
    }

    userDrag(){
        let portrait = true;
            if (this.orientation == portrait){
                if ( this.offset < mouseX && mouseX < this.sliderWidth+this.offset){
                        this.buttonX = mouseX;
                }
            } else {
                if ( this.offset-5 < mouseY && mouseY < this.sliderHeight+this.offset){
                this.buttonY = mouseY;
            }
    }
}

    draw(){
        if (this.isDragging){
            this.userDrag();
        }

    // slider groove
      noStroke();
      fill(220)
      rect(this.sliderX, this.sliderY, this.sliderWidth, this.sliderHeight, 0);

    // slider button
    if (this.testForMouseOver(mouseX, mouseY)){
        fill(0,240,0)
        stroke(0,0,230);
    } else {
        fill(240)
        stroke(230);
    }
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, this.borderRadius);
    }

}
