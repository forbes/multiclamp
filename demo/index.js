import multiclamp from '../src';

window.addEventListener('load', () => {
	const clampThis = document.querySelector('.multi-clamp');
	multiclamp(clampThis, 3);
});
