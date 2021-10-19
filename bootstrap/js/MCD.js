$(function(){
	//order-confirm-MCD.html 合计悬浮框begin
    $('html, body').animate({scrollTop: 0}, 500);
	var winHeight = $(document.body).scrollTop();
	var baseHeight = $(document).scrollTop();//滚动条的初始位置
	
	var wh = $(window).height();	//设备屏幕高度
	var bh= $(document.body).height();
	var divTop = $(".photos-section").height()+$(".pro-box").height()+$(".header").height();
	// var shopCartTop = $(".sc-list").height()+$(".steps").height()+$(".mobtitle").height()+$(".header").height()+90;             /*20161114 angela cancel*/
	var ocMCDTop = $(".oc-MCD-list").height()+ $(".steps").height()+$(".mobtitle").height()+$(".header").height()+90;    /*20161114 angela add*/
	var divH = $(".group .cart-control").height();
	    $(window).scroll(function(){
          var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
			var W = $(window).width();
			if(W < 980){
				//当滚动条滚动距离超出cart-control上端
				if(scrollY >= divTop){
					$(".group .cart-control").css({"top":"auto","bottom":"auto",'position':"relative"});
				}else{					
					$(".group .cart-control").css({"top":"auto","bottom":"0",'position':"fixed"});
				}
				shopCartTop = $(".steps").height()+$(".mobtitle").height()+$(".header").height()+90;       //20161129 angela 根据swire开发要求添加
                 $(".sc-list").each(function(){
                shopCartTop += $(this).height();
                   });
				//滚动条到最底端时
				if((scrollY + wh) < ocMCDTop) {
				
					//show footer when scroll height add window height less than top of the total
					ocMCDCssFooter();
				} else {
					//revert tot normal css
					ocMCDCssRevertMob();
				}
			}
     });	 
      $("#sc-tem-id").addClass("save-tem").css({"display":"block"});

		window.onload = changeSize;
		
		window.onresize = changeSize;
		function changeSize() {
			var W = $(window).width();
			if(W > 1000) {
				$('.promotion .right').height($('.promotion .left img').height()-30);			
			}
			$('.ord-detail dl').height($('.ord-img img').height()+5);
			$('.ad-list .col-md-4 img').width($('#product-ads li').width()-10);
			
			if(W > 979){
				// shopCartCssPC();
			} else {
				if(!$(".save-tem").is(":hidden")){
					ocMCDCssMob();
					var scrollY = $(document).scrollTop();
					if((scrollY + wh) < ocMCDTop){
						ocMCDCssFooter();
					}
				}				 
			}
		}

		function ocMCDCssMob(){
			$("#sc-tem-id,#sc-total-id,#sc-next-btn,#sc-footer-id").removeAttr("style");
			$("#sc-tem-id").addClass("save-tem").css({"position":"absolute","left":"20%","bottom":"1px","margin":"0","clear":"both","display":"none"});
			$("#sc-total-id").addClass("sc-total").css({"position":"absolute","top":"0px","clear":"both","width":"100%","margin":"0","text-align":"left","float":"right","left":"20%","display":"none"});	
			$("#sc-footer-id").addClass("sc-footer").css({"position":"relative","height":"100px","bottom":"0","top":"auto","background-color":"#fff","margin":"10px 4% 65px","width":"auto","clear":"both","box-sizing":"border-box","z-index":"98","padding":"0","display":"none"});			
		    // $("#sa-total-id").addClass("sa-total").css({"top":"auto"});
		}
		
		
		function ocMCDCssFooter() {
			$(".save-tem").css("display","none");
			$(".sc-footer").css({'position':"fixed","height":"50px","width":"100%","margin":"0px","border-top":"1px solid #8a8c8f","border-bottom":"1px solid #8a8c8f","z-index":"9999","display":"block"});
			$(".sc-total").css({"top":"auto","bottom":"5px","width":"70%","left":"4%","display":"block"});
			$('.coB-total').css("width","100%","display","block");
			$(".extraclass1").css({"top":"-20px","display":"block"});
			$(".next-btn").css({"top":"5px","display":"block"});	
			$(".extraclass2").css({"top":"0px",'position':'relative',"display":"block"});				
		}
		
	
		function ocMCDCssRevertMob() {
			$(".save-tem").css("display","none");
			$(".sc-footer").css({'position':"relative","height":"100px","width":"auto","margin":"10px 4% 65px","border":"none","z-index":"98","display":"none"});
			$(".sc-total").css({"top":"0px","bottom":"auto","width":"100%","left":"20%","display":"none"});
			$(".next-btn").css({"top":"auto","display":"none"});	
            $(".extraclass1").css({"top":"130px","display":"none"});			
            $(".extraclass2").css({"top":"50px","display":"none"});			
		}
		//order-confirm-MCD.html 合计悬浮框end
		
		//order-confirm-MCD.html 合计悬浮框点击确认按钮 begin
			$("#confirm-order-btn,#confirm-order-MCD-btn").click(function(){
		   if($(".icheckbox_square-red").hasClass("checked")){                         /*10/21 angela add if条件*/
			 var topBottom = ($(window).height()-236)/2;
			var leftRight = ($(window).width()-220)/2
			$(".oc-hint").css({"top":topBottom,"bottom":topBottom,"left":leftRight,"right":leftRight});
			$(".oc-success-hint").css({"top":topBottom,"bottom":topBottom,"left":leftRight,"right":leftRight});

			$("#mask").fadeIn();
			$(".oc-hint").fadeIn();
			$(".close-reveal-modal").hide();           /*20161109 angela add*/
			setTimeout(function(){
				//$("#mask").fadeOut();
				$(".oc-hint").fadeOut();
				$("#mask").fadeIn();
				$(".oc-success-hint").fadeIn();
			},2000);		
			setTimeout(function(){
				$("#mask").fadeOut();
				$(".oc-success-hint").fadeOut();
				location.href=location.href.substring(0,location.href.lastIndexOf("/"))+"/confirmation-message-MCD.html";

			},5000);	
	    }
			
	});
	//order-confirm-MCD.html 合计悬浮框点击确认按钮 end

})