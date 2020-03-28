
// button base class
class Button {
    constructor(parameterObject){

        this.nullFunction = () => "I do nothing!";

        // null parameterObject
        let parameters = {
            offsetX: undefined,
            offsetY: undefined,
            parent: undefined,
            // widthOfParent: undefined, // this should be a pointer to a parent object
            // heightOfParent: undefined,
            row: undefined,
            index: undefined,
            len: undefined,
            func: this.nullFunction,
            width: undefined,
            height: undefined
        };

        // if there is a parameter object, set the 'parameters' variable
            // to point to it.
            // (this was the best way I found to avoid issues
            //      if no object is passed in.)
        if(parameterObject){
            parameters = parameterObject;
        }

        // destructuring my parameterObject and intializing temporary variables
        let {
            offsetX: offsetX,
            offsetY: offsetY,
            parent: parent,
            // widthOfParent: widthOfParent,
            // heightOfParent: heightOfParent,
            row: row,
            index: index,
            len: len,
            func: func,
            width: width,
            height: height
        } = parameters;

        // setting data members and member functions
            // with the values from 'parameter' variables

        // this.widthOfParent = parent.width || windowWidth;
        // this.heightOfParent = parent.height || windowHeight;
        if (parent){
            this.widthOfParent = parent.width;
            this.heightOfParent = parent.height;
        } else {
            this.widthOfParent = windowWidth;
            this.heightOfParent = windowHeight;
        }
        // this.widthOfParent = widthOfParent || windowWidth;
        // this.heightOfParent = heightOfParent || windowHeight;
        this.row = row || windowWidth < windowHeight;
        this.index = index || 0;
        this.len = len || 1;
        this.func = func || null;

        // button-specific member variables
        this.width = width || 20;
        this.height = height || 20;
        this.mouseOver = false;

        // testing
        this.borderRadius = 40;
        this.color = 'black';
        this.mouseOverColor = 'blue';

        // the placement of the button on the canvas based on the orientation
            // and the bounds of its container and its index relative to
            // other items in the container.
        // if (this.row){
        //     this.offsetX = offsetX || this.index * this.widthOfParent / this.len + (this.widthOfParent/(this.len*2));
        //     this.offsetY = offsetY || this.heightOfParent - (this.heightOfParent / 2);
        // } else {
        //     this.offsetX = offsetX || this.widthOfParent / 2;
        //     this.offsetY = offsetY || this.index * this.heightOfParent / this.len + (this.heightOfParent/(this.len*2));
        // }

        if (this.row){
            if (parent){
                this.offsetX = offsetX + parent.offsetX || this.index * this.widthOfParent / this.len + (this.widthOfParent/(this.len*2));
                this.offsetY = offsetY + parent.offsetY || this.heightOfParent - (this.heightOfParent / 2);
                console.log('parent,row')
            } else {
                this.offsetX = offsetX || this.index * this.widthOfParent / this.len + (this.widthOfParent/(this.len*2));
                this.offsetY = offsetY || this.heightOfParent - (this.heightOfParent / 2);
                console.log('no_parent,row')

            }
        } else {
            if (parent){
                this.offsetX = offsetX + parent.offsetX || this.widthOfParent / 2;
                this.offsetY = offsetY + parent.offsetY || this.index * this.heightOfParent / this.len + (this.heightOfParent/(this.len*2));
                console.log('parent,col')

            } else {
                this.offsetX = offsetX || this.widthOfParent / 2;
                this.offsetY = offsetY || this.index * this.heightOfParent / this.len + (this.heightOfParent/(this.len*2));
                console.log('no_parent,col')

            }
        }
        console.log('hi', this.offsetX,this.offsetY, parent.offsetX)

    }

    performClickFunctionality(){
        if (this.func){
            this.func();
        }
    }

    testForClick(clickLocation){
        if (clickLocation.x > this.offsetX - this.borderRadius
            && clickLocation.x < this.offsetX + this.borderRadius
            && clickLocation.y > this.offsetY - this.borderRadius
            && clickLocation.y < this.borderRadius + this.offsetY){
            return true;
        }
    }

    testForMouseOver(mouseX, mouseY){
        if (mouseX > this.offsetX - this.borderRadius
            && mouseX < this.offsetX + this.borderRadius
            && mouseY > this.offsetY - this.borderRadius
            && mouseY < this.borderRadius + this.offsetY){
                return true
        } else {
            return false
        }
    }

    // p5.js built-in method
    mouseDragged() {
    }

    draw(){
    // need to delay the check on this as well as abstract away the functionality.
        // not all buttons will change color on mouseover.
    if (this.testForMouseOver(mouseX, mouseY)){
        fill(this.mouseOverColor);
    } else {
        fill(this.color);
    }
      noStroke();
      rect(this.offsetX, this.offsetY, this.width, this.height, this.borderRadius);
    }
}
