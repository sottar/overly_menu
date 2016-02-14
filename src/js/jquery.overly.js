/*
 * Overly_menu
 * https://github.com/sottar/Overly_menu
 *
 * Copyright (c) 2016 Sota Ohara
 * Licensed under the MIT license.
 */

(function($) {
  $.fn.Overly_menu = function(options) {

    var elements = this;
    var settings = $.extend({
      'color' : 'rgba(0, 0, 0, 0.8)',
      'opacity': '0.8',
    }, options);

    //init
    if(options.color && options.color.match(/#/)) {
      toRGB(options.color);
    }
    $('#overly_menu').css({
      'display': 'none',
      'background-color': settings.color
    });

    function toRGB(color16) {
      var tmpColor16 = color16.substr(1)
      var a16 = new Array();
      var a10 = new Array();
      if(tmpColor16.length = 6) {
        for(var i=1; i<=3; i++) {
          a16[i] = tmpColor16.substr(2 * i - 2, 2);
          a10[i] = parseInt(a16[i], 16);
        }
      }
      if(options.opacity) {
        var a = options.opacity;
      } else {
        var a = 1;
      }
      var color10 = 'rgba(' + a10[1] + ',' + a10[2] + ',' + a10[3] + ',' + a + ')';
      settings.color = color10;
    }

    // btn
    var btn_block = $('#overly_open').parent();
    btn_block.addClass('overly_btn_block')
    $('#overly_open').addClass('on');
    $('#overly_open, #overly_close').on('click', function() {
      $('#overly_open').toggleClass('on');
      $('#overly_close').toggleClass('on');
    });

    // design
    var windowHeight = $(window).height();
    var menuHeight = $(elements).height();
    var menuMargin = (windowHeight - menuHeight) / 2;
    $('#overly_menu').css({
      'height': windowHeight
    });
    $('#overly_menu ul').css({
      'padding-top': menuMargin
    });

    // slide menu
    $('#overly_open').on('click', function() {
      $('#overly_menu').animate({
        height: 'show',
        opacity: 'show'
      }, settings.speed);
    });
    $('#overly_close').on('click', function() {
      $('#overly_menu').animate({
        height: 'hide',
        opacity: 'hide'
      }, settings.speed);
    });
  };
})(jQuery);
