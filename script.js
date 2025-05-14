// jQuery for INVENTRACK Landing Page

$(document).ready(function() {
    // Navbar background transition on scroll
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 40) {
        $('.navbar').addClass('scrolled');
      } else {
        $('.navbar').removeClass('scrolled');
      }
    });
  
    // Smooth scrolling for nav links
    $('.nav-links a, .cta-btn').on('click', function(e) {
      var target = $(this).attr('href');
      if (target.startsWith('#')) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $(target).offset().top - 60
        }, 600, 'swing');
      }
    });
  
    // Hero section animated entrance
    $('.hero-content').css({opacity: 0, transform: 'translateY(40px)'});
    setTimeout(function() {
      $('.hero-content').animate({opacity: 1, top: 0}, 700).css({transform: 'none'});
    }, 200);
  
    // Features cards animation on scroll
    function animateFeatures() {
      $('.feature-card').each(function(i) {
        var card = $(this);
        if (card.offset().top < $(window).scrollTop() + $(window).height() - 60) {
          setTimeout(function() {
            card.addClass('visible');
          }, i * 120);
        }
      });
    }
    $(window).on('scroll', animateFeatures);
    animateFeatures();
  
    // Animated counters in analytics section
    var countersAnimated = false;
    function animateCounters() {
      if (countersAnimated) return;
      var sectionTop = $('#analytics').offset().top;
      if ($(window).scrollTop() + $(window).height() > sectionTop + 40) {
        $('.metric-number').each(function() {
          var $this = $(this);
          var countTo = parseFloat($this.attr('data-count'));
          var isPercent = $this.text().includes('%');
          $({ countNum: 0 }).animate({ countNum: countTo }, {
            duration: 1200,
            easing: 'swing',
            step: function(now) {
              if (countTo % 1 !== 0) {
                $this.text(now.toFixed(1));
              } else {
                $this.text(Math.floor(now));
              }
            },
            complete: function() {
              if (countTo % 1 !== 0) {
                $this.text(countTo.toFixed(1));
              } else {
                $this.text(countTo);
              }
              if (isPercent) $this.text($this.text() + '%');
              if ($this.parent().find('.metric-label').text().includes('Uptime')) {
                $this.text($this.text() + '%');
              }
              if ($this.parent().find('.metric-label').text().includes('Support')) {
                $this.text($this.text() + '/7');
              }
              if ($this.parent().find('.metric-label').text().includes('Items')) {
                $this.text($this.text() + '+');
              }
            }
          });
        });
        countersAnimated = true;
      }
    }
    $(window).on('scroll', animateCounters);
    animateCounters();
  
    // Team photo hover effect (name overlay handled by CSS)
    // Contact form micro-interaction
    $('.contact-form').on('submit', function(e) {
      e.preventDefault();
      var $btn = $(this).find('button');
      $btn.text('Sending...').prop('disabled', true);
      setTimeout(function() {
        $btn.text('Sent!').addClass('sent');
        setTimeout(function() {
          $btn.text('Send Message').removeClass('sent').prop('disabled', false);
          $('.contact-form')[0].reset();
        }, 1800);
      }, 1200);
    });
  });