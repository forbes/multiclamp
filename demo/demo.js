import multiClamp from '../src/index';

window.addEventListener('load', () => {
    const clampText = document.querySelector('.multi-clamp');
    multiClamp(clampText, 3);
});
