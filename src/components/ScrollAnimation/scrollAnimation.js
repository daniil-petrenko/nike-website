// export default function scrollAnimation() {
// 	let animItems = document.querySelectorAll('._anim-items');

// 	if (animItems.length > 0) {
// 		window.addEventListener('scroll', animOnScroll);
// 		function animOnScroll(params) {
// 			for (let index = 0; index < animItems.length; index++) {
// 				const animItem = animItems[index];
// 				const animItemHeight = animItem.offsetHeight;
// 				const animItemOffset = offset(animItem).top;
// 				const animStart = 4;

// 				let animItemPoint = window.innerHeight - animItemHeight / animStart;

// 				if (animItemHeight > window.innerHeight) {
// 					animItemPoint = window.innerHeight - window.innerHeight / animStart;
// 				}

// 				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
// 					animItem.classList.add('_active');
// 				} else {
// 					if (!animItem.classList.contains('_anim-no-hide')) {
// 						animItem.classList.remove('_active')
// 					}
// 				}
// 			}
// 		}
// 		function offset(el) {
// 			const rect = el.getBoundingClientRect(),
// 				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
// 				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// 			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// 		}
// 		// use setTimeout if you want delay
// 		setTimeout(() => {
// 			animOnScroll();
// 		}, 300)
// 	}
// }

export default function scrollAnimation() {
	function onEntry(entry) {
		entry.forEach(change => {
			if (change.isIntersecting) {
				change.target.classList.add('_active');

				change.target.addEventListener('transitionend', animEnd);

				function animEnd(event) {
					event.target.classList.add('_anim-end');
					change.target.removeEventListener('transitionend', animEnd);
				}
			} else {
				if (change.target.classList.contains('_anim-hide')) {
					change.target.classList.remove('_active');
				}
			}
		});
	}
	let options = {
		threshold: [0.5]
	};
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('._anim-items');

	for (let elem of elements) {
		observer.observe(elem)
	}
}

