function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class Container{

    constructor(parameterObject){
        // destructuring my parameterObject and intializing tempVariables
        let {
            offset: offset,
            widthOfParent: widthOfParent,
            heightOfParent: heightOfParent,
            orientation: orientation,
            index: index,
            len: len,
            func: func,
            length: length
            } = parameterObject;

        // setting data members and member functions with the values from tempVariables
        this.offset = offset || 0;
        this.widthOfParent = widthOfParent || windowWidth;
        this.heightOfParent = heightOfParent || windowHeight;
        this.portrait = orientation || windowWidth < windowHeight;
        this.index = index || 0;
        this.len = len || 1;
        this.func = func || null;

        if (this.portrait){
            this.offset = offset || this.index * this.widthOfParent / this.len;
            this.length = length || this.widthOfParent / this.len;
        } else {
            this.offset = offset || this.index * this.heightOfParent / this.len;
            this.length = length || this.heightOfParent / this.len;
        }

        this.randomColor = (getRandomInt(256))
    }

    recreate(widthOfCanvas, heightOfCanvas){}

    draw(){
        fill(this.randomColor);
        if (this.portrait){
            rect(0,this.offset,this.width,this.length)
        }else{
            rect(this.offset, 0,this.length, this.width)
        }
    }

    getEndingY(){
        return this.offset + this.length;
    }
}

/*

ALL containers should...
    have a starting location on the canvas (where to begin):
        x (FIXED: 0)
        y
    have a width (FIXED: length of the canvas)
    have a length (how far down the canvas the container extends)
    have a draw() function to draw the items contained in the container
    have a method that returns where the container ends:
        startingLocation.y + length of container
    a method to recreateSelf() when the window is resized.

individual containers should...
    the snapshotContainer needs to extend its length with every snapshot
        and inform the canvas that the canvas needs to extend itself as well

what info to pass in?
    starting location:
        y
    container / bounds info:
        length


*/
