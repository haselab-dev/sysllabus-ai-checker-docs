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
    return String(value || '')
      .normalize('NFKC')
      .replace(/[\u30a1-\u30f6]/g, function (char) {
        return String.fromCharCode(char.charCodeAt(0) - 0x60);
      })
      .toLowerCase()
      .trim();
  }

  function splitTerms(query) {
    return normalize(query).split(/\s+/).filter(Boolean);
  }

  function escapeHtml(value) {
    return (value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegExp(value) {
    return (value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

  function highlightTerms(value, terms) {
    var html = escapeHtml(value || '');

    terms.forEach(function (term) {
      if (!term) {
        return;
      }

      html = html.replace(
        new RegExp('(' + escapeRegExp(term) + ')', 'ig'),
        '<mark class="docs-search-highlight">$1</mark>'
      );
    });

    return html;
  }

  function findFirstMatchIndex(text, terms) {
    var normalizedText = normalize(text);
    var firstIndex = -1;

    terms.forEach(function (term) {
      var index = normalizedText.indexOf(term);
      if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
        firstIndex = index;
      }
    });

    return firstIndex;
  }

  function buildExcerpt(content, terms) {
    var text = (content || '').replace(/\s+/g, ' ').trim();
    var start = 0;
    var end = Math.min(text.length, 120);
    var index;
    var excerpt;

    if (!text) {
      return '';
    }

    if (terms.length) {
      index = findFirstMatchIndex(text, terms);
      if (index !== -1) {
        start = Math.max(0, index - 32);
        end = Math.min(text.length, index + 88);
      }
    }

    excerpt = text.slice(start, end).trim();

    if (start > 0) {
      excerpt = '…' + excerpt;
    }
    if (end < text.length) {
      excerpt += '…';
    }

    return highlightTerms(excerpt, terms);
  }

  function scoreItem(item, terms, fullQuery) {
    var title = normalize(item.title);
    var content = normalize(item.content);
    var score = 0;
    var matched = true;

    if (fullQuery && title === fullQuery) {
      score += 120;
    } else if (fullQuery && title.indexOf(fullQuery) === 0) {
      score += 40;
    }

    terms.forEach(function (term) {
      var inTitle = title.indexOf(term) !== -1;
      var inContent = content.indexOf(term) !== -1;

      if (!inTitle && !inContent) {
        matched = false;
        return;
      }

      if (inTitle) {
        score += 20;
        if (title.indexOf(term) === 0) {
          score += 8;
        }
      }

      if (inContent) {
        score += 5;
      }
    });

    return matched ? score : -1;
  }

  function searchDocs(docs, query) {
    var fullQuery = normalize(query);
    var terms = splitTerms(query);
    var matched;

    if (!terms.length) {
      return { items: [], total: 0, terms: [] };
    }

    matched = docs
      .map(function (item) {
        return {
          item: item,
          score: scoreItem(item, terms, fullQuery)
        };
      })
      .filter(function (entry) {
        return entry.score >= 0;
      })
      .sort(function (left, right) {
        if (right.score !== left.score) {
          return right.score - left.score;
        }
        return left.item.title.localeCompare(right.item.title, 'ja');
      });

    return {
      items: matched.slice(0, 20).map(function (entry) {
        return entry.item;
      }),
      total: matched.length,
      terms: terms
    };
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
    var searchPage = document.querySelector('.js-docs-search-page');
    var searchPageInput = document.querySelector('.js-docs-search-page-input');
    var searchPageResults = document.querySelector('.js-docs-search-page-results');
    var searchPageSummary = document.querySelector('.js-docs-search-page-summary');

    function updateMobileCloseButton() {
      if (normalize(input.value)) {
        mobileCloseButton.setAttribute('aria-label', '入力したキーワードを削除');
        return;
      }

      mobileCloseButton.setAttribute('aria-label', '検索を閉じる');
    }

    function renderModal(result, query) {
      if (!query) {
        results.innerHTML = '<li class="docs-search-modal__empty">キーワードを入力すると候補が表示されます。</li>';
        return;
      }

      if (!result.items.length) {
        results.innerHTML = '<li class="docs-search-modal__empty">一致するページが見つかりませんでした。</li>';
        return;
      }

      results.innerHTML = result.items.map(function (item) {
        var title = highlightTerms(item.title, result.terms);
        var excerpt = buildExcerpt(item.content, result.terms);

        return (
          '<li class="docs-search-modal__item">' +
            '<a class="docs-search-modal__link" href="' + escapeHtml(item.url) + '">' +
              '<span class="docs-search-modal__title">' + title + '</span>' +
              '<span class="docs-search-modal__url">' + escapeHtml(item.url) + '</span>' +
              (excerpt ? '<span class="docs-search-modal__excerpt">' + excerpt + '</span>' : '') +
            '</a>' +
          '</li>'
        );
      }).join('');
    }

    function renderSearchPage(result, query) {
      if (!searchPageResults || !searchPageSummary) {
        return;
      }

      if (!query) {
        searchPageSummary.textContent = 'キーワードを入力すると候補が表示されます．';
        searchPageResults.innerHTML = '<li class="docs-search-page__empty">例: APIキー, OpenRouter, 履歴</li>';
        return;
      }

      if (!result.items.length) {
        searchPageSummary.textContent = '一致するページが見つかりませんでした．';
        searchPageResults.innerHTML = '<li class="docs-search-page__empty">別のキーワードで試してください．</li>';
        return;
      }

      searchPageSummary.textContent = result.total > result.items.length
        ? result.total + ' 件見つかりました．上位 ' + result.items.length + ' 件を表示しています．'
        : result.total + ' 件見つかりました．';

      searchPageResults.innerHTML = result.items.map(function (item) {
        var title = highlightTerms(item.title, result.terms);
        var excerpt = buildExcerpt(item.content, result.terms);

        return (
          '<li class="docs-search-page__item">' +
            '<a class="docs-search-page__link" href="' + escapeHtml(item.url) + '">' +
              '<span class="docs-search-page__title">' + title + '</span>' +
              '<span class="docs-search-page__url">' + escapeHtml(item.url) + '</span>' +
              (excerpt ? '<span class="docs-search-page__excerpt">' + excerpt + '</span>' : '') +
            '</a>' +
          '</li>'
        );
      }).join('');
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

    function runSearch(query) {
      return searchDocs(docs, query);
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
      var computedStyle;
      var currentPaddingRight;
      var scrollbarWidth;

      if (!element) {
        return;
      }

      computedStyle = window.getComputedStyle(element);
      currentPaddingRight = parseFloat(computedStyle.paddingRight) || 0;
      scrollbarWidth = Math.max(0, element.offsetWidth - element.clientWidth);

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
      renderModal({ items: [], total: 0, terms: [] }, '');
      ensureSearchData().then(function () {
        renderModal(runSearch(input.value), input.value);
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

    function syncSearchPageQuery(query) {
      var url;

      if (!searchPage) {
        return;
      }

      url = new URL(window.location.href);

      if (normalize(query)) {
        url.searchParams.set('q', query);
      } else {
        url.searchParams.delete('q');
      }

      window.history.replaceState(null, '', url.toString());
    }

    function bindTriggerLink(link) {
      if (!link || link.dataset.docsSearchBound === 'true') {
        return;
      }

      link.setAttribute('title', shortcut.title);
      link.setAttribute('aria-label', '検索を開く。' + shortcut.title);
      link.addEventListener('click', function (event) {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          link.target === '_blank'
        ) {
          return;
        }

        if (window.DOCS_PAGE_URL === window.DOCS_SEARCH_PAGE_URL && searchPageInput) {
          event.preventDefault();
          searchPageInput.focus();
          searchPageInput.select();
          return;
        }

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

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    input.addEventListener('input', function () {
      updateMobileCloseButton();
      renderModal(runSearch(input.value), input.value);
    });

    mobileCloseButton.addEventListener('click', function () {
      if (normalize(input.value)) {
        input.value = '';
        updateMobileCloseButton();
        renderModal({ items: [], total: 0, terms: [] }, '');
        input.focus();
        return;
      }

      closeModal();
    });

    if (searchPageInput) {
      searchPageInput.addEventListener('input', function () {
        var query = searchPageInput.value;
        syncSearchPageQuery(query);
        renderSearchPage(runSearch(query), query);
      });
    }

    document.addEventListener('keydown', function (event) {
      var key = normalize(event.key);
      var isSearchShortcut = isAppleShortcut()
        ? event.metaKey && !event.ctrlKey
        : event.ctrlKey && !event.metaKey;

      if (key === 'k' && isSearchShortcut) {
        event.preventDefault();
        if (modal.classList.contains('is-open')) {
          closeModal();
        } else if (window.DOCS_PAGE_URL === window.DOCS_SEARCH_PAGE_URL && searchPageInput) {
          searchPageInput.focus();
          searchPageInput.select();
        } else {
          openModal();
        }
      }

      if (key === '/') {
        if (event.target && /input|textarea/i.test(event.target.tagName)) {
          return;
        }
        event.preventDefault();
        if (window.DOCS_PAGE_URL === window.DOCS_SEARCH_PAGE_URL && searchPageInput) {
          searchPageInput.focus();
          searchPageInput.select();
        } else {
          openModal();
        }
      }

      if (key === 'escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    bindTriggerLinks();
    updateMobileCloseButton();
    renderModal({ items: [], total: 0, terms: [] }, '');
    renderSearchPage({ items: [], total: 0, terms: [] }, '');

    if (searchPage) {
      ensureSearchData().then(function () {
        var params = new URLSearchParams(window.location.search);
        var query = params.get('q') || '';

        if (searchPageInput) {
          searchPageInput.value = query;
        }
        renderSearchPage(runSearch(query), query);
      }).catch(function () {
        if (searchPageSummary) {
          searchPageSummary.textContent = '検索データの読み込みに失敗しました．';
        }
        if (searchPageResults) {
          searchPageResults.innerHTML = '<li class="docs-search-page__empty">時間をおいて再読み込みしてください．</li>';
        }
      });
    }
  });
})();
