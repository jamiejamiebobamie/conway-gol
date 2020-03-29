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
            color: undefined,
        };

        if (parameterObject){
            parameters = parameterObject;
        }

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
            color: color,
        } = parameters;

        this.row = row != undefined ? row : windowWidth < windowHeight;
        this.index = index || 0;

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        this.len = len || 1;
        this.func = func || null;
        this.color = color || undefined

        if (row) {
            if (parent){
                this.parent = parent
                this.width = width || this.parent.width;
                this.height = height || this.parent.height / this.len;

                this.x = this.parent.x;
                this.y = index * this.parent.height / this.len + this.parent.y;

            } else {
                this.width = width || windowWidth;
                this.height = height || windowHeight / this.len;

                this.x = offsetX;
                this.y = offsetY || index * windowHeight / this.len;
            }

        } else {

            if (parent) {
                this.parent = parent
                this.width = width || this.parent.width / this.len;
                this.height = height || this.parent.height;

                this.x = index * this.parent.width / this.len + this.parent.x;
                this.y = this.parent.y;

            } else {

                this.width = width || windowWidth / this.len;
                this.height = height || windowHeight;

                this.x = offsetX || index * windowWidth / this.len;
                this.y = offsetY
            }
        }
    }

    recreate(){
        // for child in children:
            // child.recreate()
    }

    // p5.js built-in method
    mouseDragged() {}

    // abstract methods for subclasses
    performClickFunctionality(){}
    testForClick(clickLocation) {}
    testForMouseOver(mouseX, mouseY) {}

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
        return parameters
    }
}
