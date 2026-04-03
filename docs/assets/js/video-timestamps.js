(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  }

  function seekVideo(video, seconds) {
    var targetTime = Math.max(0, seconds);
    var playPromise;

    if (video.duration && targetTime > video.duration) {
      targetTime = Math.max(0, video.duration - 0.25);
    }

    video.currentTime = targetTime;
    playPromise = video.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {});
    }
  }

  ready(function () {
    document.addEventListener('click', function (event) {
      var source = event.target;
      var button = source && source.closest ? source.closest('[data-video-seek-target][data-video-seek-time]') : null;
      var selector;
      var video;
      var seconds;
      var onLoadedMetadata;

      if (!button) {
        return;
      }

      selector = button.getAttribute('data-video-seek-target');
      seconds = Number(button.getAttribute('data-video-seek-time'));
      video = selector ? document.querySelector(selector) : null;

      if (!video || Number.isNaN(seconds)) {
        return;
      }

      event.preventDefault();

      onLoadedMetadata = function () {
        seekVideo(video, seconds);
      };

      if (video.readyState >= 1) {
        onLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        video.load();
      }

      if (typeof video.scrollIntoView === 'function') {
        video.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
