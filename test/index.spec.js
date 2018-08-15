import multiclamp from '../src/index';

const clampElement = document.createElement('p');
clampElement.innerText = `
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
		dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	`;
clampElement.style.lineHeight = '24px';
clampElement.style.maxHeight = '72px';
clampElement.style.overflow = 'hidden';
clampElement.style.maxWidth = '500px';

const nonClampElement = document.createElement('p');
nonClampElement.innerText = 'Short';
nonClampElement.style.lineHeight = '24px';
nonClampElement.style.maxHeight = '72px';
nonClampElement.style.overflow = 'hidden';
nonClampElement.style.maxWidth = '500px';

describe('webkit initialization', () => {
	beforeEach(() => {
		document.body.style['-webkit-line-clamp'] = 0;
	});

	test('adds webkit line clamp styles if possible', () => {
		multiclamp(clampElement, 3);

		expect(clampElement.style.display).toBe('-webkit-box');
		expect(clampElement.style['-webkit-box-orient']).toBe('vertical');
		expect(clampElement.style['-webkit-line-clamp']).toBe(3);
	});

	test('defaults to 2 lines if no number is provided', () => {
		multiclamp(clampElement);
		expect(clampElement.style['-webkit-line-clamp']).toBe(2);
	});

	test('defaults to 2 lines if zero is provided', () => {
		multiclamp(clampElement, 0);
		expect(clampElement.style['-webkit-line-clamp']).toBe(2);
	});

	test('defaults to 2 lines if negative number is provided', () => {
		multiclamp(clampElement, -3);
		expect(clampElement.style['-webkit-line-clamp']).toBe(2);
	});
});

describe('canvas initialization', () => {
	const getContextSpy = jasmine.createSpy('getContext');
	const mockCanvas = {
		getContext: getContextSpy,
	};

	beforeEach(() => {
		delete document.body.style['-webkit-line-clamp'];
		spyOn(document, 'createElement').and.returnValue(mockCanvas);
	});

	test('canvas element is created', () => {
		multiclamp(clampElement, 3);
		expect(document.createElement).toHaveBeenCalledWith('canvas');
		expect(getContextSpy).toHaveBeenCalledWith('2d');
	});

	test('requestAnimationFrame is called', () => {
		spyOn(window, 'requestAnimationFrame');
		multiclamp(clampElement, 3);
		expect(window.requestAnimationFrame).toHaveBeenCalledWith(jasmine.any(Function));
	});
});
