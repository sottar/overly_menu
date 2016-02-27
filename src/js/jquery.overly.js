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
      'speed': 300,
      'color' : 'rgba(0, 0, 0, 0.8)',
      'opacity': 0.8,
      'style': 'list',
      'hover': 'font-size'
    }, options);

    //init
    if(settings.color && settings.color.match(/#/)) {
      toRGB(settings.color);
    }
    $(elements).css({
      'display': 'none',
      'background-color': settings.color
    });
    $(elements).find('p').parent('li').addClass('overly_sentence');
    $(elements).find('a').parent('li').addClass('overly_links');

    $('.overly_links').find('a').hover(function() {
      if(settings.hover === 'opacity') {
        $(this).css({'opacity': 0.8})
      } else if (settings.hover === 'underline') {
        $(this).css({'text-decoration': 'underline'})
      } else if (settings.hover === 'font-weight') {
        $(this).css({'font-weight': 'normal'})
      } else if (settings.hover === 'letter-spacing') {
        $(this).css({'letter-spacing': '2px'})
      } else {
        $(this).css({'font-size': '30px'})
      }
    },
    function() {
      if(settings.hover === 'opacity') {
        $(this).css({'opacity': 1})
      } else if (settings.hover === 'underline') {
        $(this).css({'text-decoration': 'none'})
      } else if (settings.hover === 'font-weight') {
        $(this).css({'font-weight': '200'})
      } else if (settings.hover === 'letter-spacing') {
        $(this).css({'letter-spacing': '0px'})
      } else {
        $(this).css({'font-size': '24px'})
      }
    });

    // btn
    var btn_block = $('#overly_open').parent();
    btn_block.addClass('overly_btn_block')
    $('#overly_open').addClass('on');
    $('#overly_open, #overly_close').on('click', function() {
      $('#overly_open').toggleClass('on');
      $('#overly_close').toggleClass('on');
    });

    // menu design
    var windowHeight = $(window).height();
    var menuHeight = $(elements).height();
    var menuMargin = (windowHeight - menuHeight) / 2;
    $(elements).css({
      'height': windowHeight
    });
    $('#overly_menu ul').css({
      'padding-top': menuMargin
    });

    // style
    if(settings.style == 'flex') {
      $(elements).children('ul').addClass('flex');
    }

    // slide
    $('#overly_open').on('click', function() {
      $(elements).animate({
        height: 'show',
        opacity: 'show'
      }, settings.speed);
    });
    $('#overly_close').on('click', function() {
      $(elements).animate({
        height: 'hide',
        opacity: 'hide'
      }, settings.speed);
    });

    // convert from #xxxxxx to rgba()
    function toRGB(color16) {
      var tmpColor16 = color16.substr(1)
      var array16 = new Array();
      var array10 = new Array();
      if(tmpColor16.length == 6) {
        for(var i=1; i<=3; i++) {
          array16[i-1] = tmpColor16.substr(2 * i - 2, 2);
        }
      } else if (tmpColor16.length == 3) {
        array16 = tmpColor16.split("")
      }
      for(var t=0; t<=2; t++) {
        array10[t] = parseInt(array16[t], 16);
      }
      if(settings.opacity) {
        var a = settings.opacity;
      } else {
        var a = 1;
      }
      var color10 = 'rgba(' + array10[0] + ',' + array10[1] + ',' + array10[2] + ',' + a + ')';
      settings.color = color10;
    }

  };
})(jQuery);
