/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/index.js":
/*!***********************!*\
  !*** ./demo/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _src = __webpack_require__(/*! ../src */ "./src/index.js");

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
	var clampThis = document.querySelector('.multi-clamp');
	(0, _src2.default)(clampThis, 3);
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = multiclamp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiClamp = function () {
	function MultiClamp(element, numLines) {
		_classCallCheck(this, MultiClamp);

		this.element = element;
		this.numLines = numLines;
		this.prevWidth = 0;
		this.prevHeight = 0;
		this.textCtx = false;
	}

	_createClass(MultiClamp, [{
		key: 'init',
		value: function init() {
			if ('-webkit-line-clamp' in document.body.style) {
				this.element.style.display = '-webkit-box';
				this.element.style['-webkit-box-orient'] = 'vertical';
				this.element.style['-webkit-line-clamp'] = this.numLines;
			} else {
				var textCanvas = document.createElement('canvas');
				this.textCtx = textCanvas.getContext('2d');
				this.clamp();
				requestAnimationFrame(this.resize.bind(this));
			}
		}
	}, {
		key: 'clamp',
		value: function clamp() {
			var _getComputedStyle = getComputedStyle(this.element),
			    fontFamily = _getComputedStyle.fontFamily,
			    fontSize = _getComputedStyle.fontSize,
			    fontWeight = _getComputedStyle.fontWeight,
			    lineHeight = _getComputedStyle.lineHeight;

			var maxHeight = (parseInt(lineHeight, 10) || 0) * this.numLines;

			if (this.element.scrollHeight > maxHeight || this.element.dataset.fullText) {
				var text = this.element.dataset.fullText || this.element.innerText;
				var words = text.split(' ');
				var lineWidth = this.element.getBoundingClientRect().width;
				this.textCtx.font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
				var block = '';
				var i = 0;
				for (var j = 0; j < this.numLines - 1; j += 1) {
					var line = '';
					while (this.textCtx.measureText(line + ' ' + words[i]).width < lineWidth && i < words.length - 1) {
						line = line === '' ? words[i] : line + ' ' + words[i];
						i += 1;
					}
					block = block === '' ? line : block + ' ' + line;
				}
				var lastLine = text.slice(text.indexOf(words[i]));
				while (this.textCtx.measureText(lastLine + '...').width > lineWidth) {
					lastLine = lastLine.substring(0, lastLine.length - 1);
				}

				var clampedText = block + ' ' + lastLine;
				if (clampedText === text) {
					this.element.innerText = text;
					if (this.element.dataset.fullText) {
						delete this.element.dataset.fullText;
					}
				} else {
					this.element.innerText = clampedText + '...';
					if (!this.element.dataset.fullText) {
						this.element.dataset.fullText = text;
					}
				}
			}
		}
	}, {
		key: 'resize',
		value: function resize() {
			var _element$getBoundingC = this.element.getBoundingClientRect(),
			    width = _element$getBoundingC.width,
			    height = _element$getBoundingC.height;

			if (this.prevWidth !== width || this.prevHeight !== height) {
				this.clamp();
			}

			this.prevWidth = width;
			this.prevHeight = height;
			requestAnimationFrame(this.resize.bind(this));
		}
	}]);

	return MultiClamp;
}();

function multiclamp(element) {
	var numLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	var mc = new MultiClamp(element, numLines);
	mc.init();
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYW1wVGhpcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm11bHRpY2xhbXAiLCJNdWx0aUNsYW1wIiwiZWxlbWVudCIsIm51bUxpbmVzIiwicHJldldpZHRoIiwicHJldkhlaWdodCIsInRleHRDdHgiLCJib2R5Iiwic3R5bGUiLCJkaXNwbGF5IiwidGV4dENhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY2xhbXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXNpemUiLCJiaW5kIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwibWF4SGVpZ2h0IiwicGFyc2VJbnQiLCJzY3JvbGxIZWlnaHQiLCJkYXRhc2V0IiwiZnVsbFRleHQiLCJ0ZXh0IiwiaW5uZXJUZXh0Iiwid29yZHMiLCJzcGxpdCIsImxpbmVXaWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiZm9udCIsImJsb2NrIiwiaSIsImoiLCJsaW5lIiwibWVhc3VyZVRleHQiLCJsZW5ndGgiLCJsYXN0TGluZSIsInNsaWNlIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImNsYW1wZWRUZXh0IiwiaGVpZ2h0IiwibWMiLCJpbml0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NB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QUExQixFQUFvQztBQUNuQyxXQUFLeEIsT0FBTCxDQUFhdUIsT0FBYixDQUFxQkMsUUFBckIsR0FBZ0NDLElBQWhDO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7OzsyQkFFUTtBQUFBLCtCQUNrQixLQUFLekIsT0FBTCxDQUFhOEIscUJBQWIsRUFEbEI7QUFBQSxPQUNBQyxLQURBLHlCQUNBQSxLQURBO0FBQUEsT0FDT2EsTUFEUCx5QkFDT0EsTUFEUDs7QUFHUixPQUFJLEtBQUsxQyxTQUFMLEtBQW1CNkIsS0FBbkIsSUFBNEIsS0FBSzVCLFVBQUwsS0FBb0J5QyxNQUFwRCxFQUE0RDtBQUMzRCxTQUFLakMsS0FBTDtBQUNBOztBQUVELFFBQUtULFNBQUwsR0FBaUI2QixLQUFqQjtBQUNBLFFBQUs1QixVQUFMLEdBQWtCeUMsTUFBbEI7QUFDQWhDLHlCQUFzQixLQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUIsSUFBakIsQ0FBdEI7QUFDQTs7Ozs7O0FBR2EsU0FBU2hCLFVBQVQsQ0FBb0JFLE9BQXBCLEVBQTJDO0FBQUEsS0FBZEMsUUFBYyx1RUFBSCxDQUFHOztBQUN6RCxLQUFNNEMsS0FBSyxJQUFJOUMsVUFBSixDQUFlQyxPQUFmLEVBQXdCQyxRQUF4QixDQUFYO0FBQ0E0QyxJQUFHQyxJQUFIO0FBQ0EsQyIsImZpbGUiOiJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kZW1vL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IG11bHRpQ2xhbXAgZnJvbSAnLi4vc3JjJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG5cdGNvbnN0IGNsYW1wVGhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1jbGFtcCcpO1xuXHRtdWx0aUNsYW1wKGNsYW1wVGhpcywgMyk7XG59KTtcbiIsImNsYXNzIE11bHRpQ2xhbXAge1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBudW1MaW5lcykge1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5udW1MaW5lcyA9IG51bUxpbmVzO1xuXHRcdHRoaXMucHJldldpZHRoID0gMDtcblx0XHR0aGlzLnByZXZIZWlnaHQgPSAwO1xuXHRcdHRoaXMudGV4dEN0eCA9IGZhbHNlO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRpZiAoJy13ZWJraXQtbGluZS1jbGFtcCcgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSkge1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnLXdlYmtpdC1ib3gnO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlWyctd2Via2l0LWJveC1vcmllbnQnXSA9ICd2ZXJ0aWNhbCc7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGVbJy13ZWJraXQtbGluZS1jbGFtcCddID0gdGhpcy5udW1MaW5lcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgdGV4dENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHRcdFx0dGhpcy50ZXh0Q3R4ID0gdGV4dENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdFx0dGhpcy5jbGFtcCgpO1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGNsYW1wKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGZvbnRGYW1pbHksXG5cdFx0XHRmb250U2l6ZSxcblx0XHRcdGZvbnRXZWlnaHQsXG5cdFx0XHRsaW5lSGVpZ2h0LFxuXHRcdH0gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCk7XG5cblx0XHRjb25zdCBtYXhIZWlnaHQgPSAocGFyc2VJbnQobGluZUhlaWdodCwgMTApIHx8IDApICogdGhpcy5udW1MaW5lcztcblxuXHRcdGlmICh0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gbWF4SGVpZ2h0IHx8IHRoaXMuZWxlbWVudC5kYXRhc2V0LmZ1bGxUZXh0KSB7XG5cdFx0XHRjb25zdCB0ZXh0ID0gdGhpcy5lbGVtZW50LmRhdGFzZXQuZnVsbFRleHQgfHwgdGhpcy5lbGVtZW50LmlubmVyVGV4dDtcblx0XHRcdGNvbnN0IHdvcmRzID0gdGV4dC5zcGxpdCgnICcpO1xuXHRcdFx0Y29uc3QgbGluZVdpZHRoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXHRcdFx0dGhpcy50ZXh0Q3R4LmZvbnQgPSBgJHtmb250V2VpZ2h0fSAke2ZvbnRTaXplfSAke2ZvbnRGYW1pbHl9YDtcblx0XHRcdGxldCBibG9jayA9ICcnO1xuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bUxpbmVzIC0gMTsgaiArPSAxKSB7XG5cdFx0XHRcdGxldCBsaW5lID0gJyc7XG5cdFx0XHRcdHdoaWxlICh0aGlzLnRleHRDdHgubWVhc3VyZVRleHQoYCR7bGluZX0gJHt3b3Jkc1tpXX1gKS53aWR0aCA8IGxpbmVXaWR0aCAmJiBpIDwgd29yZHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdGxpbmUgPSBsaW5lID09PSAnJyA/IHdvcmRzW2ldIDogYCR7bGluZX0gJHt3b3Jkc1tpXX1gO1xuXHRcdFx0XHRcdGkgKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRibG9jayA9IGJsb2NrID09PSAnJyA/IGxpbmUgOiBgJHtibG9ja30gJHtsaW5lfWA7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbGFzdExpbmUgPSB0ZXh0LnNsaWNlKHRleHQuaW5kZXhPZih3b3Jkc1tpXSkpO1xuXHRcdFx0d2hpbGUgKHRoaXMudGV4dEN0eC5tZWFzdXJlVGV4dChgJHtsYXN0TGluZX0uLi5gKS53aWR0aCA+IGxpbmVXaWR0aCkge1xuXHRcdFx0XHRsYXN0TGluZSA9IGxhc3RMaW5lLnN1YnN0cmluZygwLCBsYXN0TGluZS5sZW5ndGggLSAxKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY2xhbXBlZFRleHQgPSBgJHtibG9ja30gJHtsYXN0TGluZX1gO1xuXHRcdFx0aWYgKGNsYW1wZWRUZXh0ID09PSB0ZXh0KSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0O1xuXHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LmRhdGFzZXQuZnVsbFRleHQpIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGFzZXQuZnVsbFRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBgJHtjbGFtcGVkVGV4dH0uLi5gO1xuXHRcdFx0XHRpZiAoIXRoaXMuZWxlbWVudC5kYXRhc2V0LmZ1bGxUZXh0KSB7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmRhdGFzZXQuZnVsbFRleHQgPSB0ZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplKCkge1xuXHRcdGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0aWYgKHRoaXMucHJldldpZHRoICE9PSB3aWR0aCB8fCB0aGlzLnByZXZIZWlnaHQgIT09IGhlaWdodCkge1xuXHRcdFx0dGhpcy5jbGFtcCgpO1xuXHRcdH1cblxuXHRcdHRoaXMucHJldldpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5wcmV2SGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtdWx0aWNsYW1wKGVsZW1lbnQsIG51bUxpbmVzID0gMikge1xuXHRjb25zdCBtYyA9IG5ldyBNdWx0aUNsYW1wKGVsZW1lbnQsIG51bUxpbmVzKTtcblx0bWMuaW5pdCgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==