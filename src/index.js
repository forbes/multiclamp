class MultiClamp {
  constructor(element, numLines) {
    this.element = element;
    this.numLines = numLines;
    this.prevWidth = 0;
    this.prevHeight = 0;
    this.textCtx = false;
  }

  init() {
    if ('-webkit-line-clamp' in document.body.style) {
      this.element.style.display = '-webkit-box';
      this.element.style['-webkit-box-orient'] = 'vertical';
      this.element.style['-webkit-line-clamp'] = this.numLines;
    } else {
      const textCanvas = document.createElement('canvas');
      this.textCtx = textCanvas.getContext('2d');
      this.clamp();
      requestAnimationFrame(this.resize.bind(this));
    }
  }

  clamp() {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    } = getComputedStyle(this.element);
    let maxHeight = 0;

    maxHeight = (parseInt(lineHeight, 10) || 0) * this.numLines;

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

  resize() {
    const { width } = this.element.getBoundingClientRect();
    const { height } = this.element.getBoundingClientRect();

    if (this.prevWidth !== width || this.prevHeight !== height) {
      this.clamp();
    }

    this.prevWidth = width;
    this.prevHeight = height;
    requestAnimationFrame(this.resize.bind(this));
  }
}

export default function multiClamp(element, numLines = 2) {
  const mc = new MultiClamp(element, numLines);
  mc.init();
}
