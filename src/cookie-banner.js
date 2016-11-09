(function($){
    "use strict";

    /**
     * A small plugin that creates a minimalistic cookie banner
     *
     * author: Tony Lopez <tony@alberon.co.uk>
     * licence: MIT
     *
     * Dependencies: [
     *                  'js-cookie': https://github.com/js-cookie/js-cookie
     *               ]
     *
     * @param opts
     * @returns {jQuery}
     */
    $.fn.cookieBanner = function(opts){
        var CookieBanner = this,
            click = (navigator.userAgent.match(/iPad/i)) ? 'touchstart' : 'click';

        this.options = $.extend(true, {
            animate: {
                close: false
            },
            cookie: {
                name: 'accepted_cookie_policy',
                value: true,
                text:'Accept & Close'
            },
            link: {
                url: '/cookie-policy',
                text: 'Cookies Policy.'
            },
            text: 'This site uses cookies to give you the best possible user ' +
            'experience. To find out more please view our ',
            testMode: false
        }, opts);

        /**
         * Initialises the plugin
         */
        this.initialise = function(){
            if(CookieBanner.options.testMode){
                CookieBanner.removeCookie();
            }
            if(!CookieBanner.alreadyConfirmed()){
                CookieBanner.render();
            }
        };

        /**
         * Render the banner using the options set when the plugin is
         * initialised
         *
         * @returns {JQuery}
         */
        this.renderBanner = function(){
            return $('<div />', {
                class: 'cookie-banner',
                id: CookieBanner.options.cookie.name,
                text: CookieBanner.options.text
            }).append(CookieBanner.renderLink())
              .append(CookieBanner.renderCloser());
        };

        /**
         * Render the link using the options set when the plugin is initialised
         *
         * @returns {JQuery|HTMLElement}
         */
        this.renderLink = function(){
            return $('<a />', {
                attr: {
                    href: CookieBanner.options.link.url,
                    target: '_blank'
                },
                text: CookieBanner.options.link.text
            });
        };

        /**
         * Render the close button using the options set when the plugin is
         * initialised
         *
         * @returns {JQuery}
         */
        this.renderCloser = function(){
            return $('<div />', {
                class: 'cookie-close',
                text: CookieBanner.options.cookie.text
            }).on(click, CookieBanner.closeAndAccept);
        };

        /**
         * Append the banner to the body
         *
         * @returns {JQuery}
         */
        this.render = function(){
            return $('body').addClass('cookie-banner-active')
                            .append(CookieBanner.renderBanner());
        };

        /**
         * A basic removal for the banner to close it
         *
         * @returns {JQuery}
         */
        this.close = function(){
            return $('body').removeClass('cookie-banner-active')
                            .find('.cookie-banner')
                            .remove();
        };

        /**
         * Set a cookie and close the banner
         *
         * @param e
         * @returns {*} Cookies set response
         */
        this.closeAndAccept = function(e){
            if(typeof CookieBanner.options.animate.close === 'function'){
                /**
                 * Note: This is a blank function, so handle the removal of the
                 * cookie banner in your own code
                 */
                CookieBanner.options.animate.close(e);
            } else {
                CookieBanner.close();
            }

            return Cookies.set(
                CookieBanner.options.cookie.name,
                CookieBanner.options.cookie.value
            );
        };

        /**
         * Test if the cookie is already set
         *
         * @returns {*}
         */
        this.alreadyConfirmed = function(){
            return Cookies.get(CookieBanner.options.cookie.name);
        };

        /**
         * Remove the cookie - Useful for testing
         *
         * @returns {*}
         */
        this.removeCookie = function(){
            return Cookies.remove(CookieBanner.options.cookie.name);
        };

        this.initialise();

        return this;
    };
})(jQuery);
