// Live countdown for Events cards
(function(){
  if (typeof window === 'undefined') return;

  function parseTargetDate(attrValue) {
    // Accepts ISO strings or yyyy-mm-dd hh:mm formats
    if (!attrValue || typeof attrValue !== 'string') return null;
    var iso = new Date(attrValue);
    if (!isNaN(iso.getTime())) return iso;
    // Try replacing dashes with slashes for Safari compatibility
    var alt = new Date(attrValue.replace(/-/g, '/'));
    if (!isNaN(alt.getTime())) return alt;
    return null;
  }

  function getDefaultTarget() {
    var now = new Date();
    var target = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days
    target.setHours(20, 0, 0, 0); // 08:00 PM
    return target;
  }

  function startCountdown(root, targetDate) {
    var daysEl = root.querySelector('.days');
    var hoursEl = root.querySelector('.hours');
    var minutesEl = root.querySelector('.minutes');
    var secondsEl = root.querySelector('.seconds');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var now = new Date().getTime();
      var dist = targetDate.getTime() - now;
      if (dist < 0) dist = 0;
      var d = Math.floor(dist / (1000 * 60 * 60 * 24));
      var h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((dist % (1000 * 60)) / 1000);
      daysEl.textContent = d;
      hoursEl.textContent = pad(h);
      minutesEl.textContent = pad(m);
      secondsEl.textContent = pad(s);
    }

    tick();
    var id = setInterval(function(){
      tick();
      // Stop when reached zero
      if (targetDate.getTime() - new Date().getTime() <= 0) {
        clearInterval(id);
      }
    }, 1000);
  }

  function init() {
    var containers = document.querySelectorAll('.wrap-content-slide2');
    if (!containers || containers.length === 0) return;
    for (var i = 0; i < containers.length; i++) {
      var c = containers[i];
      var attr = c.getAttribute('data-countdown');
      var target = parseTargetDate(attr) || getDefaultTarget();
      startCountdown(c, target);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Initialize date picker for reservation form
(function(){
  if (typeof window === 'undefined') return;
  function initDatePicker() {
    // Fallback to native date input if plugin missing
    if (typeof $ === 'undefined' || !$.fn) {
      var inputs = document.querySelectorAll('.my-calendar');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('type', 'date');
      }
      return;
    }

    if (!$.fn.daterangepicker) {
      $('.my-calendar').attr('type', 'date');
      return;
    }
    var $inputs = $('.my-calendar');
    if ($inputs.length === 0) return;
    $inputs.each(function(){
      var $input = $(this);
      if ($input.data('has-drp')) return;
      $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        opens: 'center',
        locale: {
          format: 'YYYY-MM-DD'
        }
      });
      $input.data('has-drp', true);
    });

    // Open on calendar icon click
    $('.btn-calendar').off('click.drp').on('click.drp', function(e){
      e.preventDefault();
      var $input = $(this).siblings('.my-calendar');
      if ($input.length) {
        // If plugin attached, open via click; otherwise native date input
        if ($input.data('daterangepicker')) {
          $input.trigger('click');
        } else {
          $input.attr('type', 'date').trigger('focus');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDatePicker);
  } else {
    initDatePicker();
  }
})();

// Footer gallery custom slider using setAttribute/getAttribute
(function(){
  function initFooterGallery() {
    var modal = document.getElementById('footer-gallery-modal');
    if (!modal) return;
    var imgEl = modal.querySelector('.fgm-image');
    var btnPrev = modal.querySelector('[data-fgm="prev"]');
    var btnNext = modal.querySelector('[data-fgm="next"]');
    var btnCloseEls = modal.querySelectorAll('[data-fgm="close"]');

    // Build images array from footer gallery
    var thumbs = document.querySelectorAll('.wrap-gallery-footer .item-gallery-footer');
    if (!thumbs || thumbs.length === 0) return;
    var images = [];
    for (var i = 0; i < thumbs.length; i++) {
      var href = thumbs[i].getAttribute('href');
      if (href) images.push(href);
      // Store index on element
      thumbs[i].setAttribute('data-fgm-index', String(i));
      // Disable Lightbox2 on footer items to avoid conflicts/whitespace
      if (thumbs[i].getAttribute('data-lightbox')) {
        thumbs[i].removeAttribute('data-lightbox');
      }
    }

    function show(index) {
      if (images.length === 0) return;
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      // Persist current index on modal with setAttribute
      modal.setAttribute('data-fgm-current', String(index));
      var src = images[index];
      imgEl.setAttribute('src', src);
      imgEl.setAttribute('alt', 'Gallery image ' + (index + 1));
      // Lock scroll to avoid layout jump/whitespace
      document.body.setAttribute('data-fgm-scroll-lock', '1');
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }

    function currentIndex() {
      var val = modal.getAttribute('data-fgm-current');
      var idx = parseInt(val || '0', 10);
      if (isNaN(idx)) idx = 0;
      return idx;
    }

    // Open on thumbnail click
    for (var j = 0; j < thumbs.length; j++) {
      thumbs[j].addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var idxAttr = this.getAttribute('data-fgm-index');
        var idx = parseInt(idxAttr || '0', 10) || 0;
        show(idx);
      });
    }

    // Controls
    if (btnPrev) btnPrev.addEventListener('click', function(){ show(currentIndex() - 1); });
    if (btnNext) btnNext.addEventListener('click', function(){ show(currentIndex() + 1); });
    for (var k = 0; k < btnCloseEls.length; k++) {
      btnCloseEls[k].addEventListener('click', function(){
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        // Restore scroll
        if (document.body.getAttribute('data-fgm-scroll-lock')) {
          document.body.style.overflow = '';
          document.body.removeAttribute('data-fgm-scroll-lock');
        }
      });
    }

    // Keyboard
    document.addEventListener('keydown', function(e){
      if (modal.classList.contains('hidden')) return;
      if (e.key === 'ArrowLeft') show(currentIndex() - 1);
      if (e.key === 'ArrowRight') show(currentIndex() + 1);
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        if (document.body.getAttribute('data-fgm-scroll-lock')) {
          document.body.style.overflow = '';
          document.body.removeAttribute('data-fgm-scroll-lock');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterGallery);
  } else {
    initFooterGallery();
  }
})();

 