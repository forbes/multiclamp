# multiclamp

A small, performant utility for truncating multiple lines of text in a single DOM element.

* [Usage](#usage)
* [Dev Requirements](#dev-requirements)
* [Development](#development)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Usage
Install via npm:
`npm install --save @forbesmedia/multiclamp`

Import the multiclamp function and pass the element that contains the text that should be truncated. Passing in a nested element may result in undesired behavior, the element passed should contain only text. If no element is provided the function will do nothing. The second argument is the number of lines to clamp the text to. If no number of lines is provided it will default to 2. The third argument is boolean for whether or not to recalculate the clampped text when the element resizes. This may cause the page to crash when a large number of elements are resized. The default value for the resize parameter is false if not provided.
```js
import multiclamp from '@forbesmedia/multiclamp';

window.addEventListener('load', () => {
    const el = document.querySelector('#clamp-this');
    multiclamp(el, 3, true);
});
```

If you don't have access to `import` you can include a minified version of the package as a script tag which will attach the `multiclamp` function to the window making it globally accessable. Ensure this script tag is included before any other javascript that will use the multiclamp function.

```html
<script type="text/javascript" src="node_modules/@forbesmedia/multiclamp/dist/multiclamp.min.js"></script>
```

### Requirements
The element provided must be the DOM node containing the text to be truncated (no support for nested elements). Also, the styling for the element must include the following:
- `display` - either `block` or `inline-block`
- `line-height` - provide a value in pixels
- `max-height` OR `height` - should equal the value for `line-height` * number of lines
- `overflow: hidden;`

## Dev Requirements
- [Node](https://nodejs.org/en/)

## Development
To install dependencies:
`npm install`

To watch code changes:
`npm run start`

Open the `index.html` file in browser. Making changes to the source files will trigger a build. Reload the page to see changes.

## Additional Information
The function will attempt to use the css property `-webkit-line-clamp` if supported by the browser. If not it will fall back to a javascript implementation that relies on the HTML canvas api for calculating text widths and `requestAnimationFrame()` to recalculate when the element resizes, both of which are widely supported by most browsers and relatively performant compared to other javascript implementations that rely on multiple re-layouts of the page. For details on browser support see [Canvas browser support](https://caniuse.com/#feat=canvas) and [requestAnimationFrame() browser support](https://caniuse.com/#feat=canvas).

## Contributors
* **Aaron Romel** - aromel@forbes.com
* **Joe Pietruch** - jpietruch@forbes.com

