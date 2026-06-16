(function () {
  'use strict';

  function isExternalLink(link) {
    var href = link.getAttribute('href');

    if (!href || href.charAt(0) === '#') {
      return false;
    }

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return false;
    }

    return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== window.location.origin;
  }

  function applyExternalLinkBehavior(root) {
    var links = root.querySelectorAll ? root.querySelectorAll('a[href]') : [];

    Array.prototype.forEach.call(links, function (link) {
      if (!isExternalLink(link)) {
        return;
      }

      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function init() {
    applyExternalLinkBehavior(document);

    if (!window.MutationObserver) {
      return;
    }

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function (node) {
          if (node.nodeType !== 1) {
            return;
          }

          if (node.matches && node.matches('a[href]')) {
            applyExternalLinkBehavior(node.parentNode || document);
            return;
          }

          applyExternalLinkBehavior(node);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
