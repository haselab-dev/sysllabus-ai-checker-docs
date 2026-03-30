(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  }

  function getHashTarget(hash) {
    var id = hash ? hash.slice(1) : '';

    if (!id) {
      return null;
    }

    try {
      id = decodeURIComponent(id);
    } catch (error) {
      return null;
    }

    return document.getElementById(id);
  }

  function findRadioForPanel(panel) {
    var tabs = panel.closest('.provider-tabs');
    var provider = panel.getAttribute('data-provider');

    if (!tabs || !provider) {
      return null;
    }

    return tabs.querySelector('input[type="radio"][data-provider="' + provider + '"]');
  }

  function activatePanelForTarget(target) {
    var panel = target ? target.closest('.provider-tabs__panel') : null;
    var radio = panel ? findRadioForPanel(panel) : null;

    if (!radio) {
      return false;
    }

    radio.checked = true;
    return true;
  }

  function scrollWithinPage(target) {
    var scroller = document.querySelector('.js-page-main');
    var top;

    if (!target) {
      return;
    }

    if (!scroller) {
      target.scrollIntoView();
      return;
    }

    top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTo(0, top);
  }

  function syncToHash(options) {
    var target = getHashTarget(window.location.hash);

    if (!target) {
      return;
    }

    if (!activatePanelForTarget(target)) {
      return;
    }

    if (options && options.skipScroll) {
      return;
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        scrollWithinPage(target);
      });
    });
  }

  ready(function () {
    document.addEventListener(
      'click',
      function (event) {
        var source = event.target;
        var link = source && source.closest ? source.closest('a[href^="#"]') : null;
        var target;

        if (!link) {
          return;
        }

        target = getHashTarget(link.getAttribute('href'));
        if (!target) {
          return;
        }

        activatePanelForTarget(target);
      },
      true
    );

    window.addEventListener('hashchange', function () {
      syncToHash();
    });

    syncToHash();
  });
})();
