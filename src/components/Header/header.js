//  ======================[ Header ]======================

export function componentHeader() {
  const isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|IPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
  };
  if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    let menuSubArrows = document.querySelectorAll('.menu__sub-arrow');

    let currentList = false;
    let currentSubList = false;

    if (menuArrows.length > 0) {
      menuArrows.forEach(elem => {
        elem.addEventListener('click', function(e) {
          const parentItem = e.target.parentElement;

          if (currentList && currentList !== parentItem) {
            currentList.classList.remove('_active');
          }

          parentItem.classList.toggle('_active');
          currentList = parentItem.classList.contains('_active') ? parentItem : false;
        });
      });
    }

    if (menuSubArrows.length > 0) {
      menuSubArrows.forEach(elem => {
        elem.addEventListener('click', function(e) {
          const parentSubItem = e.target.parentElement;

          if (currentSubList && currentSubList !== parentSubItem) {
            currentSubList.classList.remove('_active');
          }

          parentSubItem.classList.toggle('_active');
          currentSubList = parentSubItem.classList.contains('_active') ? parentSubItem : false;
        });
      });
    }
    document.addEventListener('click', function (e) {
      const menuBody = document.querySelector('.menu__body');
      const menuArrows = document.querySelectorAll('.menu__arrow, .menu__sub-arrow');

      if (!menuBody.contains(e.target) && !Array.from(menuArrows).some(arrow => arrow.contains(e.target))) {
        menuArrows.forEach(arrow => {
          arrow.parentElement.classList.remove('_active');
        });
        currentList = false;
      }
    });
  } else {
    document.body.classList.add('_pc');
  }
  // ============ Burger menu ============
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
  }
}


// ============ Scroll by click ============

// Enter goal class in attribute data-goto, example: data-goto='.section_1'
export function componentHeaderScroll() {
  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
  if (menuLinks.length > 0) {
  	menuLinks.forEach(menuLink => {
  		menuLink.addEventListener('click', onMenuLinkClick);
  	});

  	function onMenuLinkClick(e) {
  		const menuLink = e.target.closest('a');
  		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
  			const gotoBlock = document.querySelector(menuLink.dataset.goto);
  			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

  			if (iconMenu.classList.contains('_active')) {
  				document.body.classList.remove('_lock');
  				iconMenu.classList.remove('_active');
  				menuBody.classList.remove('_active')
  			}

  			window.scrollTo({
  				top: gotoBlockValue,
  				behavior: 'smooth'
  			});
  			e.preventDefault();
  		}
  	}
  }
}

// if we have one header for each page with scroll to section
function componentHeaderScrollMultipages() {
  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

  if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
      const menuLink = e.target.closest('a');
      const gotoSelector = menuLink.dataset.goto;

      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.location.href = '/#' + gotoSelector.slice(1);
        e.preventDefault();
      } else {
        const gotoBlock = document.querySelector(gotoSelector);
        if (gotoBlock) {
          scrollToSection(gotoBlock);
        }
        e.preventDefault();
      }
    }

    function scrollToSection(gotoBlock) {
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

      let iconMenu = document.querySelector('.icon-menu');
      let menuBody = document.querySelector('.menu__body')
      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth'
      });
    }
  }
}
window.addEventListener('load', function () {
  if (window.location.hash) {
    let hash = window.location.hash;
    hash = hash.replace('#', '.');
    const menuLink = document.querySelector('.menu__link[data-goto="' + hash + '"]');
    if (menuLink) {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        menuLink.click();
      }
    }

    history.replaceState(null, null, window.location.pathname);
  }
});