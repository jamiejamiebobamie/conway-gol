function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class Container{
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

        if (parent){
            this.widthOfParent = parent.width;
            this.heightOfParent = parent.height;
        } else {
            this.widthOfParent = windowWidth;
            this.heightOfParent = windowHeight;
        }
        this.row = row || windowWidth < windowHeight;
        this.index = index || 0;
        this.len = len || 1;
        this.func = func || null;

        if (this.row){

            this.width = width || this.widthOfParent;
            this.height = height || this.heightOfParent / this.len;

            if (parent){
                this.offsetX = offsetX + parent.offsetX || parent.offsetX;
                this.offsetY = offsetY + parent.offsetY || this.index * this.heightOfParent / this.len + parent.offsetY;
            } else {
                this.offsetX = offsetX || 0;
                this.offsetY = offsetY || this.index * this.heightOfParent / this.len;
            }

        } else {

            this.width = width || this.widthOfParent / this.len;
            this.height = height || this.heightOfParent;

            if (parent){
                this.offsetX = offsetX + parent.offsetX || this.index * this.widthOfParent / this.len + parent.offsetX;
                this.offsetY = offsetY + parent.offsetY || parent.offsetY;
            } else {
                this.offsetX = offsetX || this.index * this.widthOfParent / this.len;
                this.offsetY = offsetY || 0;
            }

        }
        this.randomColor = (getRandomInt(256))
        console.log(this.offsetX)
    }

    // recreate(widthOfCanvas, heightOfCanvas){
    //     if (this.row){
    //         this.height = height || this.widthOfParent / this.len;
    //         this.width = width || this.heightOfParent / this.len;
    //
    //         this.offset = offset || this.index * this.widthOfParent / this.len;
    //     } else {
    //         this.height = height || this.widthOfParent / this.len;
    //         this.width = width || this.heightOfParent / this.len;
    //
    //         this.offset = offset || this.index * this.heightOfParent / this.len;
    //     }
    // }

    getParameterList(){
         let parameters = {
            offsetX: "the offset of the container's left corner along the X-axis. if none, index * windowWidth / len",
            offsetY: "the offset of the container's left corner along the Y-axis. if none, index * windowHeight / len",
            widthOfParent: "the width of the parent container, if none, the windowWidth of the canvas",
            heightOfParent: "the height of the parent container, if none, the windowHeight of the canvas",
            orientation: "the orientation of the container: row or column, if none, windowWidth < windowHeight of the canvas",
            index: "the index of the container in the parent object, if none, 0",
            len: "the number of siblings contained in the parent container. if none, 1.",
            func: "a wildcard function. if none, nullFunction.",
            width: "the width of the container. if none, the windowWidth / len.",
            height: "the height of the container. if none, the windowHeight / len.",
        };
        console.log(this.nullFunction())
        return parameters
    }

    // container-specific methods
    getOffsetX(){
        return this.offsetX
    }
    getOffsetY(){
        return this.offsetY
    }

    draw(){
        // testing to show the bounds of the container
        fill(this.randomColor);
        // stroke(this.randomColor)
        rect(this.offsetX,this.offsetY,this.width,this.height)
    }
}
