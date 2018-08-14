import multiClamp from '../src';

window.addEventListener('load', () => {
	const clampThis = document.querySelector('.multi-clamp');
	multiClamp(clampThis, 3);
});
