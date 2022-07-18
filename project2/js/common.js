var common = function () {

	var siteHeadScroll = function(){
		jQuery(window).scroll(function(){
			if (jQuery(window).scrollTop() > 70) {
			   jQuery('.site_header').addClass('fixed_header');
			}
			else {
			   jQuery('.site_header').removeClass('fixed_header');
			}
		});
	};

	var siteInputFocus = function(){
		jQuery(".inputFocus > input").on("focusin", function(){
			jQuery(this).parent().addClass("on");
		}).on("focusout", function(){
			jQuery(this).parent().removeClass("on");
		});
	}

    return {
        init :function(){
			
			siteHeadScroll();
			siteInputFocus();
			jQuery(window).resize(function(){
				
			});
		}
    };
}();