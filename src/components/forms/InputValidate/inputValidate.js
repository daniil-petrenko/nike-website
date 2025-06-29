export default function inputValidate() {
	document.addEventListener('DOMContentLoaded', function() {
		const form = document.getElementById('form');
		form.addEventListener('submit', formSend);

		async function formSend(e) {
			e.preventDefault();

			let error = formValidate(form);

			if (error === 0) {
				// valid
			} else {
				// not valid
				console.log('Input is not valid');
			}
		}

		function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll('[data-required]');

			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);

				if (input.dataset.required === 'email') {
					if (emailTest(input)) {
						formAddError(input, 'Invalid email address');
						error++;
					}
				} else if (input.dataset.required === 'phone') {
					if (phoneTest(input)) {
						formAddError(input, 'Invalid phone number');
						error++;
					}
				} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
					formAddError(input, 'You must agree to the politics');
					error++;
				} else {
					if (input.value === '') {
						formAddError(input, 'This field is required');
						error++;
					}
				}
			}
			return error;
		}
		function formAddError(input, errorMessage) {
			input.parentElement.classList.add('parent-input__error');
			input.classList.add('input__error');

			let errorElem = input.parentElement.querySelector('.error-message');

	    if (!errorElem) {
	      errorElem = document.createElement('span');
	      errorElem.classList.add('error-message');
	      input.parentElement.appendChild(errorElem);
	    }

	    errorElem.textContent = errorMessage;
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('parent-input__error');
			input.classList.remove('input__error');

			const errorElem = input.parentElement.querySelector('.error-message');
	    if (errorElem) {
	      errorElem.remove();
	    }
		}
		function emailTest(input) {
			return !/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
		function phoneTest(input) {
			return !/^\+?[0-9]{10,14}$/.test(input.value);
		}

		const inputs = document.querySelectorAll('.form__input');
	  inputs.forEach(input => {
	    input.addEventListener('focus', function() {
	      formRemoveError(input);
	    });
	  });
	});
}