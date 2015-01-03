/*
 *  jQueryIntroLoader - v1.2.0
 *  "simple intro loader animations"
 *  http://factory.brainleaf.eu/jqueryIntroLoader
 *
 *  Made by BRAINLEAF Communication
 *  Released Under GNU/GPL License
 *  
 *  
 *  BugReport/Assistence: https://github.com/Gix075/jqueryIntroLoader/issues
 */

(function($) {

    $.introLoader = function(element, options) {

    
        var defaults = {

            animation: {
                name: 'simpleLoader',
                options: {
                    effect:'fadeOut',
                    ease: "linear",
                    style: 'light',
                    delayTime: 500,
                    animationTime: 300,
                    progbarAnimationTime: 300,
                    progbarDelayAfter: 300,
                    fixed: true,
                    stop: true,
                    onAfter: function(){},
                    onBefore: function(){}
                }
            },    

            spinJs: {}

        }

        
        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;   
        
        //Constructor
        plugin.init = function() {
            
            
            plugin.settings = $.extend(true, defaults, options);
            
            // spinJS Options
            var spinOpt = {
                lines: this.settings.spinJs.lines,
                length: this.settings.spinJs.length, 
                width: this.settings.spinJs.width, 
                radius: this.settings.spinJs.radius, 
                corners: this.settings.spinJs.corners, 
                rotate: this.settings.spinJs.rotate,
                direction: this.settings.spinJs.direction,
                color: this.settings.spinJs.color, 
                speed: this.settings.spinJs.speed,
                trail: this.settings.spinJs.trail, 
                shadow: this.settings.spinJs.shadow,
                hwaccel: this.settings.spinJs.hwaccel, 
                className: this.settings.spinJs.className,
                zIndex: this.settings.spinJs.zIndex,
                top: this.settings.spinJs.top, 
                left: this.settings.spinJs.left 
            }

            // animation options object
            var anim = plugin.settings.animation.name;
            var animOpt = plugin.settings.animation.options;
            var spinOpt = plugin.settings.spinJs;
            
            
            
            // Choose Animation
            switch(anim) {
                case "simpleLoader":
                    plugin.spinner = new Spinner(spinOpt).spin();
                    simpleLoaderAnimation(element,animOpt,spinOpt);
                    break;
                case "doubleLoader":
                    doubleLoaderAnimation(element,animOpt);
                    break;
                default:
                    plugin.spinner = new Spinner(spinOpt).spin();
                    simpleLoaderAnimation(element,animOpt,spinOpt);
                    break;
            }

        }

        
        /*  
            ==================================================
            PUBLICS
            ================================================== 
        */
        
        plugin.stop = function() {
            //console.log('stop --> publicCalled '+plugin.settings.animation.name);
            switch(plugin.settings.animation.name) {
                case "simpleLoader":
                    simpleLoaderAnimationExit();
                    break;
                case "doubleLoader":
                    doubleLoaderAnimationExit();
                    break;    
            }
            
        }

        
        /*  
            ==================================================
            PRIVATES
            ================================================== 
        */
        
        // ------------------------- simpleLoaderAnimation ----------------------------------
        
        var simpleLoaderAnimation = function(element,animOpt,spinOpt) {
            //console.log('simpleLoaderAnimation --> privateCalled '+plugin.settings.animation.options.effect);
            
            // onBefore function 
            animOpt.onBefore();  
            
            var styleClass = 'theme-'+ animOpt.style;
            if (animOpt.fixed === false) {
                $(element).addClass('absolute');
                $(element).parent().css({'position':'relative','overflow':'hidden'});
            }
            $(element).addClass('introLoader simpleLoader ' + styleClass);
            
            var markup  = '';
                markup += '<div id="introLoaderSpinner" class="introLoaderInner">';
                markup += '</div>';

            $(element).html(markup);
            $(element).show();

            var target = document.getElementById('introLoaderSpinner');
            plugin.spinner.spin(target);
            
            
            if (animOpt.stop === true) {
                $(window).on('load', function() {
                    simpleLoaderAnimationExit();
                });
            }
        }
        
        var simpleLoaderAnimationExit = function() {
            //console.log('simpleLoaderAnimationExit --> privateCalled '+plugin.settings.animation.options.effect);
            var animOpt = plugin.settings.animation.options; 
            setTimeout(function() {
                           
                switch(animOpt.effect) {
                    case "fadeOut":
                        $(element).fadeOut(
                            animOpt.animationTime, 
                            animOpt.ease,
                            function() {
                                $('#introLoaderSpinner').remove();
                                animOpt.onAfter() // onAfter function
                            }
                        );
                        break;

                    case "slideUp":
                        plugin.spinner.stop();
                        $(element).animate(
                            {"bottom":$(window).height()},
                            animOpt.animationTime, 
                            animOpt.ease,
                            function () {
                                $(element).hide();
                                $('#introLoaderSpinner').remove();
                                animOpt.onAfter(); // onAfter function
                            }
                        );
                        break;

                    case "slideDown":
                        plugin.spinner.stop();
                        $(element).animate(
                            {"top":$(window).height()},
                            animOpt.animationTime, 
                            animOpt.ease,
                            function () {
                                $(element).hide();
                                $('#introLoaderSpinner').remove();
                                animOpt.onAfter(); // onAfter function
                            }
                        );
                        break;

                    case "slideLeft":
                        plugin.spinner.stop();
                        $(element).animate(
                            {"right":$(window).width(),"left":"-100%"},
                            animOpt.animationTime, 
                            animOpt.ease,
                            function () {
                                $(element).hide();
                                $('#introLoaderSpinner').remove();
                                animOpt.onAfter(); // onAfter function
                            }
                        );
                        break; 
                    case "slideRight":
                        plugin.spinner.stop();
                        $(element).animate(
                            {"left":$(window).width(),"right":"-100%"},
                            animOpt.animationTime, 
                            animOpt.ease,
                            function () {
                                $(element).hide();
                                $('#introLoaderSpinner').remove();
                                animOpt.onAfter(); // onAfter function
                            }
                        );
                        break;    
                    default:
                        $(element).hide();
                        break;
                }
                

            }, animOpt.delayTime);
            
        }

        // ----------------------------------------------------------------------------------
        
        
        // ------------------------- doubleLoaderAnimation ----------------------------------
        
        var doubleLoaderAnimation = function(element,animOpt) {
            // onBefore function 
            animOpt.onBefore(); 
            
            var styleClass = 'theme-'+ animOpt.style;
            if (animOpt.fixed === false) {
                $(element).addClass('absolute');
                $(element).parent().css({'position':'relative','overflow':'hidden'});
            }
            $(element).addClass('introLoader doubleIntroLoader ' + styleClass);
            
            var markup  = '';
                markup += '<div class="introLoaderTop"></div>';
                markup += '<div class="introLoaderBottom"></div>';
                markup += '<div class="doubleIntroLoaderProgBar"><span></span></div>';

            $(element).html(markup);
            $(element).show();     
            
            if (animOpt.stop === true) {
                $(window).on('load', function() {
                    doubleLoaderAnimationExit();
                });       
            }
            
        }
        
        var doubleLoaderAnimationExit = function() {
            
            var animOpt = plugin.settings.animation.options; 
            
            setTimeout(function() {
                
                $(element).find('.doubleIntroLoaderProgBar').find('span').animate(
                    {'width':'100%'},
                    animOpt.progbarAnimationTime, 
                    animOpt.ease,
                    slidingDoorsVertical()
                );
                
            }, animOpt.delayTime ); // end Timeout
            
            function slidingDoorsVertical() {
                setTimeout(function() {
                    $(element).find('.doubleIntroLoaderProgBar').hide();
                    $(element).find('.introLoaderTop, .introLoaderBottom').animate(
                        {'height':0},
                        animOpt.animationTime, 
                        animOpt.ease,
                        function() {
                            $(element).hide();
                            animOpt.onAfter(); // onAfter function
                        }
                    );
                }, animOpt.progbarAnimationTime + animOpt.progbarDelayAfter ); // end Timeout    
            } // end slidingDoorsVertical()
        }
                
        plugin.init();

    }

    
    $.fn.introLoader = function(options) {

        
        return this.each(function() {
  
            if (undefined == $(this).data('introLoader')) {
                var plugin = new $.introLoader(this, options);
                //console.log('PLUGIN');
                $(this).data('introLoader', plugin);
                
            }else{
                $(this).removeData('introLoader');
                var plugin = new $.introLoader(this, options);
                $(this).data('introLoader', plugin);
            }

        });

    }

})(jQuery);