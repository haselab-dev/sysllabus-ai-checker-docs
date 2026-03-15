(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function collectUrls(entries) {
    return (entries || []).reduce(function (urls, entry) {
      if (entry.url) {
        urls.push(entry.url);
      }

      if (Array.isArray(entry.children)) {
        entry.children.forEach(function (child) {
          if (child.url) {
            urls.push(child.url);
          }
        });
      }

      return urls;
    }, []);
  }

  ready(function () {
    var navKey = window.DOCS_SIDEBAR_NAV;
    var navigation = window.DOCS_NAVIGATION || {};
    var currentUrl = window.DOCS_PAGE_URL;
    var navigatorElement = document.querySelector('.article__section-navigator');
    var previousLabel = navigatorElement ? navigatorElement.querySelector('.previous > span') : null;
    var nextLabel = navigatorElement ? navigatorElement.querySelector('.next > span') : null;

    if (!navKey || !currentUrl || !navigatorElement || !Array.isArray(navigation[navKey])) {
      return;
    }

    if (previousLabel) {
      previousLabel.textContent = '前のページ';
    }

    if (nextLabel) {
      nextLabel.textContent = '次のページ';
    }

    var urls = collectUrls(navigation[navKey]);
    var currentIndex = urls.indexOf(currentUrl);

    if (currentIndex === -1) {
      return;
    }

    if (currentIndex === 0) {
      var previous = navigatorElement.querySelector('.previous');
      if (previous) {
        previous.remove();
      }
    }

    if (currentIndex === urls.length - 1) {
      var next = navigatorElement.querySelector('.next');
      if (next) {
        next.remove();
      }
    }

    if (!navigatorElement.children.length) {
      navigatorElement.remove();
    }
  });
})();
