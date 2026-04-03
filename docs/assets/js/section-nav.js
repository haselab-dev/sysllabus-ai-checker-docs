(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function pushUniqueItem(items, item) {
    if (!item || !item.url) {
      return;
    }

    if (items.some(function (existingItem) { return existingItem.url === item.url; })) {
      return;
    }

    items.push(item);
  }

  function collectItems(entries) {
    return (entries || []).reduce(function (items, entry) {
      if (entry.url) {
        pushUniqueItem(items, {
          title: entry.title || '',
          url: entry.url
        });
      }

      if (Array.isArray(entry.children)) {
        entry.children.forEach(function (child) {
          if (child.url) {
            pushUniqueItem(items, {
              title: child.title || '',
              url: child.url
            });
          }
        });
      }

      return items;
    }, []);
  }

  function withBaseurl(url) {
    var baseurl = window.DOCS_BASEURL || '';

    if (!url) {
      return url;
    }

    if (/^https?:\/\//.test(url)) {
      return url;
    }

    if (!baseurl) {
      return url;
    }

    if (url === '/') {
      return baseurl + '/';
    }

    return baseurl + url;
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

    var items = collectItems(navigation[navKey]);
    var headerItems = navigation.header || [];
    var currentIndex;
    var previous = navigatorElement.querySelector('.previous');
    var next = navigatorElement.querySelector('.next');

    headerItems.forEach(function (entry) {
      var title = '';

      if (entry.titles && entry.titles.ja) {
        title = entry.titles.ja;
      } else if (entry.title) {
        title = entry.title;
      }

      pushUniqueItem(items, {
        title: title,
        url: entry.url
      });
    });

    currentIndex = items.findIndex(function (item) {
      return item.url === currentUrl;
    });

    if (currentIndex === -1) {
      navigatorElement.remove();
      return;
    }

    function ensureLinkElement(className, fallbackLabel) {
      var container = navigatorElement.querySelector('.' + className);
      var spanElement;
      var anchorElement;

      if (container) {
        return container;
      }

      container = document.createElement('div');
      container.className = className;

      spanElement = document.createElement('span');
      spanElement.textContent = fallbackLabel;
      container.appendChild(spanElement);

      anchorElement = document.createElement('a');
      container.appendChild(anchorElement);

      navigatorElement.appendChild(container);
      return container;
    }

    function applyLink(linkElement, item, fallbackLabel, className) {
      var anchorElement;
      var titleElement;

      if (!item) {
        if (linkElement) {
          linkElement.remove();
        }
        return;
      }

      linkElement = linkElement || ensureLinkElement(className, fallbackLabel);

      anchorElement = linkElement.querySelector('a');
      if (!anchorElement) {
        return;
      }

      anchorElement.setAttribute('href', withBaseurl(item.url));
      anchorElement.setAttribute('title', item.title || fallbackLabel);

      titleElement = anchorElement.querySelector('.title, strong, small');
      if (titleElement && item.title) {
        titleElement.textContent = item.title;
        return;
      }

      anchorElement.textContent = item.title || fallbackLabel;
    }

    if (currentIndex === 0) {
      applyLink(previous, null, '前のページ', 'previous');
    } else {
      applyLink(previous, items[currentIndex - 1], '前のページ', 'previous');
    }

    if (currentIndex === items.length - 1) {
      applyLink(next, null, '次のページ', 'next');
    } else {
      applyLink(next, items[currentIndex + 1], '次のページ', 'next');
    }

    if (!navigatorElement.children.length) {
      navigatorElement.remove();
    }
  });
})();
