
// button base class
class Slider {
    constructor(widthOfContainer, heightOfContainer, orientation, index, lenSliders, func, userDragButton){
        // True = row, False = column
        this.orientation = orientation;
        // the number of buttons in the container
        this.lenOfSlider = lenSliders;
        // index of this button
        this.index = index;

        this.buttonWidth = 20;
        this.buttonHeight = 20;
        this.borderRadius = 40;


        // the placement of the button on the canvas based on the orientation
            //  and the bounds of the container.
        if (this.orientation){

            this.offset = widthOfContainer/10

            this.buttonX = userDragButton || this.offset;
            this.buttonY = this.offset + index * heightOfContainer / lenSliders;

            this.sliderX = this.buttonX
            this.sliderY = this.buttonY + this.buttonHeight/2.6

            this.sliderWidth = widthOfContainer - this.offset*2;
            this.sliderHeight = this.buttonWidth/4;

        } else {

            this.offset = heightOfContainer/10

            this.buttonX = index * widthOfContainer / lenSliders + (widthOfContainer/(lenSliders*2));
            this.buttonY = userDragButton | this.offset;

            this.sliderX = this.buttonX + this.buttonWidth/2.6
            this.sliderY = this.buttonY

            this.sliderWidth = this.buttonWidth/4;
            this.sliderHeight = heightOfContainer - heightOfContainer/10 - this.offset;



        }

        this.mouseOver = false;
        this.color = 'black';
        this.mouseOverColor = 'blue';

        this.func = func;

        this.isDragging = false;
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

    // call this method and store the variable before
    //     calling the recreateCanvas method
    storeUserDragButtonValue(){
        let portrait = true;
        if (this.orientation == portrait){
            return this.buttonX
        } else {
            return this.buttonY
        }
    }

    // call this method on mouseReleased() to retrieve a float
        // that is proportional to the sliders range
    getScaledUserDragButtonValue(){
        let portrait = true;
        if (this.orientation == portrait){
            return this.buttonX/this.sliderWidth
        } else {
            return this.buttonY/this.sliderHeight
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
