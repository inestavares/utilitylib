;(function($) {
    'use strict';
    var currentModal = null;
    var scrollWidth;
       // quick helper to check width
    var getScrollWidth = function() {
        if (!scrollWidth) { // so this elem only gets inserted once 
            var scrollDiv = document.createElement('div');
            scrollDiv.className = 'scrollbar-measure'; // helper class for elem
            document.body.appendChild(scrollDiv);
            scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
        return scrollWidth;
    };

    var adjustScroll = function() {
        if(!scrollWidth) { 
            scrollWidth = getScrollWidth().toString() + 'px';
        }
        document.body.style.paddingRight = scrollWidth; 
    }; 

    var overlayClose = function(e) {
        if(e.target === $(currentModal).parent()[0]) {
            closeModal(e);
        }
    };

    var openModal = function() {
        currentModal = $(this).data('target');
        $('body').addClass('modal-open');
        $('.modal-overlay').addClass('active');
        $(currentModal).toggleClass('inactive');

        // adjust scrollBar when Modal Open
        adjustScroll();
        // attach event handlers to document and overlay 

        $(document).on( 'keydown.modalClose', closeModal );
        $('.modal-overlay').on( 'click.modalClose', overlayClose );
        $('.button-close').on( 'click.modalClose', closeModal );
        $('.modal').on( 'click.modal', '.button-form_alt', switchModal );
        console.log(currentModal);

    };
    var closeModal = function(e) {
        if( currentModal && ( !e.keyCode || e.keyCode === 27 )) {
            $('body').removeClass('modal-open');
            $('.modal-overlay').removeClass('active'); 

            $(currentModal).toggleClass('inactive');
           // resetting our state
            document.body.style.paddingRight = 0; 
            // unsubscribing from the modal
            $(document).off('keydown.modalClose', closeModal);
            $('.modal-overlay').off('click.modalClose', overlayClose);
            
            currentModal = null; 
            
        }
    };
    
    // for when it's necessary to switch between modals - e.g. login / create account 
    var switchModal = function() {
        $(currentModal).addClass('inactive');
        currentModal = $(this).data('target');
        $(currentModal).removeClass('inactive'); 

    };

    $('.header-controls').on('click.modal', '.button-login', openModal);
})($);