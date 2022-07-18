var $win         = jQuery(window),
	  $body      = jQuery("body"),
      $header   = jQuery(".header"),
      $footer    = jQuery(".footer");

var Common = function () {
	
	// 기본세팅
	var defaultSetting = function(){
		var default_h = $win.height();

		jQuery(".wrap").css("min-height", default_h);
		var CURRENT_URL = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
		jQuery('.child_menu a[href="'+CURRENT_URL+'"]').parent("li").addClass("current_page").parents("ul", this).slideDown().parent().addClass("active").parent().addClass("showing"); // 사이드 메뉴 페이지 해당 메뉴 활성화
		
		//코드 복제
		jQuery.fn.outerHTML = function() {
			var el = jQuery(this);
			if( !el[0] ) return "";
		 
			if (el[0].outerHTML) {
				return el[0].outerHTML;
			} else {
				var content = el.wrap('<p/>').parent().html();
				el.unwrap();
				return content;
			}
		}

	}
	//dropdown
	var handleDropdown = function(){
		var $dropDown = jQuery(".dropdown");
		$dropDown.on("click", function(event){
			event.preventDefault();
			var isShowing = false;
			if (jQuery(this).hasClass("dropdown_show")) {
				isShowing = true;
			}
			jQuery(this).hasClass("dropdown_show") ?  $dropDown.removeClass("dropdown_show").next("ul").stop(true).slideUp("fast") : $dropDown.removeClass("dropdown_show").next("ul").stop(true).slideUp("fast"),  isShowing ?  $dropDown.removeClass("dropdown_show").next("ul").stop(true).slideUp("fast")  : jQuery(this).addClass("dropdown_show").next("ul").stop(true).slideDown();
		});		
	}

	//사이드 메뉴
	var handleSnbMenu = function () {
		var $snbMenu		 = jQuery('.nav_menu'),
			  $snbMenu_li     = $snbMenu.find('> li'),
			  $snbMenu_li_a = $snbMenu_li.find('> a'),
			  $childMenu       = jQuery('.child_menu');
			  
		$snbMenu_li_a.on('click', function(event ){
			event.preventDefault();
			var $this         = jQuery(this);
				  isShowing = false;
			if ($this.parent('li').hasClass("active")) {
				isShowing = true;
			}
			if($snbMenu.hasClass("showing")){
				$snbMenu_li.removeClass("active");
				$childMenu.stop(true).slideUp();
				if(isShowing){
					$snbMenu.removeClass("showing");
					$childMenu.stop(true).slideUp();
				}else{
					$this.parent('li').addClass("active");
					$this.next('ul').stop(true).slideDown();
				}
			}else{
				$snbMenu.addClass("showing");
				$this.parent('li').addClass("active");
				$this.next('ul').stop(true).slideDown();
			}
		});
		var $toggleBtn = jQuery(".snb_toggle");
		$toggleBtn.on("click", function(){
			$snbMenu_li.removeClass("active");
			$childMenu.hide();
			jQuery("body").toggleClass("nav_sm");
		});
	}

	//slide page
	var handleSlidePage = function(){
		var $pageBtn   = jQuery(".slide_page_btn"),
		      $slidePage = jQuery(".slide_page");
			  $closeBtn  = $slidePage.find(".close_btn");

		$pageBtn.on("click", function(event){
			event.preventDefault();
			var href = jQuery(this).attr("href");
			$body.addClass("body_fixed");
			$slidePage.addClass("slide_show").children(".inner").load(href);
			
		}),$closeBtn.on("click", function(){
			$slidePage.removeClass("slide_show").children(".inner").empty();
			$body.removeClass("body_fixed");
		});
	}

	//box resizable
	var handleResizable = function(){
		var $resizableBox = jQuery(".element_box");

		$resizableBox.each(function(index){
			$resizableBox.eq(index).resizable({
				handles: 'e',
				helper: "ui-resizable-helper",
				start: function(event, ui) {
					jQuery(this).removeClass("col12 col9 col8 col6 col4 col3 col1");
				},
				stop: function(event, ui) {
					var boxWidth = jQuery(this).innerWidth() * 100 / jQuery(this).parent().width();			
					if (boxWidth >= 88 && boxWidth <= 100) {
						percentageClass = "col12"
					}
					if (boxWidth >= 67 && boxWidth < 88) {
						percentageClass = "col9"
					}
					if (boxWidth >= 50 && boxWidth < 67) {
						percentageClass = "col8"
					}
					if (boxWidth >= 34 && boxWidth < 50) {
						percentageClass = "col6"
					}
					if (boxWidth >= 25 && boxWidth < 34) {
						percentageClass = "col4"
					}
					if (boxWidth >= 8 && boxWidth < 25) {
						percentageClass = "col3"
					}
					if (boxWidth < 8) {
						percentageClass = "col1"
					}
					jQuery(this).addClass(percentageClass);					
				}
			});
		});
	}
	
	// element add delete clone
	var handleElement = function(){
		var iCnt = 0;
		var iCnt_total = 10;
		var isSection = false;
		var $cont_body = jQuery(".cont_body > .container");

		jQuery(document).on("click", ".el_add_btn", function(){
			if(jQuery(this).hasClass("el_add_to_section")){
				box_id = jQuery(this).closest(".element_box").attr("id");
				isSection = true;
			}else{
				isSection = false;
			}
			jQuery(".element_add_wrap, .fixed_bg").fadeIn();
		}),jQuery(".element_close").on("click", function(){
			jQuery(this).parents(".element_add_wrap").fadeOut().next().fadeOut();;
		});

		jQuery(document).on("click", ".add_btn", function(event){
			event.preventDefault();
			var option = jQuery(this).attr("data-option");
			
			if(iCnt <= iCnt_total){
				iCnt = iCnt + 1;
				if(option == "btn"){
					var option = '';
					option += '<div class="transformarBox_wrap element_box" id="element_box'+iCnt+'">';
					option += '	<div class="container">';
					option += '		<div class="transformarBox_tit">'
					option += '			<i class="fa fa-hand-o-up" aria-hidden="true"></i>'
					option += '			<span data_default_txt="Button">Button</span>'
					option += '		</div>';
					option += '		<div class="transformarBox_controls">';
					option += '			<a class="element_delete" href="#" title="Delete">';
					option += '				<i class="fa fa-trash" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_save" href="#" title="Save">';
					option += '				<i class="fa fa-floppy-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_clone" href="#" title="Duplicate">';
					option += '				<i class="fa fa-files-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_edit" href="#" title="Edit">';
					option += '				<i class="fa fa-pencil" aria-hidden="true"></i>';
					option += '			</a>';
					option += '		</div>';
					option += '	</div>';
					option += '</div>';
				}else if(option == "text"){
					var option = '';
					option += '<div class="transformarBox_wrap element_box"  id="element_box'+iCnt+'">';
					option += '	<div class="container">';
					option += '		<div class="transformarBox_tit">';
					option += '			<i class="fa fa-hand-o-up" aria-hidden="true"></i>'
					option += '			<span data_default_txt="Text Block">Text Block</span>'
					option += '       </div>'
					option += '		<p class="transformarBox_cont">This is a text block. Click the edit button to change this text.</p>';
					option += '		<div class="transformarBox_controls">';
					option += '			<a class="element_delete" href="#" title="Delete">';
					option += '				<i class="fa fa-trash" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_save" href="#" title="Save">';
					option += '				<i class="fa fa-floppy-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_clone" href="#" title="Duplicate">';
					option += '				<i class="fa fa-files-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_edit" href="#" title="Edit">';
					option += '				<i class="fa fa-pencil" aria-hidden="true"></i>';
					option += '			</a>';
					option += '		</div>';
					option += '	</div>';
					option += '</div>';					
				}else if(option == "fadeSlide"){
					var option = '';
					option += '<div class="fadeBox_wrap element_box" id="element_box'+iCnt+'">';
					option += '	<div class="container">';
					option += '		<div class="fadeBox_items">';
					option += '			<div>1</div>';
					option += '			<div>2</div>';
					option += '			<div>3</div>';
					option += '		</div>';
					option += '		<div class="fadeBox_dots">';
					option += '			<div class="dots current"></div>';
					option += '			<div class="dots"></div>';
					option += '			<div class="dots"></div>';
					option += '		</div>';
					option += '		<div class="fadeBox_arrows">';
					option += '			<button>';
					option += '				<i class="fa fa-chevron-left" aria-hidden="true"></i>';
					option += '			</button>';
					option += '			<button>';
					option += '				<i class="fa fa-chevron-right" aria-hidden="true"></i>';
					option += '			</button>';
					option += '		</div>';
					option += '		<div class="fadeBox_controls">';
					option += '			<a class="element_delete" href="#" title="Delete">';
					option += '				<i class="fa fa-trash" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_save" href="#" title="Save">';
					option += '				<i class="fa fa-floppy-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_clone" href="#" title="Duplicate">';
					option += '				<i class="fa fa-files-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_edit" href="#" title="Edit">';
					option += '				<i class="fa fa-pencil" aria-hidden="true"></i>';
					option += '			</a>';
					option += '		</div>';
					option += '	</div>';
					option += '</div>';
				}else if(option == "section"){
					var option = '';
					option += '<section class="contBox_wrap element_box" id="element_box'+iCnt+'">';
					option += '	<div class="container">';
					option += '		<header class="contBox_head">';
					option += '			<h4 data_default_txt="Section">Section</h4>';
					option += '			<ul class="tool">';
					option += '				<li>';
					option += '					<button class="element_delete">';
					option += '						<i class="fa fa-trash" aria-hidden="true"></i>';
					option += '					</button>';
					option += '				</li>';
					option += '				<li>';
					option += '					<button class="element_save">';
					option += '						<i class="fa fa-floppy-o" aria-hidden="true"></i>';
					option += '					</button>';
					option += '				</li>';
					option += '				<li>';
					option += '					<button class="element_clone">';
					option += '						<i class="fa fa-files-o" aria-hidden="true"></i>';
					option += '					</button>';
					option += '				</li>';
					option += '				<li>';
					option += '					<button class="element_edit">';
					option += '						<i class="fa fa-pencil" aria-hidden="true"></i>';
					option += '					</button>';
					option += '				</li>';
					option += '			</ul>';
					option += '		</header>';
					option += '		<div class="contBox_body">';
					option += '			<div class="contBox_section sortable_box">';
					option += '			</div>';
					option += '		</div>';
					option += '		<footer class="contBox_foot">';
					option += '			<button class="el_add_btn el_add_to_section">';
					option += '				<i class="fa fa-plus" aria-hidden="true"></i>';
					option += '			</button>';
					option += '		</footer>';
					option += '	</div>';
					option += '</section>';
				}else if(option == "pageBtn"){
					var option = '';
					option += '<div class="transformarBox_wrap element_box" id="element_box'+iCnt+'">';
					option += '	<div class="container">';
					option += '		<a href="test.html" class="slide_page_btn">PAGE</a>';
					option += '		<div class="transformarBox_controls">';
					option += '			<a class="element_delete" href="#" title="Delete">';
					option += '				<i class="fa fa-trash" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_save" href="#" title="Save">';
					option += '				<i class="fa fa-floppy-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_clone" href="#" title="Duplicate">';
					option += '				<i class="fa fa-files-o" aria-hidden="true"></i>';
					option += '			</a>';
					option += '			<a class="element_edit" href="#" title="Edit">';
					option += '				<i class="fa fa-pencil" aria-hidden="true"></i>';
					option += '			</a>';
					option += '		</div>';
					option += '	</div>';
					option += '</div>';
				}
					
				jQuery(".element_add_wrap, .fixed_bg").fadeOut();
				jQuery(".el_loading").addClass("loading");
				jQuery(".el_emplty").hide();

				if(isSection){ //section 안에 element 추가시
					setTimeout(function() {
						jQuery(".el_loading").removeClass("loading");
						jQuery("#"+box_id+"").find(".contBox_section").append(option);
					}, 800);
				}else{
					setTimeout(function() {
						jQuery(".el_loading").removeClass("loading");
						$cont_body.append(option);
					}, 800);
				}
			}else{
				alert("Reached the limit");
			}
			setTimeout(function() {
				handleResizable();
				handleSortable();
				handleSlidePage();
				handleFadeInBox({
					autoPlay: false
				});
			}, 900);
			
		});

		var sfTranslatedText = jQuery(".spb_translated_objects");
		var el_num;

		jQuery(document).on("click", "#builder_save_btn", function(){
			var status = jQuery(".el_emplty").css("display");
			if(status =="none"){
				var a = '<div class="modal_wrapper"><div id="modal1" class="modal modal_spb"><div class="modal-content">';
				a += "<h4>" + sfTranslatedText.attr("data-spb-save-template-header") + "</h4>";
				a += '<div class="modal-footer modal-save-template"><a href="#!" class=" modal-ok-button">OK</a><a href="#!" class="modal_cancel_button">Cancel</a></div></div></div></div>';	
				jQuery("#spb").append(a);
				setTimeout(function() {
					jQuery("#modal1").addClass("modal_show");
				}, 100);
			}else{
				alert("there's nothing here yet, add something to get started");
			}
		});

		jQuery(document).on("click", ".element_delete", function(b) {
			b.preventDefault();
			var a = '<div class="modal_wrapper"><div id="modal1" class="modal modal_spb"><div class="modal-content">';
			a += "<h4>" + sfTranslatedText.attr("data-spb-delete-element-header") + "</h4>";
			a += '<div class="modal-footer modal-delete-element"><a href="#!" class=" modal-ok-button">OK</a><a href="#!" class="modal_cancel_button">Cancel</a></div></div></div></div>';
			jQuery("#spb").append(a);
			setTimeout(function() {
				jQuery("#modal1").addClass("modal_show");
			}, 100);
			el_num = jQuery(this).parents(".element_box").attr("id");
		});

		jQuery(document).on("click", ".element_clone", function(l){
			l.preventDefault();
			var b = jQuery(this).closest(".element_box"),
				  a = b.outerHTML(),
				  a = a.replace("active", "");

			var c = "<div class='complete_pop'>";
			c += "Duplicate";
			c += "</div>";

			if(iCnt <= iCnt_total){
				iCnt = iCnt + 1;
				jQuery(this).closest(".element_box").after(a);
				jQuery(".cont_body").append(c);
				setTimeout(function() {
					jQuery(".complete_pop").fadeOut( function() { $(this).remove(); });
				}, 400);
			}else{
				alert("Reached the limit");
			}
		});

		jQuery(document).on("click", ".element_edit", function(e){
			e.preventDefault();
			var el_box = jQuery(this).closest(".element_box"),
				  el_txt  = el_box.find("*[data_default_txt]").first();
			el_txt.attr("contenteditable", "true").get(0).focus();
			el_txt.addClass("focus");
		});

		jQuery(document).on("click", ".element_save", function(e){
			e.preventDefault();
			var el_box = jQuery(this).closest(".element_box"),
				  el_txt  = el_box.find("*[data_default_txt]");
			var a = "<div class='complete_pop'>";
			a += "Save";
			a += "</div>";
			jQuery(".cont_body").append(a);
			el_txt.attr("contenteditable", "false").focusout().removeClass("focus");			
			setTimeout(function() {
				jQuery(".complete_pop").fadeOut( function() { $(this).remove(); });
			}, 400);
		});

		jQuery(document).on("click", ".modal-save-template .modal-ok-button", function() {
			console.log(jQuery(".cont_body").outerHTML());
			jQuery(".modal_wrapper").remove();	
		});
		
		jQuery(document).on("click", ".modal-delete-element .modal-ok-button", function() {
			var $el_box = jQuery("#"+el_num+"").find(".element_box "),
			      box_size = $el_box.size();

			var a = "<div class='complete_pop'>";
			a += "Delete";
			a += "</div>";
			
			if(box_size > 0){
				iCnt = iCnt - box_size -1;
			}else{
				iCnt = iCnt - 1;
			}
			if(iCnt == 0){
				jQuery(".el_emplty").delay(100).fadeIn("fast");
			}
			jQuery("#"+el_num+"").remove();
			jQuery(".modal_wrapper").remove();
			jQuery(".cont_body").append(a);
			setTimeout(function() {
				jQuery(".complete_pop").fadeOut( function() { $(this).remove(); });
			}, 400);
		});

		jQuery(document).on("click", ".modal_cancel_button", function() {
			jQuery(".modal_wrapper").remove();
		});

		jQuery(document).on("mouseenter", ".element_box",  function(i) {
			jQuery(this).hasClass("contBox_wrap") ? "" : jQuery(this).find(".transformarBox_controls, .fadeBox_controls").first().addClass("active");
		});

		jQuery(document).on("mouseleave", ".element_box",  function(i) {
			jQuery(this).find(".transformarBox_controls, .fadeBox_controls").removeClass("active");
			if (jQuery(this).find(".el_name_editor").css("display") == "block") {
				jQuery(this).find(".el_name_editor").hide();
				jQuery(this).find(".el_name_editor").prev().show()
			}
			i.stopImmediatePropagation()
		});

	}

	//sortable
	var handleSortable = function(){

		jQuery("#sortable_wrap").sortable({
			connectWith: ".sortable_box",
			cancel:".el_emplty"
		});
		jQuery(".sortable_box").sortable({
			connectWith: "#sortable_wrap, .sortable_box"
		});

	}

	//box fade
	var handleFadeInBox = function(options){
		var defaults = {
			autoPlay : false
		};
		var settings = $.extend({}, defaults, options);

		var $fadeBox          = jQuery(".fadeBox_dots"),
			  $fadeBox_dot   = $fadeBox.find("> .dots"),
			  cont                  = 0;

		$fadeBox_dot.eq(0).addClass("current");
		
		//arow
		jQuery(document).on("click", ".fadeBox_arrows button", this,  function(){
			var $fadeBoxi_tem  = jQuery(this).parent().siblings(".fadeBox_items").children(),
				  $fadeBox_dot   = jQuery(this).parent().siblings(".fadeBox_dots").children(),
				  band                 = $fadeBoxi_tem.size() - 1;

			$fadeBox_dot.removeClass("current");
			$fadeBoxi_tem.hide();
			if(jQuery(this).index() ==1 ){
				 cont = cont < band ? cont += 1 : 0 ;    
				console.log("next");
			}else{
				cont = cont > 0 ? cont -= 1 : band;
				console.log("prev");
			}
			$fadeBox_dot.eq(cont).addClass("current");
			$fadeBoxi_tem.eq(cont).stop(true).fadeIn("fast");
		});

		//dot
		jQuery(document).on("click", ".fadeBox_dots .dots", this, function(){
			var  $fadeBoxi_tem  = jQuery(this).parent().siblings(".fadeBox_items").children();
			jQuery(this).parent(".fadeBox_dots").children().removeClass("current");
			$fadeBoxi_tem.hide();
			cont = jQuery(this).index();    
			jQuery(this).addClass("current");
			$fadeBoxi_tem.eq( cont ).stop(true).fadeIn("fast");
		  });
		  
		//auto
		var autoSlide;
		function slideBoxInterval(){ 
			autoSlide = setInterval(function(){
				$fadeBox_dot.removeClass("current");
				$fadeBoxi_tem.eq( cont ).fadeOut(1300);
				cont = cont < band ? cont += 1 : 0 ;    
				$fadeBox_dot.eq( cont ).addClass("current");
				$fadeBoxi_tem.eq( cont ).fadeIn(2500);
			}, 3000); 
		}

		return jQuery(this).each(function(){
			if(settings.autoPlay == false){
				
			}else{
				slideBoxInterval();
				$(".fadeBox_items").hover(function(){
					// stop autoSlide 
					clearInterval(autoSlide);
				}, function(){
					// reset autoSlide
					slideBoxInterval();
				});
			}
		});
	}

	var handleTab = function(){
		var $tabNav        = jQuery(".tab_nav"),
			  $tabNav_li     = $tabNav.find("> li"),
			  $tabNav_li_a = $tabNav_li.find("> a");
		
		$tabNav_li_a.on("click", function(event){
			event.preventDefault();
			var href = jQuery(this).attr("href");
			jQuery(".tabs_content").hide();
			jQuery(href).show();
			$tabNav_li.removeClass("active");
			jQuery(this).parent().addClass("active");
		});

	};

    return {
        init :function(){
			defaultSetting();
			handleDropdown();
			handleElement();			
			handleFadeInBox({
				autoPlay: false
			});
			handleResizable();
			handleSlidePage();
			handleSortable();
			handleSnbMenu();
			handleTab();
			

			jQuery(window).resize(function(){
				handleResizable();
			});
		}
    };
}();        


