# p5.js UI Elements

This was a repo for a reimplemented Conway's Game of Life.

The [original repo](https://github.com/jamiejamiebobamie/Conway-sGameofLife) and the [live site](https://conways-colorful-game-of-life.herokuapp.com/?fbclid=IwAR27gNV-jaq5VefQAx24blCjSSOdYc4fzg0c6X-Ze98GpdRZJLe0cJh0SgQ) are the first bits of code that I produced when I just started learning to code and I was excited to refactor the project and add features.

As I coded, I realized that I needed dynamic UI elements for p5.js and the project morphed into recreating CSS Flexbox in p5.js.

p5.js is a successor to Processing.js, which is similar to the Canvas API. The Canvas API "provides a means for drawing graphics via JavaScript and the HTML <canvas> element."

I am still in the process of implementing features and functionality and will write a more detailed guide when I have finalized the project and officially released v1.

## For my professors:
I initially made commits to [this repo](https://github.com/jamiejamiebobamie/conways-GoL), which has a working example of the modifications that I made to Conways Game of Life.

## Getting Started
If you want to attempt to use the p5.js UI Elements in your own project, follow the steps below.
* Clone the repo locally:
```git clone git@github.com:jamiejamiebobamie/conway-gol.git```
* In your terminal, navigate to the main folder of the cloned repo.
* Include the javascript files in your HTML document:
```<script src="js/UI_Objects/UIElement.js"></script>```
```<script src="js/sketch-playground.js"></script>```
and the p5.js minified CDN link in the header of your HTML document:
```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>```
* Open the HTML document in the web browser of your choice.

## Working with the Library
* All UI elements inherit from the UIElement class, which accepts a parameter object as its sole parameter.
* When instantiating a class, you can pass in no parameters or a previously declared parameter object.
* A parameter object can have all or none of its fields filled in.
* Example parameter object:
```
let parameterObject = {
    offsetX: undefined,
    offsetY: undefined,
    parent: undefined,
    row: undefined,
    index: undefined,
    len: undefined,
    mouseClickfunc: undefined,
    mouseDragfunc: undefined,
    width: undefined,
    height: undefined,
    color: undefined,
};
```
* UIElements can be contained in UIElements, have a static orientation or a dynamic one, be part of a series, and have basic interactivity like mouseOver, click, and drag.

## Future Work
Before learning React.js, I made extensive use of p5.js in my coding projects and would like to refactor many of them, so expect future improvements and the possibility of a full-blown npm module.

## Authors

* **Jamie McCrory**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
