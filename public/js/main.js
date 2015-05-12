jQuery(document).ready(function() {
    jQuery("abbr.timeago").timeago();
    $('#previewing').css('display','none');

    $( '#signup' ).validate({
      rules: {
        username: {
          required: true
        },
        password:{
          required: true
        },        
        confirm:{
          required: true
        },        
        email:{
          required: true,
          email:true
        }       
      },
      messages: {
        username: "Please enter a valid username",
        password: "Please enter a valid password",
        confirm: "Please confirm your password",
        email: "Please enter a valid email"
      }
      
    });
    $('#flogin').validate({
    	rules:{
	        lusername:{
	          required: true
	        },
	        lpassword:{
	         required:true
	        }
    	},
    	messages:{
	        lusername: "Please enter your username",
	        lpassword: "Please enter your password"
    	}
    });


});
	$(function() {
        $("#userFileInput").change(function() {
			$("#message").empty();         // To remove the previous error message
			var file = this.files[0];
			var imagefile = file.type;
			var match= ["image/jpeg","image/png","image/jpg"];	
			if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
			{
			$('#previewing').attr('src','noimage.png');
			$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
			return false;
			}
            else
			{
                var reader = new FileReader();	
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
                $('#previewing').css('display','block');
            }		
        });
    });


	function imageIsLoaded(e) { 
		$("#file").css("color","green");
        $('#image_preview').css("display", "block");
        $('#previewing').attr('src', e.target.result);
		$('#previewing').attr('width', '250px');
		$('#previewing').attr('height', '230px');
	};
/*
$('#uploadimage .btn.btn-primary').click(function(e){
  console.log('upl');
  e.preventDefault();
	$.ajax({
	url: "./profiler", // Url to which the request is send
	type: "POST",             // Type of request to be send, called as method
	data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
	contentType: false,       // The content type used when sending data to the server.
	cache: false,             // To unable request pages to be cached
	processData:false,        // To send DOMDocument or non processed data file it is set to false
	success: function(data)   // A function to be called if request succeeds
	{
	$('#loading').hide();
	$("#message").html(data);
	}
	});
});
*/
$("#newstatus").keydown(function(e) {
    if (e.keyCode == 13) {
    	var myStatus = $('#newstatus').val();
    	statusText = { stext: myStatus};
    	postStatus.postAjaxCall();
    }
});

$('#postbtn').click(function(e) {
    e.preventDefault();
	var myStatus = $('#newstatus').val();
	statusText = { stext: myStatus};    
    postStatus.postAjaxCall();

});

$("input[name=username").change(function(e){
	$this = $(this);
	console.log('change of username');
	$.ajax({
	        dataType: 'json',
	        data: 	$('#signup').serialize(),
	        type: 'POST',
	        url: './checkuser',
	        
	        success: function(responseText) {
	         
	         console.log(responseText);		   
			 if (responseText.userFlag)
			 {
			 	console.log('username already exist');
			 	$this.focus();
			 	$this.addClass('validationShadow');
			 	$('.form-group.error').css('display','block');
			 	$('.errorMessageUser').text('oops,username is already taken!');
			 }	 		        		
	        	
	         else {
	         	$this.removeClass('validationShadow');
	         	console.log('username is available');
	         	$('.form-group.error').css('display','block');
	         	$('.errorMessageUser').text('');

	         }		
	        },
	        
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
		            console.log('errror errorThrown');
		    
		     }
	

	});


});
$(".signup.btn").click(function(e){
	e.preventDefault();

	$('#signup').validate();
	
	console.log('signup');
	var uid   = $( "input[name=username]" ).val(),
		pwd   = $( "input[name=password]" ).val(),
		email = $( "input[name=email]" ).val(),
		$this = $(this);
	if ( $( "#signup" ).valid() ) {	
		$.ajax({
		        dataType: 'json',
		        data: 	$('#signup').serialize(),
		        type: 'POST',
		        url: './signup',
		        
		        success: function(responseText) {
		         
		         console.log(responseText);		   
				 if (responseText.userFlag)
				 {
				 	console.log('check errors !!');
				 	$this.focus();
				 	$this.addClass('validationShadow');
				 	$('.form-group.error').css('display','block');
				 	$('.errorMessageUser').text('Check errors on the page');
				 }	 		        		
		        	
		         else {
		         	$this.removeClass('validationShadow');
		         	console.log('Success !! Please login');
		         	$('.form-group.error').css('display','block');
		         	$('.errorMessageUser').text('Success !! Please login');

		         }		
		        		
		        	
		        	
		        },
		        
		        error: function(XMLHttpRequest, textStatus, errorThrown) {
			            console.log('errror errorThrown');
			    
			     }
		

		});
	}		
});
$(".login.btn").click(function(e){
	e.preventDefault();
	var uid = $( "input[name=lusername]" ).val();
		pwd = $( "input[name=lpassword]" ).val();
	var loginDetail = {
		username:uid,
		password:pwd
	}
	$('#flogin').validate();
	if( $('#flogin').valid() ){
		console.log('loginDetail:%s',loginDetail.password);
		
		$.ajax({
		        dataType: 'json',
		        data: loginDetail,
		        type: 'POST',
		        url: './login',
		        beforeSend: function() {
		        	console.log('before making ajax request');	
		        	$('.fa.fa-spinner').show();
		        },
		        complete: function() {
		        	console.log('request is complete');
		        	$('.fa.fa-spinner').hide();
		        },
		        success: function(responseText) {
		        	   
		        	$(".login.btn.btn-primary.btn-md").submit();
		        	if (responseText.error){
		        		$('.errorMessage').text(responseText.message);
		        	}
		        	else{
		        		currentUrl = returnLastPathSegment();
		        		console.log('valid user:' + currentUrl);
		        		window.location.href = currentUrl + "users/" + uid;
		        		
		        	}
		        	
		        },
		        
		        error: function(XMLHttpRequest, textStatus, errorThrown) {
			            console.log('errror errorThrown');
			    
			     }
		});
	}
});

function returnLastPathSegment(url) {
   var a = document.createElement('a')
   a.href = url;
    
    if ( ! a.pathname) {
        return url;
    }
    
    a.pathname = a.pathname.replace(/\/[^\/]+$/, '');
    
    return a.href;
}

var removeStatus = {

	removeAjaxCall: function() {

	}

};
var postStatus = {
    
    postAjaxCall: function(){
	    $.ajax({
	        dataType: 'json',
	        data: statusText,
	        type: 'POST',
	        url: './statuses',
	        success: function(responseText) {
	            console.log('success:%s', responseText);
	            var newStatus = 
/*
				'<form action="/individualStatus"  class="iStatus" method="POST">' + 
				'<div class="post">' +
				'<div class="statusbody">' +  
				'<div class="timestamp"><abbr class="timeago" title="' + new Date(responseText.time).toISOString() + '">' + 
				'</abbr></div><a class="colorize" href="/users/manoj"><div class="smallpic">' + 
				'<img class="smallpic_img" src="' + responseText.image + '"></div><div class="smallname">' + responseText.username + '</div>' + 
				'</a><br><article class="mystatus"><p> ' + responseText.body + '</p><span id="removeId">' + 
				'<button type="button" class="btnremove"></button></span><button type="submit" class="btnlike"></button>' + 
				'<button type="submit" class="btndislike"></button></article>' + 
				'<div class="showcomment"><textarea class="form-control newcomment" id="ncomment" name="comment" placeholder="Post a comment"></textarea>' + 
				'</div></div></form>';
*/
				'<form action="/individualStatus"  class="iStatus" method="POST">' + 
				'<div class="post">' +
				'<div class="statusbody">' +  
				'<div class="timestamp"><abbr class="timeago" title="' + new Date(responseText.time).toISOString() + '">' + 
				'</abbr></div><a class="colorize" href="/users/manoj"><div class="smallpic">' + 
				'<img class="smallpic_img" src="' + responseText.image + '"></div><div class="smallname">' + responseText.username + '</div>' + 
				'</a><br><article class="mystatus"><p> ' + responseText.body + '</p><span id="removeId">' + 
				'<button type="button" class="btnremove"></button></span><button type="submit" class="btnlike"></button>' + 
				'<button type="submit" class="btndislike"></button></article>' + 
				'<div class="showcomment"><textarea class="form-control newcomment" id="ncomment" name="comment" placeholder="Post a comment"></textarea>' + 
				'</div></div></form>';

	            
	            $('#postNewStatus').after(newStatus).click();
	            $('#newstatus').val('');
	            $('.iStatus').click();
	            jQuery("abbr.timeago").timeago();

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            console.log('error', errorThrown);
	        }
	    });
	}
};


$( document ).on( "click", ".removeStatus .glyphicon.glyphicon-remove", function() {
	var target = $( event.target );
	var	textbody = target.parent().parent().parent().find('.statusText').text();
	var	postuser = target.parent().parent().parent().parent().find('.smallname:first').text();
	var	timepost = target.parent().parent().parent().parent().find('.timeago').attr('title'),
		timepost = new Date(timepost).getTime();
		console.log('textbody :%s',textbody.trim());
		console.log('postuser :%s',postuser);
		console.log('timepost :%s',timepost);
		sendStatus = { bodypost: textbody, 
					   uidpost: postuser, 
					   timepost: timepost
					 };


	    $.ajax({
	        dataType: 'json',
	        data: sendStatus,
	        type: 'POST',
	        url: './removestatus',
	        success: function(responseText) {
	            console.log('successfully deleted:%s', responseText);

	            target.parent().parent().parent().parent().remove();

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            console.log('error', errorThrown);
	        }
	    });
});


$( document).on("click",".commentbody button.btnremovecomment",function(index,e){
  var index_val = $(".commentbody button.btnremovecomment").index(this),
  	  target = $(event.target),
  	  textbody = target.parent().parent().parent().parent().parent().find('.mystatus').text(),
  	  timepost = target.parent().parent().parent().parent().parent().find('.timeago').attr('title'),
  	  timepost = new Date(timepost).getTime(),
  	  timecomment = target.parent().parent().parent().find('.timeago').attr('title'),
  	  timeofcom = new Date(timecomment).getTime(),
  	  postuser = target.parent().parent().parent().parent().find('.smallname:first').text();
 		 console.log('remove comment:%d',index_val);
		 console.log('textbody :%s',textbody.trim());
		 console.log('timepost :%s',timepost);
		 console.log('postuser :%s',postuser);
		 console.log('timeofcom:%s',timeofcom);

		var delcom = { bodypost: textbody, 
					   uidpost: postuser, 
					   timepost: timepost,
					   timecomment: timeofcom,
					   cindex: index_val,

					 };
	    $.ajax({
	        dataType: 'json',
	        data: delcom,
	        type: 'POST',
	        url: './removecomment',
	        success: function(responseText) {
	            console.log('successfully deleted:%s', responseText);
	            if (responseText.flag)
				target.parent().parent().parent().remove();

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            console.log('error', errorThrown);
	        }
	    });

  //db.status.update({username:"manoj"},{$unset:{"comments.1":1}})
  //db.status.update({username:"manoj"},{$pull:{"comments":null}})


});
$( document ).on( "keydown", ".showcomment .newcomment", function(e) {
	var target = $(event.target );	
    if (e.keyCode == 13) {
    	var myComment = target.val();
    	var statusTime=	target.parent().parent().parent().find('.timestamp .timeago').attr('title');
    		statusTime = new Date(statusTime).getTime();
    	var myUsername= target.parent().parent().find('.smallname:first').text();
    	var myStatus = target.parent().parent().parent().find('.statusbody p').text();
    	
    	console.log("myStatus:%s",myStatus);
    	console.log("myComment:%s",myComment);
		console.log("statusTime:%d",statusTime);
		console.log("myUsername:%s",myUsername);


    	commentText = { status: myStatus, comment: myComment, stime: statusTime, uname: myUsername};
    	//postComment.postCommentAjaxCall(target);
	    $.ajax({
	        dataType: 'json',
	        data: commentText,
	        type: 'POST',
	        url: './statuscomment',
	        success: function(responseText) {
	            console.log('success:%s', responseText.body);

				appendComment(responseText);

				//$('#ncomment').after(newcomment);		

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            console.log('error', errorThrown);
	        }
	    });
		function appendComment(commentdata){
	            var newcomment = 
	            '<div class="post postcomment"><div class="timestamp">' +
						'<abbr class="timeago" title=title="' + new Date(commentdata.time).toISOString() + '"></abbr></div>' + 
						'<a class="colorize" href=""><div class="smallpic"><img class="smallpic_img" src="' + commentdata.image + '"></div>' + 	
						'<div class="smallname">'+ commentdata.username +'</div></a><article class="commentbody">' + 
						'<p>'+ commentdata.body + '</p><span id="removecomment"><button type="button" class="btnremovecomment"></button></span>' + 
						'<span class="clike"><button type="submit" class="btnlike"></button>' + 
						'<input type="hidden" name="likepost_ordinal" />' + 
						'<button type="submit" class="btndislike"></button></span></article>';
			console.log('ccc:%s',commentdata.body);	
			console.log("myUsernamexx:%s",myUsername);
			target.before(newcomment);
			target.val("");
			jQuery("abbr.timeago").timeago();
		}		 
    }
});

var hostname = window.location.hostname;
var socket = io.connect(hostname);

socket.on('newStatus', function(res) {
    console.log(res.statusData);
    var time = new Date(res.statusData.time).toISOString();

    var addStatus = '<div class="post"><div class="timestamp"><abbr class="timeago" title="' + time +
        '"></abbr></div><a class="colorize" href="/users/' + res.statusData.username +
        '"><div class="smallpic"><img class="smallpic_img" src="' + res.statusData.image +
        '"/></div>	<div class="smallname">' + res.statusData.username +
        '</div></a><br><div class="statusbody">' + res.statusData.body + '</div></div>';

    $('#socket').prepend(addStatus);

    var pageuser = $('#theusername').text();
    if (pageuser == res.statusData.username && pageuser != myname) {
        $('#postsOuter').prepend(addStatus);
    }

    jQuery("abbr.timeago").timeago();
});


