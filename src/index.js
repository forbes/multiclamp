class MultiClamp {
	/**
	 * Construct a MultiClamp object that can clamp text
	 * @param {HTMLElement} element the element that wraps the text to be truncated
	 * @param {number} numLines the max number of lines the text can fill
	 */
	constructor(element, numLines) {
		this.element = element;
		this.numLines = numLines;
		this.prevWidth = 0;
		this.prevHeight = 0;
		this.textCtx = false;

		this.LINE_CLAMP_RULES = {
			LINE_CLAMP: '-webkit-line-clamp',
			BOX: '-webkit-box',
			BOX_ORIENT: '-webkit-box-orient',
		};
	}

	/**
	 * Attempt to use webkit line clamp functionality. If it does not exist then fall back to
	 * javascript clamp implementation
	 */
	init() {
		if (this.LINE_CLAMP_RULES.LINE_CLAMP in document.body.style) {
			this.element.style.display = this.LINE_CLAMP_RULES.BOX;
			this.element.style[this.LINE_CLAMP_RULES.BOX_ORIENT] = 'vertical';
			this.element.style[this.LINE_CLAMP_RULES.LINE_CLAMP] = this.numLines;
		} else {
			const textCanvas = document.createElement('canvas');
			this.textCtx = textCanvas.getContext('2d');
			this.clamp();
			requestAnimationFrame(this.resize.bind(this));
		}
	}

	/**
	 * Element to be clamped must have the following styles:
	 * 	- `display` - either `block` or `inline-block`
	 *	- `line-height` - provide a value in pixels
	 *	- `max-height` OR `height` - should equal the value for `line-height` * number of lines
	 *	- `overflow: hidden;`
	 *	With these conditions overflow-y would indicate text that needs to be truncated. In this case caclulate
	 *	the width of the text using canvas api, truncate text and apply ellipsis to fit in container.
	 */
	clamp() {
		const {
			fontFamily,
			fontSize,
			fontWeight,
			lineHeight,
		} = getComputedStyle(this.element);

		const maxHeight = (parseInt(lineHeight, 10) || 0) * this.numLines;

		if (this.element.scrollHeight > maxHeight || this.element.dataset.fullText) {
			const text = this.element.dataset.fullText || this.element.innerText;
			const words = text.split(' ');
			const lineWidth = this.element.getBoundingClientRect().width;
			this.textCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
			let block = '';
			let i = 0;
			for (let j = 0; j < this.numLines - 1; j += 1) {
				let line = '';
				while (this.textCtx.measureText(`${line} ${words[i]}`).width < lineWidth && i < words.length - 1) {
					line = line === '' ? words[i] : `${line} ${words[i]}`;
					i += 1;
				}
				block = block === '' ? line : `${block} ${line}`;
			}
			let lastLine = text.slice(text.indexOf(words[i]));
			while (this.textCtx.measureText(`${lastLine}...`).width > lineWidth) {
				lastLine = lastLine.substring(0, lastLine.length - 1);
			}

			const clampedText = `${block} ${lastLine}`;
			if (clampedText === text) {
				this.element.innerText = text;
				if (this.element.dataset.fullText) {
					delete this.element.dataset.fullText;
				}
			} else {
				this.element.innerText = `${clampedText}...`;
				if (!this.element.dataset.fullText) {
					this.element.dataset.fullText = text;
				}
			}
		}
	}

	/**
	 * resize function will determine if the window size has changed, in which case the clamp may need to
	 * be recalculated
	 */
	resize() {
		const { width, height } = this.element.getBoundingClientRect();

		if (this.prevWidth !== width || this.prevHeight !== height) {
			this.clamp();
		}

		this.prevWidth = width;
		this.prevHeight = height;
		requestAnimationFrame(this.resize.bind(this));
	}
}

/**
 * muliclamp exposes package functionality to app consuming it
 * @param {HTMLElement} element the element containing the text to be clamped
 * @param {number} numLines the max number of lines the text can fill
 */
function multiclamp(element, numLines = 2) {
	const clampLines = numLines <= 0 ? 2 : numLines;
	const mc = new MultiClamp(element, clampLines);
	mc.init();
}

module.exports = multiclamp;
