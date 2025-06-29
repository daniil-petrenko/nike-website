export default function componentLoader() {
	let mask = document.querySelector('.mask');

	window.addEventListener('load', () => {
		mask.classList.add('hide-loader');
		setTimeout(() => {
			mask.remove();
		}, 600);
	});
}

