// temporary. prototyping class constructor for ALL ui classes below.
class Parameters{
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
            this.startingPosition = startingPosition || this.index * this.widthOfParent / this.len;
            this.length = length || this.widthOfParent / this.len;
        } else {
            this.startingPosition = startingPosition || this.index * this.heightOfParent / this.len;
            this.length = length || this.heightOfParent / this.len;
        }
    }

    // example parameterObject
    getParameterList(){
        let parameterObject = {
            offset: 0,
            widthOfParent: 200,
            heightOfParent: 300,
            orientation: true,
            index: 0,
            len: 1,
            func: null,
            length: 200
        };
        return parameterObject;
    }
}
