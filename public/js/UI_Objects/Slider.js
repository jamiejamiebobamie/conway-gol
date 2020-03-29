class Slider extends UIElement{
    constructor(parameterObject){
        super(parameterObject);
        // let index = parameterObject.index || 0;

        // button-specific member variables
        this.width = 20;
        this.height = 20;
        this.mouseOver = false;
        this.isDragging = false;
        // this.userDragButtonAmount = 0;

        // testing
        this.color = 'black';
        this.mouseOverColor = 'blue';

        // the placement of the button on the canvas based on the orientation
            //  and the bounds of the container.
        let widthOfContainer = this.parent ? this.parent.width : windowWidth;
        let heightOfContainer = this.parent ? this.parent.height : windowHeight;
        let userDragButton;
        console.log(parent)
        if (this.row){

            this.offset = widthOfContainer/10

            this.buttonX = userDragButton || this.offset + this.parent.x
            this.buttonY = heightOfContainer/(this.len*2) + this.index * heightOfContainer / this.len + this.parent.y

            this.sliderX = this.offset
            this.sliderY = this.buttonY

            this.sliderWidth = widthOfContainer - this.offset*2;
            this.sliderHeight = this.width/4;

        } else {

            this.offset = heightOfContainer/10

            this.buttonX = widthOfContainer/(this.len*2) + this.index * widthOfContainer / this.len + this.parent.x;
            this.buttonY = userDragButton | this.offset + this.parent.y;

            this.sliderX = this.buttonX
            this.sliderY = this.offset

            this.sliderWidth = this.width/4;
            this.sliderHeight = heightOfContainer - heightOfContainer/10 - this.offset;

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
        if (mouseX > this.buttonX - this.width/2
            && mouseX < this.buttonX + this.width/2
            && mouseY > this.buttonY - this.width/2
            && mouseY < this.width/2 + this.buttonY){
                return true
        } else {
            return false
        }
    }

    userDrag(){
        let portrait = true;
            if (this.row == portrait){
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
      rect(this.sliderX, this.sliderY, this.sliderWidth, this.sliderHeight, 0);

    // this should be top level.
    if (this.testForMouseOver(mouseX, mouseY)){
        fill(0,240,0)
        // stroke(0,0,230);
    } else {
        fill(240)
        // stroke(230);
    }
    ellipse(this.buttonX, this.buttonY, this.width);
    }

}
