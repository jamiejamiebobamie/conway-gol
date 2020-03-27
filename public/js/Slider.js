
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

        this.userDragButtonX = 0;
        this.userDragButtonY = 0;

        // the placement of the button on the canvas based on the orientation
            //  and the bounds of the container.
        if (this.orientation){

            this.offset = widthOfContainer/10

            console.log( widthOfContainer,heightOfContainer, this.offset)

            this.buttonX = this.offset;
            this.buttonY = this.offset + index * heightOfContainer / lenSliders + this.userDragButtonY;

            this.sliderX = this.buttonX
            this.sliderY = this.buttonY + this.buttonHeight/2.6

            this.sliderWidth = widthOfContainer - this.offset*2;
            this.sliderHeight = this.buttonWidth/4;

            this.userDragButtonX = userDragButton;

        } else {


            this.offset = heightOfContainer/10
            console.log( widthOfContainer,heightOfContainer, this.offset)


            this.buttonX = index * widthOfContainer / lenSliders + (widthOfContainer/(lenSliders*2)) + this.userDragButtonX;
            this.buttonY = this.offset;

            this.sliderX = this.buttonX + this.buttonWidth/2.6
            this.sliderY = this.buttonY

            this.sliderWidth = this.buttonWidth/4;
            this.sliderHeight = heightOfContainer - heightOfContainer/10 - this.offset;

            this.userDragButtonY = userDragButton;

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
        if (clickLocation.x > this.x - this.borderRadius
            && clickLocation.x < this.x + this.borderRadius
            && clickLocation.y > this.y - this.borderRadius
            && clickLocation.y < this.borderRadius + this.y){
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
            this.userDragButton += mouseX
        } else {
            this.userDragButton += mouseY;
        }
    }

    // call this method and store the variable before
    //     calling the recreateCanvas method
    getUserDragButtonValue(){
        let portrait = true;
        if (this.orientation == portrait){
            return this.userDragButtonX
        } else {
            return this.userDragButtonY
        }
    }

    draw(){

        if (this.isDragging){
            userDrag();
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
    // rect(0,0,500,500)
    // console.log(this.buttonX,this.userDragButtonX , this.buttonY+this.userDragButtonY , this.buttonWidth, this.buttonHeight, this.borderRadius)
    rect(this.buttonX+this.userDragButtonX , this.buttonY+this.userDragButtonY , this.buttonWidth, this.buttonHeight, this.borderRadius);

      // rect(100*, 0, this.buttonWidth, this.buttonHeight, this.borderRadius);
    }

}
