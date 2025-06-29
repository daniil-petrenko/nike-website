// ======================[ Counter ]======================

/* Enter attribute data-digits-counter in counter element,
	 in value you can enter duration time in ms,
	 example: data-digits-counter="3000"
*/

export default function componentCounter() {
	window.addEventListener("load", windowCounterLoad);

	function windowCounterLoad() {
		function digitsCountersInit(digitsCountersItems) {
			let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]');
			if (digitsCounters) {
				digitsCounters.forEach(digitsCounter => {
					digitsCounterAnimate(digitsCounter);
				});
			}
		}
		function digitsCounterAnimate(digitsCounter) {
			let startTimestamp = null;
			const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
			const startValue = parseInt(digitsCounter.innerHTML);
			const startPosition = 0;
			const step = (timestamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / duration, 1);
				digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};
			window.requestAnimationFrame(step);
		}
		digitsCountersInit();

		let options = {
			threshold: 0.3
		}
		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const targetElement = entry.target;
					const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
					if (digitsCountersItems.length) {
						digitsCountersInit(digitsCountersItems);
					}
					observer.unobserve(targetElement)
				}
			});
		}, options);

		let sections = document.querySelectorAll('.counter__section');
		if (sections.length) {
			sections.forEach(section => {
				observer.observe(section)
			});
		}
	}
}