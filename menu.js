;(function($) {
    'use strict';
    var currentMenu = null,
        currentMenuTrigger,
        lastEventHandler = null;

    var mobileMenu = function(e) {
        $('.header-nav-layout').addClass('active');
        $('.header-nav-section').on('click.submenu', '.subnav-section > h5', testFunc);
    }


    var testFunc = function(e) {
        $(this).siblings().find('li').addClass('active');
    }

    var menuHandler = function(e) {
        e.preventDefault();
        if(currentMenu && (e.target === lastEventHandler[0])) {
            closeMenu(currentMenu);

        } else if (( currentMenu && (e.target !== lastEventHandler[0])) || currentMenu === null) {
            closeMenu(currentMenu);
            lastEventHandler = $(this);
            currentMenu = $(this).parent().find('.header-subnav');
            currentMenuTrigger = $(currentMenu).parent();
            openMenu();
         }
    }

    var openMenu = function(e) {
        console.log(this);
        $(currentMenu).addClass('active');
        $(currentMenuTrigger).addClass('selected');
        
    };


    var closeMenu = function(menu) {
           $(menu).removeClass('active');
           $(menu).parent().removeClass('selected');
           currentMenu = null;
           currentMenuTrigger = null;
    };

    var closeOtherMenu = function(e) {
        if(!$(e.target).closest('.header-nav-layout').length && currentMenu) {
            closeMenu(currentMenu); 
        }
    }

    $('.header-nav-layout').on('click.menuon', '.header-nav-section > a', menuHandler );
    $('body').on('click.menuoff', closeOtherMenu);
    $('.header').on('click.menuon', '.button-nav', mobileMenu);
    
    
})($);