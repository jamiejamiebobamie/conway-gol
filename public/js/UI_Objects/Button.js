
// button base class
class Button extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);

        this.width = 20;
        this.mouseOver = false;
        this.mouseOverColor = 'pink'; // testing

        if (!this.row) {
            this.offsetX = this.parent.width/this.len/2;
            this.offsetY = this.parent.height/2;
        } else {
            this.offsetX = this.parent.width/2;
            this.offsetY = this.parent.height/this.len/2;
        }
        this.x += this.offsetX;
        this.y += this.offsetY;
    }

    performClickFunctionality(){
        if (this.func) {
            this.func();
        }
    }

    testForClick(clickLocation) {
        if (clickLocation.x > this.x - this.width
            && clickLocation.x < this.x + this.width
            && clickLocation.y > this.y - this.width
            && clickLocation.y < this.width + this.y) {
            return true;
        }
    }

    testForMouseOver(mouseX, mouseY) {
        if (mouseX > this.x - this.width
            && mouseX < this.x + this.width
            && mouseY > this.y - this.width
            && mouseY < this.width + this.y)
        {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        // this.testForMouseOver(mouseX, mouseY) ? fill(this.mouseOverColor) : fill(this.color);
        ellipse(this.x, this.y, this.width)
    }
}
