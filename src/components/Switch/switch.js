// ======================[ Change Theme ]======================


export function componentIconsChangeTheme() {
  // Icons Theme Switcher
  window.addEventListener("load", windowLoad);

  function windowLoad() {
       const htmlBlock = document.documentElement;

       const saveUserTheme = localStorage.getItem('user-theme');

       let userTheme;
       if (window.matchMedia) {
           userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
       }
       window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
           !saveUserTheme ? changeTheme() : null;
       });

       const themeButton = document.querySelector('.page__theme');
       const resetButton = document.querySelector('.page__reset');
       if (themeButton) {
          themeButton.addEventListener('click', function(e) {
            resetButton.classList.add('active');
            changeTheme(true);
          });
       }
       if (resetButton) {
        	resetButton.addEventListener('click', function(e) {
    	     console.log('Reset');
    	     resetButton.classList.remove('active');
    	     localStorage.setItem('user-theme', '');
    	   });
       }

       function setThemeClass() {
          if (saveUserTheme) {
            htmlBlock.classList.add(saveUserTheme);
            resetButton.classList.add('active');
          } else {
            htmlBlock.classList.add(userTheme);
          }
       }

       setThemeClass();

       function changeTheme(saveTheme = false) {
          let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
          let newTheme;

          if (currentTheme === 'light') {
             newTheme = 'dark';
          } else if (currentTheme === 'dark') {
              newTheme = 'light';
          }
          htmlBlock.classList.remove(currentTheme);
          htmlBlock.classList.add(newTheme);
          saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
       }
  }
}

export function componentSwitcherChangeTheme() {
  // Checkbox Theme Switcher

  window.addEventListener("load", windowLoad);

  function windowLoad() {
      const htmlBlock = document.documentElement;
      const saveUserTheme = localStorage.getItem('user-theme');

      let userTheme;
      if (window.matchMedia) {
          userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      // Перевірка на зміну системної теми
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (!saveUserTheme) {
              changeTheme();
          }
      });

      // Знаходимо чекбокс
      const themeCheckbox = document.querySelector('.switch__checkbox');
      if (themeCheckbox) {
          themeCheckbox.addEventListener('change', function () {
              // Якщо чекбокс вибрано, переключити на темну тему, інакше на світлу
              if (this.checked) {
                  changeTheme(true);
              } else {
                  changeTheme(true);
              }
          });
      }

      function setThemeClass() {
          if (saveUserTheme) {
              htmlBlock.classList.add(saveUserTheme);
              themeCheckbox.checked = (saveUserTheme === 'dark');
          } else {
              htmlBlock.classList.add(userTheme);
              themeCheckbox.checked = (userTheme === 'dark');
          }
      }

      setThemeClass();

      function changeTheme(saveTheme = false) {
          let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
          let newTheme;

          if (currentTheme === 'light') {
              newTheme = 'dark';
          } else if (currentTheme === 'dark') {
              newTheme = 'light';
          }

          htmlBlock.classList.remove(currentTheme);
          htmlBlock.classList.add(newTheme);
          saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
      }
  }
}