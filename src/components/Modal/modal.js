// ======================[ Modal Window ]======================

export default function componentModal() {
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	/* In HTML you need to add a class 'lock-padding' for independent element,
		for example header, because it usually fixed */
	const lockPadding = document.querySelectorAll('.lock-padding');

	let unlock = true;

	const timeout = 800;

	if (popupLinks.length > 0) {
		popupLinks.forEach(elem => {
			elem.addEventListener('click', function(e) {
				const popupName = elem.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		})
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		console.log('Function call');
		popupCloseIcon.forEach(elem => {
			elem.addEventListener('click', function(e) {
				popupClose(elem.closest('.popup'));
				e.preventDefault();
			});
		})
	}

	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function(e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}
	function popupClose(popupActive, doUnlock = true) {
		console.log('Function popup close start');
		if (unlock) {
			popupActive.classList.remove('open');
			console.log('Function popup delete class .open');
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		console.log(window.innerWidth, document.querySelector('.wrapper').offsetWidth, lockPaddingValue);
		if (lockPadding.length > 0) {
			lockPadding.forEach(elem => {
				elem.style.paddingRight = lockPaddingValue;
			})
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}
	function bodyUnlock() {
		setTimeout(function() {
			if (lockPadding.length > 0) {
				lockPadding.forEach(elem => {
					elem.style.paddingRight = '0px';
				});
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function(e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function() {
	  if (!Element.prototype.closest) {
	    Element.prototype.closest = function(css) {
	      var node = this;
	      while (node) {
	        if (node.matches(css)) return node;
	        else node = node.parentElement;
	      }
	      return null;
	    };
	  }
	})();
	(function() {
	  if (!Element.prototype.matches) {
	    Element.prototype.matches = Element.prototype.matchesSelector ||
	      Element.prototype.webkitMatchesSelector ||
	      Element.prototype.mozMatchesSelector ||
	      Element.prototype.msMatchesSelector;
	  }
	})();
}