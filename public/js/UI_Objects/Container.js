function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class Container{
    constructor(parameterObject){
        // button functionality on click
        this.nullFunction = () => "I do nothing!";
        let parameters = {
            offsetX: undefined,
            offsetY: undefined,
            widthOfParent: undefined,
            heightOfParent: undefined,
            row: undefined,
            index: undefined,
            len: undefined,
            func: this.nullFunction,
            width: undefined,
            height: undefined
        };

        if(parameterObject){
            parameters = parameterObject;
        }
        // destructuring my parameterObject and intializing tempVariables
        let {
            offsetX: offsetX,
            offsetY: offsetY,
            widthOfParent: widthOfParent,
            heightOfParent: heightOfParent,
            row: row,
            index: index,
            len: len,
            func: func,
            width: width,
            height: height
        } = parameters;

        // setting data members and member functions with the values from tempVariables
        this.widthOfParent = widthOfParent || windowWidth;
        this.heightOfParent = heightOfParent || windowHeight;
        this.row = row || windowWidth < windowHeight;
        this.index = index || 0;
        this.len = len || 1;
        this.func = func || null;

        if (this.row){
            this.width = width || this.widthOfParent;
            this.height = height || this.heightOfParent / this.len;

            this.offsetX = offsetX || 0;
            this.offsetY = offsetY || this.index * this.heightOfParent / this.len;
        } else {
            this.width = width || this.widthOfParent / this.len;
            this.height = height || this.heightOfParent;

            this.offsetX = offsetX || this.index * this.widthOfParent / this.len;
            this.offsetY = offsetY || 0;
        }
        this.randomColor = (getRandomInt(256))
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

    draw(){
        fill(this.randomColor);
        rect(this.offsetX,this.offsetY,this.width,this.height)
    }
}
