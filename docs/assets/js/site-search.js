(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-docs-search-data="true"]');
      if (existing) {
        if (window.TEXT_SEARCH_DATA) {
          resolve();
          return;
        }
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.docsSearchData = 'true';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function normalize(value) {
    return (value || '').toLowerCase().trim();
  }

  function getShortcutConfig() {
    if (window.DOCS_SEARCH_SHORTCUT) {
      return window.DOCS_SEARCH_SHORTCUT;
    }

    var platform = '';

    if (navigator.userAgentData && navigator.userAgentData.platform) {
      platform = navigator.userAgentData.platform;
    } else {
      platform = navigator.platform || navigator.userAgent || '';
    }

    platform = normalize(platform);

    if (
      platform.indexOf('mac') !== -1 ||
      platform.indexOf('iphone') !== -1 ||
      platform.indexOf('ipad') !== -1 ||
      platform.indexOf('ipod') !== -1
    ) {
      return {
        hint: 'Mac は ⌘K でも開けます。',
        label: '⌘K',
        title: 'Mac は Command+K で検索を開けます'
      };
    }

    return {
      hint: 'Windows / Linux は Ctrl+K でも開けます。',
      label: 'Ctrl+K',
      title: 'Windows / Linux は Ctrl+K で検索を開けます'
    };
  }

  function isAppleShortcut() {
    return !!(
      window.DOCS_SEARCH_SHORTCUT &&
      window.DOCS_SEARCH_SHORTCUT.label === '⌘K'
    );
  }

  function escapeHtml(value) {
    return (value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createModal() {
    var root = document.createElement('div');
    root.className = 'docs-search-modal';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="docs-search-modal__panel" role="dialog" aria-modal="true" aria-label="ドキュメント検索">' +
        '<p class="docs-search-modal__hint">タイトル、本文中の単語、キーワードを検索できます。</p>' +
        '<div class="docs-search-modal__top">' +
          '<input class="docs-search-modal__input" type="text" placeholder="例: APIキー, 設定, 履歴" autocomplete="off">' +
          '<button class="docs-search-modal__mobile-close" type="button" aria-label="検索を閉じる">' +
            '<span aria-hidden="true">×</span>' +
          '</button>' +
        '</div>' +
        '<ul class="docs-search-modal__results"></ul>' +
      '</div>';
    document.body.appendChild(root);
    return root;
  }

  ready(function () {
    var docs = [];
    var shortcut = getShortcutConfig();
    var searchDataLoaded = false;
    var searchDataLoading = null;
    var previousBodyOverflow = '';
    var previousBodyPaddingRight = '';
    var lockedScrollableElements = [];
    var modal = createModal();
    var input = modal.querySelector('.docs-search-modal__input');
    var mobileCloseButton = modal.querySelector('.docs-search-modal__mobile-close');
    var results = modal.querySelector('.docs-search-modal__results');

    function updateMobileCloseButton() {
      if (normalize(input.value)) {
        mobileCloseButton.setAttribute('aria-label', '入力したキーワードを削除');
        return;
      }

      mobileCloseButton.setAttribute('aria-label', '検索を閉じる');
    }

    function render(items, query) {
      if (!query) {
        results.innerHTML = '<li class="docs-search-modal__empty">キーワードを入力すると候補が表示されます。</li>';
        return;
      }

      if (!items.length) {
        results.innerHTML = '<li class="docs-search-modal__empty">一致するページが見つかりませんでした。</li>';
        return;
      }

      results.innerHTML = items.map(function (item) {
        var excerpt = item.content ? escapeHtml(item.content.slice(0, 120)) : '';
        return (
          '<li class="docs-search-modal__item">' +
            '<a class="docs-search-modal__link" href="' + escapeHtml(item.url) + '">' +
              '<span class="docs-search-modal__title">' + escapeHtml(item.title) + '</span>' +
              '<span class="docs-search-modal__url">' + escapeHtml(item.url) + '</span>' +
              (excerpt ? '<span class="docs-search-modal__excerpt">' + excerpt + '</span>' : '') +
            '</a>' +
          '</li>'
        );
      }).join('');
    }

    function search(query) {
      var keyword = normalize(query);
      if (!keyword) {
        render([], '');
        return;
      }

      var filtered = docs.filter(function (item) {
        return normalize(item.title).indexOf(keyword) !== -1 || normalize(item.content).indexOf(keyword) !== -1;
      });

      render(filtered.slice(0, 20), keyword);
    }

    function lockBodyScroll() {
      var scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

      previousBodyOverflow = document.body.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
      }
    }

    function lockScrollableElement(element) {
      if (!element) {
        return;
      }

      var computedStyle = window.getComputedStyle(element);
      var currentPaddingRight = parseFloat(computedStyle.paddingRight) || 0;
      var scrollbarWidth = Math.max(0, element.offsetWidth - element.clientWidth);

      lockedScrollableElements.push({
        element: element,
        overflow: element.style.overflow,
        paddingRight: element.style.paddingRight
      });

      element.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        element.style.paddingRight = currentPaddingRight + scrollbarWidth + 'px';
      }
    }

    function unlockBodyScroll() {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
    }

    function lockPageScrollAreas() {
      lockedScrollableElements = [];
      lockScrollableElement(document.querySelector('.page__main'));
      lockScrollableElement(document.querySelector('.page__sidebar'));
    }

    function unlockPageScrollAreas() {
      lockedScrollableElements.forEach(function (entry) {
        entry.element.style.overflow = entry.overflow;
        entry.element.style.paddingRight = entry.paddingRight;
      });
      lockedScrollableElements = [];
    }

    function openModal() {
      if (modal.classList.contains('is-open')) {
        return;
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      lockBodyScroll();
      lockPageScrollAreas();
      updateMobileCloseButton();
      input.focus();
      render([], '');
      ensureSearchData().then(function () {
        search(input.value);
      }).catch(function () {
        results.innerHTML = '<li class="docs-search-modal__empty">検索データの読み込みに失敗しました。</li>';
      });
    }

    function closeModal() {
      if (!modal.classList.contains('is-open')) {
        return;
      }

      if (document.activeElement === input) {
        input.blur();
      }
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      unlockBodyScroll();
      unlockPageScrollAreas();
    }

    function bindTriggerLink(link) {
      if (!link || link.dataset.docsSearchBound === 'true') {
        return;
      }

      link.setAttribute('title', shortcut.title);
      link.setAttribute('aria-label', '検索を開く。' + shortcut.title);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
      });
      link.dataset.docsSearchBound = 'true';
    }

    function bindTriggerLinks() {
      var selector = 'a[href="' + window.DOCS_SEARCH_PAGE_URL + '"]';
      var links = document.querySelectorAll(selector);
      Array.prototype.forEach.call(links, bindTriggerLink);
    }

    function ensureSearchData() {
      if (searchDataLoaded) {
        return Promise.resolve();
      }

      if (searchDataLoading) {
        return searchDataLoading;
      }

      if (window.TEXT_SEARCH_DATA && Array.isArray(window.TEXT_SEARCH_DATA.docs)) {
        docs = window.TEXT_SEARCH_DATA.docs;
        searchDataLoaded = true;
        return Promise.resolve();
      }

      searchDataLoading = loadScript(window.DOCS_SEARCH_DATA_URL).then(function () {
        docs = (window.TEXT_SEARCH_DATA && window.TEXT_SEARCH_DATA.docs) || [];
        searchDataLoaded = true;
      });

      return searchDataLoading;
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    input.addEventListener('input', function () {
      updateMobileCloseButton();
      search(input.value);
    });
    mobileCloseButton.addEventListener('click', function () {
      if (normalize(input.value)) {
        input.value = '';
        updateMobileCloseButton();
        search('');
        input.focus();
        return;
      }

      closeModal();
    });

    document.addEventListener('keydown', function (event) {
      var key = normalize(event.key);
      var isSearchShortcut = isAppleShortcut()
        ? event.metaKey && !event.ctrlKey
        : event.ctrlKey && !event.metaKey;

      if (key === 'k' && isSearchShortcut) {
        event.preventDefault();
        if (modal.classList.contains('is-open')) {
          closeModal();
        } else {
          openModal();
        }
      }

      if (key === '/') {
        if (event.target && /input|textarea/i.test(event.target.tagName)) {
          return;
        }
        event.preventDefault();
        openModal();
      }

      if (key === 'escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    bindTriggerLinks();
    updateMobileCloseButton();
    render([], '');
  });
})();
