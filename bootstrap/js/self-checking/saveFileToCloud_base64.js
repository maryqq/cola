 //先判断是否为微信浏览器
var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	//重写alert方法，alert()方法重写，不能传多余参数
	window.alert = function(name){
		var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}
}

//判断是否是安卓还是ios
function isAndroid_ios(){
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
return isiOS==true?true:false;
}

function saveFile(dataURL,fileName,company_code, feature,external_id,outlet_no, belong_to) {
   
	 
   return new Promise((resolve, reject) => {
	    var base64data =dataURL;
		
	   if(isAndroid_ios()){
           base64data = dataURL.split('base64,')[1];
	   }
      //console.log(base64data);
      var data = { base64: base64data };
	  var file = new AV.File(fileName, data);
      //向leanCloud添加metadata属性,company_code、feature、external_id、belong_to加上上面的图片URL需要作为参数传入 
      file.metaData("company_code", company_code);
      file.metaData("feature",feature);
      file.metaData("external_id", external_id);
      file.metaData("belong_to", belong_to);

      if(outlet_no.length!=0){
        file.metaData("createBy",external_id)
      }else{
        file.metaData("createBy","System");
      }   
      file.save().then(function(response) {
        var media_id = response.id;
        var media_url = response.url();
        result =  {
          media_id,
          media_url
        };
		
        resolve(result);
      }).catch(function(err) {
        $(".dec_txt").text("上传失败");
	    $(".error_alert").show();
	    setTimeout(function(){
			$(".error_alert").hide();
		},3000);		  
	    $(".layer").css("display","none");
			$("body").css("overflow","auto");
			$("body").css("position","");
	     
		  

		  
	    });
    
  });
}



/***
 传入url，转换成真实文件数据上传
 参数1：文件的url
 参数2：company_code
 参数3:feature
 参数4：external_id
 参数5：belong_to
*/
function saveUrlAsFile(url,fileName, company_code, feature,external_id,outlet_no, belong_to){
	fileName=fileName+".jpg";
	
  return new Promise((resolve, reject) => {
      saveFile(url,fileName, company_code, feature,external_id,outlet_no, belong_to).then(data => {
          resolve(data);
    }).catch(function(err) { 
	     $(".dec_txt").text("上传失败");
	    $(".error_alert").show();
	    setTimeout(function(){
			$(".error_alert").hide();
		},3000);		  
	    $(".layer").css("display","none");
			$("body").css("overflow","auto");
			$("body").css("position","");
	    });
  })
}