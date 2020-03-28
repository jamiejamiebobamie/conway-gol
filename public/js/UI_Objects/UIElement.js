function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class UIElement{
    constructor(parameterObject){

        this.nullFunction = () => "I do nothing!";

        // null parameterObject
        let parameters = {
            offsetX: undefined,
            offsetY: undefined,
            parent: undefined,
            row: undefined,
            index: undefined,
            len: undefined,
            func: this.nullFunction,
            width: undefined,
            height: undefined,
            color: undefined
        };

        // if there is a parameter object, set the 'parameters' variable
            // to point to it.
        if(parameterObject){
            parameters = parameterObject;
        }

        // destructuring parameterObject and intializing temporary variables
        let {
            offsetX: offsetX,
            offsetY: offsetY,
            parent: parent,
            row: row,
            index: index,
            len: len,
            func: func,
            width: width,
            height: height,
            color: color
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

        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;

        this.row = row != undefined ? row : windowWidth < windowHeight;
        this.index = index || 0;
        this.len = len || 1;
        this.func = func || null;
        this.color = color || undefined

        if (this.row){

            this.width = width || this.widthOfParent;
            this.height = height || this.heightOfParent / this.len;

            if (parent){
                this.x = this.offsetX + parent.x || parent.x;
                this.y = this.offsetY + parent.y || this.index * this.heightOfParent / this.len + parent.y;
            } else {
                this.x = this.offsetX || 0;
                this.y = this.offsetY || this.index * this.heightOfParent / this.len;
            }

        } else {

            this.width = width || this.widthOfParent / this.len;
            this.height = height || this.heightOfParent;

            if (parent){
                this.x = this.offsetX + parent.x || this.index * this.widthOfParent / this.len + parent.x;
                this.y = this.offsetY + parent.y || parent.y;
            } else {
                this.x = this.offsetX || this.index * this.widthOfParent / this.len;
                this.y = this.offsetY || 0;
            }
        }
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

}
