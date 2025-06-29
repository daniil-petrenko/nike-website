// ======================[ Tabs ]======================

export default function componentTabs() {
  const tabs = document.querySelectorAll('[data-tabs-titles] button');
  const tabsContent = document.querySelectorAll('[data-tabs-body] > div');
  const dataTabsElement = document.querySelector('[data-tabs]');
  const dataTabsAttr = parseInt(dataTabsElement.getAttribute('data-tabs'), 10);

  function spoilerTab(activeTabBtn) {
    let activeTabContent = document.querySelector('[data-tabs-body]');
    if (activeTabContent) {
      activeTabBtn.insertAdjacentElement('afterend', activeTabContent);
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(tab => tab.classList.remove('_tab-active'));
      tab.classList.add('_tab-active');

      if (window.innerWidth < dataTabsAttr) {
        spoilerTab(tab);
      }

      tabsContent.forEach(content => (content.classList.remove('_tab-active')));
      tabsContent[index].classList.add('_tab-active');
    })
  })

  function createMediaQuery() {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: ${dataTabsAttr}px) {
        [data-tabs-titles] {
          display: flex;
          flex-direction: column;
        }
        [data-tabs-body] > div {
          display: none; // Сховати контент за замовчуванням
        }
      }
    `;
    document.head.appendChild(style);
  }

  function handleMediaQuery() {
    if (window.innerWidth < dataTabsAttr) {
      let activeTabBtn = document.querySelector('[data-tabs-titles] ._tab-active');
      spoilerTab(activeTabBtn);
    }
  }

  createMediaQuery();
  handleMediaQuery();

  window.addEventListener('resize', handleMediaQuery);
}