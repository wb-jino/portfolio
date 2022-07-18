var builder = function () {
	var $win         = jQuery(window),
	      $body      = jQuery("dac_body"),
          $header   = jQuery(".dac_header"),
          $footer    = jQuery(".dac_footer");
	
	var el_empty = '<div class="el_empty">';
	      el_empty += "<h3>there's nothing here yet,<br> add something to get started</h3>";
	      el_empty += '<button class="el_add_btn" id="step5"><i class="fa fa-plus" aria-hidden="true"></i></button></div>';

	// 기본세팅
	var defaultSetting = function(){
		var default_h = $win.height(),
		      CURRENT_URL = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
		
		jQuery(".dac_wrap").css("min-height", default_h);
		jQuery('.child_menu a[href="'+CURRENT_URL+'"]').parent("li").addClass("current_page").parents("ul", this).slideDown().parent().addClass("active").parent().addClass("showing"); // 사이드 메뉴 페이지 해당 메뉴 활성화		
		jQuery(".report_wrap > .container").append(el_empty);

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

	//box resizable
	var handleResizable = function(){
		var $resizableBox = jQuery(".el_box");

		$resizableBox.each(function(index){
			$resizableBox.eq(index).resizable({
				handles: 'e',
				helper: "ui-resizable-helper",
				start: function(event, ui) {
					jQuery(this).removeClass("col12 col9 col8 col6 col4 col3 col1");
				},
				stop: function(event, ui) {
					var boxWidth = jQuery(this).innerWidth() * 100 / jQuery(this).parent().width();			
					var width_txt = jQuery(this).find(".el_width");
					if (boxWidth >= 88 && boxWidth <= 100) {
						percentageClass = "col12",
						width_txt.text("← 1/1 →")
					}
					if (boxWidth >= 67 && boxWidth < 88) {
						percentageClass = "col9",
						width_txt.text("← 3/4 →")
					}
					if (boxWidth >= 50 && boxWidth < 67) {
						percentageClass = "col8",
						width_txt.text("← 2/3 →")
					}
					if (boxWidth >= 34 && boxWidth < 50) {
						percentageClass = "col6",
						width_txt.text("← 1/2 →")
					}
					if (boxWidth >= 25 && boxWidth < 34) {
						percentageClass = "col4",
						width_txt.text("← 1/3 →")
					}
					if (boxWidth >= 8 && boxWidth < 25) {
						percentageClass = "col3",
						width_txt.text("← 1/4 →")
					}
					if (boxWidth < 8) {
						percentageClass = "col1",
						width_txt.text("← 1/12 →")
					}
					jQuery(this).addClass(percentageClass);					
				}
			});
		});
	}
	
	// element add delete clone
	var handleElement = function(){
		var iCnt = 0,
		      iCnt_total = 100,
		      id_num = 0,
		      isSection = false,
		      $cont_body = jQuery(".cont_body > .container");

		jQuery(document).on("click", ".el_add_btn", function(){
			if(jQuery(this).hasClass("el_add_to_section")){
				box_id = jQuery(this).closest(".el_page_box").attr("id");
				isSection = true;
			}else{
				isSection = false;
			}
			jQuery(".element_add_wrap, .fixed_bg").fadeIn();
		});
			jQuery(document).on("click", ".element_close", function(){
			jQuery(".element_add_wrap, .fixed_bg").fadeOut();
		});

		jQuery(document).on("click", ".add_btn", function(event){
			event.preventDefault();
			var option = jQuery(this).attr("data-option");
			if(iCnt <= iCnt_total){
				iCnt = iCnt + 1;
				id_num = id_num + 1;
				jQuery.ajax({
					type : "post",
					url : "element/"+option+".html",
					dataType : "html",
					success : function(data){
						jQuery(".element_add_wrap, .fixed_bg").fadeOut();
						jQuery(".el_empty").remove();
						var data = jQuery(data);
						data.attr("id", "el_box"+id_num+"");
						data.find(".el_content").attr("id", "ckeditor"+id_num+"");
						console.log(id_num);
						if(isSection){ //section 안에 element 추가시
							jQuery("#"+box_id+"").find(".page_content").first().append(data);
						}else{
							$cont_body.append(data);
						}
						setTimeout(function() {
							handleResizable();
							handleSortable();
						}, 900);
					},
					beforeSend:function(){
						var el_loading = '<div class="el_loading">';
						el_loading += '<img src="images/viewLoading.gif" alt="">';
						el_loading += '</div>';
						jQuery(".report_wrap .container").append(el_loading);
					},
					complete:function(){
						jQuery(".el_loading").remove();
					},
					error : function(){
						alert("통신실패");
					}
				});
			}else{
				alert("Reached the limit");
			}
		});

		var sfTranslatedText = jQuery(".dac_translated_objects");
		var el_id;

		// 빌드 페이지 저장 버튼 클릭시
		jQuery(document).on("click", "#builder_save_btn", function(){
			var status = jQuery(".el_empty").length;
			if(status == 0 ){
				var a = '<div class="modal_wrapper"><div id="modal1" class="modal modal_spb"><div class="modal-content">';
				a += "<h4>" + sfTranslatedText.attr("data-spb-save-template-header") + "</h4>";
				a += '<div class="modal-footer modal-save-template"><a href="#!" class=" modal-ok-button">OK</a><a href="#!" class="modal_cancel_button">Cancel</a></div></div></div></div>';	
				jQuery("#dac").append(a);
				setTimeout(function() {
					jQuery("#modal1").addClass("modal_show");
				}, 100);
			}else{
				alert("there's nothing here yet, add something to get started");
			}
		});

		// 빌드 페이지 저장
		jQuery(document).on("click", ".modal-save-template .modal-ok-button", function() {
			console.log(jQuery(".cont_body > .container").html());
			jQuery(".modal_wrapper").remove();	
		});

		// 미리보기
		jQuery(document).on("click", "#builder_preview_btn", function(){
			var report_preveiw = jQuery(".report_wrap .container").html();
			jQuery(".preview_pop, .fixed_bg").fadeIn();
			report_preveiw = jQuery(report_preveiw).addClass("report");
			jQuery(".preview_area").append(report_preveiw);
			$body.addClass("body_fixed");
		});
		// 미리보기 닫기
		jQuery(document).on("click", ".preview_close", function(){
			jQuery(".preview_pop, .fixed_bg").fadeOut();
			jQuery(".preview_area").empty();
			$body.removeClass("body_fixed");
		});


		//불러오기
		jQuery(document).on("click", "#test_btn", function(){
			jQuery(".el_empty").remove();
			jQuery.ajax({
				type : "post",
				url : "test.html",
				dataType : "html",
				success : function(data){
					var data = jQuery(data);
					jQuery(".el_empty ").remove();
					jQuery(".cont_body > .container").append(data);					
					setTimeout(function() {
						handleResizable();
						handleSortable();
					}, 900);
				},
				beforeSend:function(){
					var el_loading = '<div class="el_loading">';
					el_loading += '<img src="images/viewLoading.gif" alt="">';
					el_loading += '</div>';
					jQuery(".report_wrap .container").append(el_loading);
				},
				complete:function(){
					jQuery(".el_loading").remove();
				},
				error : function(){
					alert("통신실패");
				}
			});
		});

		// element 삭제 버튼 클릭시
		jQuery(document).on("click", ".element_delete", function(b) {
			b.preventDefault();
			var a = '<div class="modal_wrapper"><div id="modal1" class="modal modal_spb"><div class="modal-content">';
			a += "<h4>" + sfTranslatedText.attr("data-spb-delete-element-header") + "</h4>";
			a += '<div class="modal-footer modal-delete-element"><a href="#!" class=" modal-ok-button">OK</a><a href="#!" class="modal_cancel_button">Cancel</a></div></div></div></div>';
			jQuery("#dac").append(a);
			setTimeout(function() {
				jQuery("#modal1").addClass("modal_show");
			}, 100);
			el_id = jQuery(this).parents(".el_wrap").attr("id");
		});

		// element 삭제
		jQuery(document).on("click", ".modal-delete-element .modal-ok-button", function() {
			var $el_box = jQuery("#"+el_id+"").find(".el_wrap "),
			      box_size = $el_box.length;

			var a = "<div class='complete_pop'>";
			a += "Delete";
			a += "</div>";
			
			if(box_size > 0){
				iCnt = iCnt - box_size -1;
			}else{
				iCnt = iCnt - 1;
			}
			if(iCnt == 0){
				jQuery(".report_wrap .container").append(el_empty);
			}
			jQuery("#"+el_id+"").remove();
			jQuery(".modal_wrapper").remove();
			jQuery(".cont_body").append(a);
			setTimeout(function() {
				jQuery(".complete_pop").fadeOut( function() { $(this).remove(); });
			}, 400);
		});
		
		// element 복제
		jQuery(document).on("click", ".element_clone", function(l){
			l.preventDefault();
			var el_clone_num = jQuery(this).parents(".el_wrap").attr("id"),
			      $el_clone_box = jQuery("#"+el_clone_num+"").find(".el_wrap "),
				  clone_box_size = $el_clone_box.length;

			var b = jQuery(this).closest(".el_wrap"),
				  a = b.outerHTML(),
				  a = a.replace("active", "");
				  data = jQuery(a);
				  
			var c = "<div class='complete_pop'>";
			c += "Duplicate";
			c += "</div>";

			if(iCnt <= iCnt_total){
				if(clone_box_size < 0){
					iCnt = iCnt + 1;
					id_num = id_num + 1;

					data.find(".el_content").attr("id", "ckeditor"+iCnt+"");
				}else{
					iCnt = iCnt + clone_box_size + 1;
					id_num = id_num + 1;

					var el_wrap = data.find(".el_wrap");
					jQuery.each(el_wrap, function(index, item){
						var index = id_num + index + 1;
						jQuery(item).attr("id", "el_box"+index +"");
						jQuery(item).find(".el_content").attr("id", "ckeditor"+index+"");
					});
				}				
				data.attr("id", "el_box"+id_num+"");	
				id_num = id_num + clone_box_size;
				jQuery(this).closest(".el_wrap").after(data);
				jQuery(".cont_body").append(c);
				setTimeout(function() {
					jQuery(".complete_pop").fadeOut( function() { $(this).remove(); });
					handleResizable();
					handleSortable();
				}, 400);
			}else{
				alert("Reached the limit");
			}
			console.log(id_num)
		});

		// element 수정
		jQuery(document).on("click", ".element_edit", function(e){
			jQuery(this).parent().addClass("edit_active");
			jQuery(".sortable_wrap").sortable("destroy");
			jQuery(".sortable_box").sortable("destroy");
			var el_cont_id = jQuery(this).parent().siblings(".el_content").attr("id");
			jQuery('#'+el_cont_id+'').attr("contenteditable", "true");
			CKEDITOR.inline( ''+el_cont_id+'' , {
				removePlugins: 'stylescombo',
				language: 'en',
				startupFocus: true
			});
			e.preventDefault();
		});

		//element 저장
		jQuery(document).on("click", ".element_save", function(e){
			jQuery(this).parent().removeClass("edit_active");
			var el_cont_id = jQuery(this).parent().siblings(".el_content").attr("id");
			jQuery('#'+el_cont_id+'').attr("contenteditable", "false");
			CKEDITOR.instances[''+el_cont_id+''].destroy();
			handleSortable();
			e.preventDefault();
		});

		// element 취소
		jQuery(document).on("click", ".modal_cancel_button", function() {
			jQuery(".modal_wrapper").remove();
		});

		// element 마우스 enter
		jQuery(document).on("mouseenter", ".el_box",  function(i) {
			jQuery(this).hasClass("el_block_box") ? "" : jQuery(this).find(".el_controls").first().addClass("active");
		});
		
		// element 마우스 leave
		jQuery(document).on("mouseleave", ".el_box",  function(i) {
			jQuery(this).find(".el_controls").removeClass("active");
			if (jQuery(this).find(".el_name_editor").css("display") == "block") {
				jQuery(this).find(".el_name_editor").hide();
				jQuery(this).find(".el_name_editor").prev().show()
			}
			i.stopImmediatePropagation()
		});
		
		// 이미지 추가
		jQuery(document).on("change", ".drop_target", function(){
			var el_box = jQuery(this).closest(".el_box");
			var file = jQuery(this).find("input").get(0).files[0],
				 reader = new FileReader();
			
			reader.onload = function(event) {
				el_box.find(".img").attr("src", event.target.result);
			}
			jQuery(this).addClass("img_show");
			reader.readAsDataURL(file);
		});
		
		// 이미지 삭제
		jQuery(document).on('click', ".remove_current_image", function(e) {
			e.preventDefault();
		  var el_box = jQuery(this).closest(".el_box");
		  el_box.find(".drop_target").removeClass("img_show");
		  el_box.find(".img").attr("src", "");
		});
	}

	//sortable
	var handleSortable = function(){

		jQuery(".sortable_wrap").sortable({
			revert: true,
			connectWith: ".sortable_box",
			cancel:".el_empty"
			
		});
		jQuery(".sortable_box").sortable({
			revert: true,
			connectWith: ".sortable_wrap, .sortable_box"
		});

	}

	//box fade
	//var handleFadeInBox = function(options){
		//var defaults = {
			//autoPlay : false
		//};
		//var settings = $.extend({}, defaults, options);

		//var $fadeBox          = jQuery(".fadeBox_dots"),
			  //$fadeBox_dot   = $fadeBox.find("> .dots"),
			  //cont                  = 0;

		//$fadeBox_dot.eq(0).addClass("current");
		
		////arow
		//jQuery(document).on("click", ".fadeBox_arrows button", this,  function(){
			//var $fadeBoxi_tem  = jQuery(this).parent().siblings(".fadeBox_items").children(),
				  //$fadeBox_dot   = jQuery(this).parent().siblings(".fadeBox_dots").children(),
				  //band                 = $fadeBoxi_tem.size() - 1;

			//$fadeBox_dot.removeClass("current");
			//$fadeBoxi_tem.hide();
			//if(jQuery(this).index() ==1 ){
				 //cont = cont < band ? cont += 1 : 0 ;    
				//console.log("next");
			//}else{
				//cont = cont > 0 ? cont -= 1 : band;
				//console.log("prev");
			//}
			//$fadeBox_dot.eq(cont).addClass("current");
			//$fadeBoxi_tem.eq(cont).stop(true).fadeIn("fast");
		//});

		////dot
		//jQuery(document).on("click", ".fadeBox_dots .dots", this, function(){
			//var  $fadeBoxi_tem  = jQuery(this).parent().siblings(".fadeBox_items").children();
			//jQuery(this).parent(".fadeBox_dots").children().removeClass("current");
			//$fadeBoxi_tem.hide();
			//cont = jQuery(this).index();    
			//jQuery(this).addClass("current");
			//$fadeBoxi_tem.eq( cont ).stop(true).fadeIn("fast");
		  //});
		  
		////auto
		//var autoSlide;
		//function slideBoxInterval(){ 
			//autoSlide = setInterval(function(){
				//$fadeBox_dot.removeClass("current");
				//$fadeBoxi_tem.eq( cont ).fadeOut(1300);
				//cont = cont < band ? cont += 1 : 0 ;    
				//$fadeBox_dot.eq( cont ).addClass("current");
				//$fadeBoxi_tem.eq( cont ).fadeIn(2500);
			//}, 3000); 
		//}

		//return jQuery(this).each(function(){
			//if(settings.autoPlay == false){
				
			//}else{
				//slideBoxInterval();
				//$(".fadeBox_items").hover(function(){
					//// stop autoSlide 
					//clearInterval(autoSlide);
				//}, function(){
					//// reset autoSlide
					//slideBoxInterval();
				//});
			//}
		//});
	//}

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
			//handleFadeInBox({
				//autoPlay: false
			//});
			handleResizable();
			handleSortable();
			handleSnbMenu();
			handleTab();
			
			jQuery(window).resize(function(){
				handleResizable();
			});
		}
    };
}();        


