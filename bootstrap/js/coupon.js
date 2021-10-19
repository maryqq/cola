//$(".card-detail").hide();
//$(".card-detail").first().show();


$(".btn-change").click(
	function(){
		$(".card-detail").hide();
	}
)
$(".coupon-tabs div").last().addClass("active");
$(".coupon-tabs div").click(
	function(){
		$(".coupon-tabs div").removeClass("active");
		$(this).addClass("active");
		var showCard = $(this).attr("data");
		switch (showCard){
			case "0":
				$(".new-card,.nouse-card,.q-nouse-card,.used-card").show();
				break;
			case "1":
				$(".new-card,.nouse-card,.q-nouse-card,.used-card").show();
				$(".used-card").hide();
				break;
			case "2":
				$(".new-card,.nouse-card,.used-card,.q-nouse-card").show();
				$(".new-card,.nouse-card,.q-nouse-card").hide();
				break;
			case "3":
				$(".new-card,.nouse-card,.q-nouse-card,.used-card").show();
				$(".new-card,.nouse-card,.used-card").hide();
				break;
		}
	}
)

// 屏幕宽度大于767一直显示$(".card-detail")

if(document.body.clientWidth>=767){
	$(".card-detail").show();
	$(".card-state").css("height","65px");
	$(".card-state").css("width","65px");
	$(".card-state").css("background-size","65px 65px");
}else {
	$(".card-detail").hide();
	$(".show-detail").hide();
	//$(".card-detail").first().show();
	//$(".show-detail").first().show();
}
$(document).ready(function(){
	if(document.body.clientWidth){
		if(document.body.clientWidth>=1725){
			$(".card-number").css("font-size","35px")
			$(".card-money").css("font-size","55px");
			// $(".card-money").css("font-size","57px");
		}else if(document.body.clientWidth>=1025){
			$(".card-number").css("font-size","2.5vw")
			$(".card-money").css("font-size","3.5vw");
		}else if(document.body.clientWidth==768){
			$(".card-number").css("font-size","3vw")
			$(".card-money").css("font-size","5vw");
		}else if(document.body.clientWidth==1024){
			$(".card-number").css("font-size","35px")
			$(".card-money").css("font-size","55px");
		}
	}
});
$(window).resize(function() {
	if(document.body.clientWidth>=1725){
		$(".card-number").css("font-size","35px")
		$(".card-money").css("font-size","55px");
		// $(".card-money").css("font-size","57px");
	}else if(document.body.clientWidth>=1025){
		$(".card-number").css("font-size","2.5vw")
		$(".card-money").css("font-size","3.5vw");
	}else if(document.body.clientWidth==1024){
		$(".card-number").css("font-size","35px")
		$(".card-money").css("font-size","55px");
	}
});  
$(".show-detail").click(
	function(){
		$(".card-detail").hide();
		$(this).hide();
	}
)

$(".hide-detail").click(
	function(){
		$(".card-detail").hide();
		$(".show-detail").hide();
		$(this).siblings(".card-detail").show();
		$(this).siblings(".show-detail").show();

	}
)
$(".inf").click(function(){
	if($(this).parent("div").parent("div").parent("div").find(".card-detail").is(":visible")){
		$(".card-detail").hide();
		$(".show-detail").hide();
		$(this).parent("div").parent("div").parent("div").find(".card-detail").hide();
		$(this).parent("div").parent("div").parent("div").find(".show-detail").hide();
	}else{
		$(".card-detail").hide();
		$(".show-detail").hide();
		$(this).parent("div").parent("div").parent("div").find(".card-detail").show();
		$(this).parent("div").parent("div").parent("div").find(".show-detail").show();
	}
})