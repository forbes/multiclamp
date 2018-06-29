# multiclamp

A small, performant utility for truncating multiple lines of text in a single DOM element.

* [Usage](#usage)
* [Dev Requirements](#dev-requirements)
* [Installation](#installation)
* [Development](#development)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Dev Requirements
- [Node](https://nodejs.org/en/)

## Installation
`npm install`

## Usage
Import the multiClamp function from node_modules and pass the element that contains the text that should be truncated along with the number of lines. If no number of lines is provided it will default to 2.
```
import multiClamp from 'multiClamp';

window.addEventListener('load', () => {
    const el = document.querySelector('#clamp-this');
    multiClamp(el, 3);
});
```

### Requirements
The element provided must be the DOM node containing the text to be truncated (no support for nested elements). Also, the styling for the element must include the following:
- `display` - either `block` or `inline-block`
- `line-height` - provide a value
- `max-height` OR `height` - should equal the value for `line-height` * number of lines
- `overflow: hidden;`

## Development
Webpack dev server is used to bundle and reload a local server with demo project.

To start the server:
`npm run start`

Assuming you have no errors, you should be able to see demo page your local host (http://127.0.0.1:8080/).

Making changes to the source file `src/index.js` or the demo file `demo/demo.js` will trigger a bundle and reload of the page.

## Additional Information
The function will attempt to use the css property `-webkit-line-clamp` if supported by the browser. If not it will fall back to a javascript implementation that relies on the HTML canvas api for calculating text widths and `requestAnimationFrame()` for recalculation on window resize, both of which are widely supported by most browsers and relatively performant compared to other javascript implementations. For details on browser support see [Canvas Browser Support](https://caniuse.com/#feat=canvas) and [requestAnimationFrame() Support](https://caniuse.com/#feat=canvas).

## Contributors
* **Aaron Romel** - aromel@forbes.com
