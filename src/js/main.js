'use strict'

// import * as allFunctions from './module/sum.js';



// ======================[ Header ]======================
import { componentHeader } from '../components/Header/header.js';
// import { componentHeaderScroll } from '../components/Header/header.js';

// ======================[ Counter ]======================
// import componentCounter from '../components/Counter/counter.js';

// ======================[ Modal Window ]======================
// import componentModal from '../components/Modal/modal.js';

// ======================[ Rippple Button ]======================
// import componentRippleButton from '../components/RippleButton/rippleButton.js';

// ======================[ Spoilers ]======================
import componentSpoilers from '../components/Spoiler/spoiler.js';

// ======================[ Switch ]======================
// import { componentIconsChangeTheme } from '../components/Switch/switch.js';
// import { componentSwitcherChangeTheme } from '../components/Switch/switch.js';

// ======================[ Tabs ]======================
// import componentTabs from '../components/Tabs/tabs.js';

// ======================[ Dynamic Adaptive ]======================
// import dynamicAdapt from '../components/DynamicAdapt/dynamicAdapt.js';

// ======================[ Light Gallery ]======================
// import lightgallery from '../components/LightGallery/lightgallery.js';

// ======================[ Input Validate ]======================
// import inputValidate from '../components/forms/inputValidate/inputValidate.js';

// ======================[ Scroll Animation ]======================
import scrollAnimation from '../components/ScrollAnimation/scrollAnimation.js';

// ======================[ Loader ]======================
// import componentLoader from '../components/Loader/loader.js';


// ======================[ Header ]======================
componentHeader()
// componentHeaderScroll()

// ======================[ Counter ]======================
// componentCounter()

// ======================[ Modal Window ]======================
// componentModal()

// ======================[ Ripple Button ]======================
// componentRippleButton()

// ======================[ Spoilers ]======================
componentSpoilers();

// ======================[ Switch ]======================
// componentIconsChangeTheme()
// componentSwitcherChangeTheme()

// ======================[ Tabs ]======================
// componentTabs();

// ======================[ Dynamic Adaptive ]======================
// dynamicAdapt()
/* Example: <div data-da=".content__column-garden,992,2" class="content__block">Example</div>
    for work with this component, you should write a data-attribute 'data-da' in element,
    which you want to adaptive. In data-da structure is data-da="where, when, which"
    where - class of element, where you want to move your element
    when - width of screen, when it should happen
    which - number of position after move or words "first" "last"
 */

// ======================[ Light Gallery ]======================
// lightgallery()

// ======================[ Input Validate ]======================
// inputValidate()

// ======================[ Scroll Animation ]======================
function updateScrollAnimation() {
   function onEntry(entries, observer) {
      entries.forEach(entry => {
         const target = entry.target;

         if (entry.isIntersecting) {
            target.classList.add('_active');

            if (target.hasAttribute('data-watch-once')) {
               observer.unobserve(target);
            }
         } else {
            if (!target.hasAttribute('data-watch-once')) {
               target.classList.remove('_active');
            }
         }
      });
   }

   const defaultThreshold = 0.5;
   const watchElements = document.querySelectorAll('[data-watch]');

   watchElements.forEach(element => {
      let threshold = parseFloat(element.getAttribute('data-watch-threshold'));
      if (isNaN(threshold)) {
         threshold = defaultThreshold;
      }

      const options = {
         threshold: threshold
      };

      const observer = new IntersectionObserver(onEntry, options);
      observer.observe(element);
   });
}
scrollAnimation();
updateScrollAnimation();
/* ._active - element in viewport zone, start animation
    ._anim-items - for conect animationScroll for this element
    ._anim-no-hide - if you want only 1 animation, without repeat
    global class for examle ._anim-show, if one animation repeat
*/

// ======================[ Loader ]======================
// componentLoader();


// ==================================================================

window.onload = function () {
   document.addEventListener('click', documentActions);

   function documentActions(e) {
      const targetElement = e.target;

      // ============= Search =============
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
         document.querySelector('.search-form').classList.remove('_active');
      }


      // ============= Cart =============
      if (targetElement.classList.contains('content-main__btn')) {
         updateCart(targetElement, targetElement.closest('.main__block').dataset.pid);
         e.preventDefault();
      }

      if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
         if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active');
         }
         e.preventDefault();
      } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
         document.querySelector('.cart-header').classList.remove('_active');
      }

      if (targetElement.classList.contains('cart-list__delete')) {
         const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
         updateCart(targetElement, productId, false);
         e.preventDefault();
      }
   }


   // ============= Header =============
   const headerElement = document.querySelector('.header');

   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll');
      }
   };

   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);


   // ============= Change Main Image =============
   const mainBlock = document.querySelector('.main__block');
   const mainImage = document.querySelector('.rotate-block__image img');
   const mainImageBlock = document.querySelector('.rotate-block__image');
   const mainImageSource = document.querySelector('.rotate-block__image source');
   const mainSliderButtons = document.querySelector('.slider-main__buttons');

   const mainTitle = document.querySelector('.content-main__title');
   const mainDecorTitle = document.querySelector('.main__decor-title');
   const mainPrice = document.querySelector('.content-main__price');

   let currentMainSliderSlide;

   setTimeout(() => {
      currentMainSliderSlide = document.querySelector('.slider-main__slide.swiper-slide-active')

      mainSliderObserver.observe(currentMainSliderSlide, {
         attributes: true,
         attributeFilter: ['class'],
         attributeOldValue: true,
      });
   });

   const mainSliderObserver = new MutationObserver(entries => {
      for (let i = 0; i < entries.length; i++) {
         if (!entries[i].target.classList.contains('swiper-slide-active')) {
            mainSliderObserver.disconnect();
            changeObserve();
            changeMainProduct(entries[i].target);

            break;
         }
      }
   });

   const changeObserve = function () {
      currentMainSliderSlide = document.querySelector('.slider-main__slide.swiper-slide-active');
      mainSliderObserver.observe(currentMainSliderSlide, {
         attributes: true,
         attributeFilter: ['class']
      });
   }
   const changeMainProduct = function (target) {
      let activeElem;
      if (target.classList.contains('swiper-slide-prev')) {
         activeElem = target;
      } else if (target.classList.contains('swiper-slide-next')) {
         const mainSlides = document.querySelectorAll('.slider-main__slide');
         activeElem = mainSlides[mainSlides.length - 1];
      }

      const fullUrl = activeElem.querySelector('.slide-slider-main__image img').src;
      const path = new URL(fullUrl).pathname.slice(1);
      const webpPath = path.replace(/\.png$/, ".webp");

      mainImageBlock.addEventListener('transitionend', changeProductInfo);

      mainTitle.classList.add('_hide');
      mainDecorTitle.classList.add('_hide');
      mainPrice.classList.add('_hide');
      mainImageBlock.classList.add('_hide');

      function changeProductInfo(event) {
         mainImageBlock.innerHTML = '';
         mainImageBlock.insertAdjacentHTML('beforeend', `
          <picture>
            <source srcset="${webpPath}" type="image/webp">
            <img src="${path}" alt="Image">
          </picture>
      `);

         // Change titles and price
         mainBlock.dataset.pid = activeElem.dataset.pid
         mainTitle.innerHTML = activeElem.dataset.title;
         mainDecorTitle.innerHTML = activeElem.dataset.title;
         mainPrice.innerHTML = '$' + activeElem.dataset.price;

         mainImageBlock.removeEventListener('transitionend', changeProductInfo);

         mainTitle.classList.remove('_hide');
         mainDecorTitle.classList.remove('_hide');
         mainPrice.classList.remove('_hide');
         mainImageBlock.classList.remove('_hide');
      }
   }



   // ===================================================

   // Rotate Main Image
   const mainRotateBtn = document.querySelector('.rotate_icon');
   mainRotateBtn.addEventListener('click', function (event) {
      document.querySelector('.rotate-block').classList.toggle('_rotate');
   })


   // AddToCart
   function addToCart(productButton, productId) {
      if (!productButton.classList.contains('_hold')) {
         productButton.classList.add('_hold');
         productButton.classList.add('_fly');

         const cart = document.querySelector('.cart-header__icon');
         const product = document.querySelector(`[data-pid="${productId}"]`);
         const productImage = product.querySelector('.item-product__image');

         const productImageFly = productImage.cloneNode(true);

         const productImageFlyWidth = productImage.offsetWidth;
         const productImageFlyHeight = productImage.offsetHeight;
         const productImageFlyTop = productImage.getBoundingClientRect().top;
         const productImageFlyLeft = productImage.getBoundingClientRect().left;

         productImageFly.setAttribute('class', '_flyImage _ibg');
         productImageFly.style.cssText = `
        left: ${productImageFlyLeft}px;
        top: ${productImageFlyTop}px;
        width: ${productImageFlyWidth}px;
        height: ${productImageFlyHeight}px;
      `;

         document.body.append(productImageFly);

         const cartFlyLeft = cart.getBoundingClientRect().left;
         const cartFlyTop = cart.getBoundingClientRect().top;

         productImageFly.style.cssText = `
        left: ${cartFlyLeft}px;
        top: ${cartFlyTop}px;
        width: 0px;
        height: 0px;
        opacity: 0;
      `;

         productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
               productImageFly.remove();
               updateCart(productButton, productId);
               productButton.classList.remove('_fly');
            }
         });
      }
   }
   function updateCart(productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header');
      const cartIcon = cart.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
      const cartList = document.querySelector('.cart-list');

      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
         }

         if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const cartProductImage = product.querySelector('.rotate-block__image').innerHTML;
            const cartProductTitle = product.querySelector('.content-main__title').innerHTML;
            const cartProductContent = `
          <a href="" class="cart-list__image">${cartProductImage}</a>
          <div class="cart-list__body">
            <a href="" class="cart-list__title">${cartProductTitle}</a>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <button href="" class="cart-list__delete">Delete</button>
          </div>
        `;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
         } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
         }

         productButton.classList.remove('_hold');
      } else {
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
         if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
         }

         const cartQuantityValue = --cartQuantity.innerHTML;

         if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue;
         } else {
            cartQuantity.remove();
            cart.classList.remove('_active');
         }
      }
   }


   if (document.querySelector('.slider-main__slider')) {
      const mainSlider = new Swiper('.slider-main__slider', {
         observer: true,
         observeParents: true,
         slidesPerView: 3,
         spaceBetween: 40,
         watchOverflow: true,
         speed: 800,
         preloadImages: false,
         parallax: true,
         loop: true,
         // Arrows
         navigation: {
            nextEl: '.slider-main__button_next',
            prevEl: '.slider-main__button_prev',
         },
         breakpoints: {
            // when window width is > 320px
            320: {
               slidesPerView: 1.3,
               spaceBetween: 20,
            },
            480: {
               slidesPerView: 1.5,
               spaceBetween: 40,
            },
            768: {
               slidesPerView: 2,
            },
            992: {
               slidesPerView: 2.5,
            },
            // when window width is > 768px
            1313: {
               slidesPerView: 3,
            },
         }
      });
   }
   if (document.querySelector('.slider-favorite__slider')) {
      const mainSlider = new Swiper('.slider-favorite__slider', {
         observer: true,
         observeParents: true,
         slidesPerView: 3,
         spaceBetween: 80,
         watchOverflow: true,
         speed: 800,
         preloadImages: false,
         parallax: true,
         breakpoints: {
            // when window width is > 320px
            320: {
               slidesPerView: 1.1,
               spaceBetween: 20,
            },
            480: {
               slidesPerView: 1.5,
               spaceBetween: 80,
            },
            768: {
               slidesPerView: 2,
            },
            992: {
               slidesPerView: 2.5,
            },
            // when window width is > 768px
            1260: {
               slidesPerView: 3,
            },
         }
      });
   }


   // Dropdown
   document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
      const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden')

      dropDownBtn.addEventListener('click', function () {
         dropDownList.classList.toggle('dropdown__list_visible');
         this.classList.add('dropdown__button_active')
      });

      dropDownListItems.forEach(listItem => {
         listItem.addEventListener('click', function (e) {
            e.preventDefault();
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list_visible');
         });
      });

      document.addEventListener('click', function (e) {
         if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button_active');
            dropDownList.classList.remove('dropdown__list_visible');
         }
      })

      document.addEventListener('keydown', function (e) {
         if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button_active');
            dropDownList.classList.remove('dropdown__list_visible');
         }
      })
   });
};

