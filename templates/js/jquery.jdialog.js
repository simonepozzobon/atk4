/* Copyright (c) 2008 Kean Loong Tan http://www.gimiti.com/kltan
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.1 (March 26, 2008)
 * Requires: jQuery 1.2+
 */
(function(C){var A=false;var B=true;C.fn.createDialog=function(E){var F=C.extend({},C.fn.createDialog.defaults,E);C(this).click(function(){B=F.center;if(!A){C("body").prepend('<div id="jDialogProgressBar"><img src="templates/smbo/ajax-loader.gif" /></div><div id="jDialogOverlay"></div><div id="jDialogContainer"></div>');G(1);A=true}if(F.progress){C("#jDialogProgressBar").show()}C.ajax({type:F.method,data:F.data,url:F.addr,success:function(H){C("#jDialogContainer").html(H);if(B){D()}C("#jDialogProgressBar").fadeOut(900)}});if(C.browser.msie&&parseInt(C.browser.version)<7){C(window).scroll(function(){if(A==1){G();if(B){D()}}})}C(window).resize(function(){if(A==1){G();if(B){D()}}});C(window).unload(function(){if(A==1){C.closeDialog()}});C(window).keydown(function(H){if(H.keyCode==27){C.closeDialog()}})});function G(L){var K=0;var J=0;var I=C(window).width();var M=C(document).height();var H=C(window).height();if(C.browser.msie&&parseInt(C.browser.version)<7){C("#jDialogOverlay").css({top:0,left:0,width:I,height:M,position:"absolute",display:"block",color:F.bg,zIndex:F.index})}else{C("#jDialogOverlay").css({top:0,left:0,width:I,height:H,position:"fixed",display:"block",background:F.bg,zIndex:F.index}).show()}if(L==1){C("#jDialogOverlay").css("opacity",0);C("#jDialogOverlay").fadeTo(200,F.opacity)}}function D(){var H=0;var M=0;var I=C(window).width();var J=C(window).height();var N=C("#jDialogContainer").children().height();var K=C("#jDialogContainer").children().width();if(C.browser.msie){H=document.body.scrollLeft||document.documentElement.scrollLeft;M=document.body.scrollTop||document.documentElement.scrollTop}else{H=window.pageXOffset;M=window.pageYOffset}var Q=M+J/2-N/2;var O=H+I/2-K/2;var P=Q-M;var L=O-H;if(C.browser.msie&&parseInt(C.browser.version)<7){C("select").hide();C("#jDialogContainer select").show();C("#jDialogContainer").children().css({top:Q,left:O,position:"absolute",zIndex:(F.index+1)}).show()}else{C("#jDialogContainer").children().css({top:P,left:L,position:"fixed",zIndex:(F.index+1)}).show()}}};C.fn.createDialog.defaults={progress:true,center:true,method:"GET",data:"",opacity:0.85,bg:"#FFFFFF",index:2000};C.closeDialog=function(){A=false;if(C.browser.msie&&parseInt(C.browser.version)<7){C("select").show()}C("#jDialogOverlay").fadeTo(200,0,function(){C("#jDialogContainer, #jDialogOverlay, #jDialogProgressBar").remove()})}})(jQuery);