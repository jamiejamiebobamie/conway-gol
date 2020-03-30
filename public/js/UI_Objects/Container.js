class Container extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);
        this.isDragging = false;
        this.hasBeenDragged = false;
        this.dragOffsetX = undefined;
        this.dragOffsetY = undefined;

        // the x and y coordinates of all UI elements are anchored at the top left
            // corner.
            // when clicked, the element needs to take this into account.
        if (!this.hasBeenDragged){
            this.draggedX = undefined
            this.draggedY = undefined
            this.ratioX = 1
            this.ratioY = 1
        } else {
            this.x = this.draggedX * windowWidth/this.ratioX
            this.y = this.draggedY * windowHeight/this.ratioY
        }
    }

    // containers can have interactivity
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

    // containers can be clicked
    testForClick(clickLocation){
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height){
            return true;
        }
    }

    // subclasses implement click behavior
    performClickFunctionality(){}

    // containers can be dragged to change their position
    userDrag(){
        if (this.dragOffsetX == undefined){
            this.dragOffsetX = this.x - mouseX;
            this.dragOffsetY = this.y - mouseY;
        }
        this.x = mouseX + this.dragOffsetX;
        this.y = mouseY + this.dragOffsetY;
        this.draggedX = this.x
        this.draggedY = this.y
        this.ratioX = this.x/windowWidth
        this.ratioY = this.y/windowHeight
        this.hasBeenDragged = true;
    }

    performValuesResetAfterDrag(){
        this.dragOffsetX = undefined;
        this.dragOffsetY = undefined;
    }

    draw() {
        if (this.isDragging){
            this.userDrag();
        }

        // testing to show the bounds of the container
        if(this.color){
            fill(this.color);
            rect(this.x,this.y,this.width,this.height)
        }
    }
}
