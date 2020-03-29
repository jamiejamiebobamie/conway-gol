function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class Container extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);
    }

    draw() {
        // testing to show the bounds of the container
        if(this.color){
            fill(this.color);
            // rect(50,50,50,50)
            rect(this.x,this.y,this.width,this.height)
        }
    }
}
