// var someObject = { a: 1, b: 2, c: 3 }
// var { a: a, b: b, c: c } = someObject

class Parameters{
//offset, widthOfParent,heightOfParent, orientationOfScreen,index, lenOfSiblings,func,startingPosition,length
    constructor({
        offset= offset,
        widthOfParent= widthOfParent,
        heightOfParent= heightOfParent,
        orientationOfScreen= orientationOfScreen,
        index= index,
        lenOfSiblings= lenOfSiblings,
        func= func,
        startingPosition= startingPosition,
        length= length
        }){
            this.offset = offset || 0;
            this.widthOfParent = widthOfParent || windowWidth;
            this.heightOfParent = heightOfParent || windowHeight;
            this.portrait = orientationOfScreen || windowWidth < windowHeight
            this.index = index || 0;
            this.lenOfSiblings = lenOfSiblings || 1;
            this.func = func || null;
            this.startingPosition = startingPosition || 0;
            if (portrait){
                this.length = length || windowWidth / this.lenOfSiblings
            } else {
                this.length = length || windowHeight / this.lenOfSiblings
            }
        }
        getParameterList(){
            return "Named Parameters: offset, widthOfParent, heightOfParent, orientationOfScreen, index, lenOfSiblings, func, startingPosition, length"
        }

}
