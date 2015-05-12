/* ============================================================
 * BOD myScript.js - Validation for Request A callback 
 * ============================================================
 *
 * Version number: 1.0
 *
 * Changes
 * 1.0  12/02/2014  MB   
 * Created by: MB
 * Created date: 27.11.2014
 /***********************************************************************************/

$(document).ready(function(){
	s.prop35="SME"+uniqueId;
	s.t();
	
	var priceOpen = false;
	var step3Done = false;
	var step2Done = false;
	var step1Done = false;
	

    //$('.smeBox.smeBox3').parent().parent().next().addClass('selectedSme');
    $('.smeBlock:first').addClass('selectedSme');

    
     $('#firstNameInput').on('blur', function () {
        firstNameInputCheck(false);
        return false;
    });
    $('#lastNameInput').on('blur', function () {
        lastNameInputCheck(false);
        return false;
    });
    $('#contactTelephoneInput').on('blur', function () {
        contactTelephoneInputCheck(false);
    return false;
    });
    $('#contactEmailInput').on('blur', function () {
        contactEmailInputCheck(false);
    return false;
    });
    
    $('#businessNameInput').on('blur', function () {
        businessCheck(false);
        return false;
    });     
    $('#postalCodeInput').on('blur', function () {
        postalCheck(false);
        return false;
    }); 

    $('#businessSectorInput').on('blur', function () {
        bSectorCheck(false);
        return false;
    });
    $('#selectedTitle').on('blur', function () {
        titleInputCheck(false);
        return false;
    });  
    $('#companySizeSelect').on('blur', function () {
        companySizeCheck(false);
        return false;
    });  
    $('.empNoAge').on('blur', function () {
        empAgeCheck(false);
        return false;
    });  
    $('.smeEdit').click(function(){
	

        $('.smeBlock').each(function(){
            if (!$(this).hasClass('editSme')) {
                
                $(this).removeClass('selectedSme');
            }
            
            else if ($(this).hasClass('selectedSme editSme')){
				
             
                $(this).removeClass('selectedSme editSme')
				
				// check if current block is not filled correctly
				if(($(this).find(".smeBox").hasClass("smeBox1"))){
					s.pageName = "business:quick-quote.1";
					s.t();
					if(step1Done === true){
						
						$(this).addClass('doneSme doneSmeDetails');
						$(this).find('.doneSmeDetails').css('display','block');
					}else{

						$(this).find(".smeBox1").removeClass("doneSme doneSmeDetails");
						$(this).find('.doneSmeDetails').css('display','none');
					}
				}
				if(($(this).find(".smeBox").hasClass("smeBox2"))){
					s.pageName = "business:quick-quote.2";
					s.t();
					if(step2Done === true){
						$(this).addClass('doneSme doneSmeDetails');
						$(this).find('.doneSmeDetails').css('display','block');
						
					}else{
					
						$(this).find(".smeBox2").removeClass("doneSme doneSmeDetails");
						$(this).find('.doneSmeDetails').css('display','none');
					}
				}
				if(($(this).find(".smeBox").hasClass("smeBox3"))){
					s.pageName = "business:quick-quote.3";
					s.t();
					if(step3Done === true){
						$(this).addClass('doneSme doneSmeDetails');
						$(this).find('.doneSmeDetails').css('display','block');
						
					}else{
						
						$(this).find(".smeBox3").removeClass("doneSme doneSmeDetails");
						$(this).find('.doneSmeDetails').css('display','none');
					}
				}
            }
            
        });

        $(this).parent().parent().parent().removeClass('doneSme doneSmeDetails').addClass('selectedSme editSme');
        $(this).parent().css('display','none');
		
		openPriceBox();


    });

    $('.hidecover').click(function() {

        if($(this).hasClass('hcover')) {
            $('.smeBox4-2 .priceBox').hide();
            $('.smeBox4-2 .priceBox1').hide();
            $(this).addClass('showcover').removeClass('hcover');
            $('.dot-spacin').css('display','none');
            $('.registered-bupa-message').css('display','none');
            $(this).find('.btn.prime-link span').text('Show cover details');
			$(this).find('.btn.prime-link i').removeClass('upp');
			$(this).find('.btn.prime-link i').addClass('down');

        }
        else if($(this).hasClass('showcover')) {
            $('.smeBox4-2 .priceBox').show();
            $('.smeBox4-2 .priceBox1').show();
			$('.registered-bupa-message').css('display','block');
            $(this).addClass('hcover').removeClass('showcover');
            $(this).find('.btn.prime-link span').text('Hide cover details');
			$(this).find('.btn.prime-link i').removeClass('down');
			$(this).find('.btn.prime-link i').addClass('upp');
        }
    });

    $('.smeBox1 .smeContinue').click(function(){
        var step1fNameCheck = firstNameInputCheck(false),   
            step1lNameCheck = lastNameInputCheck(false),
            step1EmailCheck = contactEmailInputCheck(false),
            step1PhoneCheck = contactTelephoneInputCheck(false);
            step1Done       = false;

		openPriceBox();
        $('.sme .smeBlock .smeBox.smeBox1').each(function(index,event){
                if(!step1fNameCheck && !step1lNameCheck && !step1EmailCheck && !step1PhoneCheck){
                    s.pageName = "business:quick-quote.2";
					s.t();
                    step1Done = true;
                    if ($(this).parent().parent().hasClass('editSme')){
                        $(this).parent().parent().removeClass('editSme');
                    } 
                    if ($(this).parent().parent().hasClass('selectedSme')) {
                        $(this).parent().parent().removeClass('selectedSme').addClass('doneSme doneSmeDetails');
                        $(this).parent().parent().find('.doneSmeDetails').css('display','block');
                        //console.log("Next Step2:" + $('.smeBox1 .smeContinue').parent().parent().parent().next().hasClass('doneSme doneSmeDetails'));
                      //  if($('.smeBox1 .smeContinue').parent().parent().parent().next().hasClass('doneSme doneSmeDetails') == false)
                        $(this).parent().parent().next().addClass('selectedSme');
						$(this).parent().parent().next().addClass('editSme');
						$(this).parent().parent().next().removeClass('doneSme');
						$(this).parent().parent().next().find('.doneSmeDetails').hide();
						
                        $('.doneSmeDetail.dname b').text($('#firstNameInput').val() + " " + $('#lastNameInput').val() );
                        $('.doneSmeDetail.demail b').text($('#contactEmailInput').val());
                        $('.doneSmeDetail.dphone b').text($('#contactTelephoneInput').val());

                    }                   
                }
        }); 
    }); 

    function spinner(action, appendage) {
        if (action == 'newInterstitial') {
            var interstitialContent="<div class='interstitial'><h3></h3><div>";
            var interstitialCont=$("<div id='interstitialContainer'></div>").append(interstitialContent);
            $(".smeContentTop").prepend(interstitialCont);
            $('.interstitial').css({top:'50%',left:'50%',margin:'-'+($('.interstitial').height() / 2)+'px 0 0 -'+($('.interstitial').width() / 2)+'px'});
        } else {
                $('#interstitialContainer').remove();           
        }
    }

    $('.smeBox.smeBox2 .smeContinue').click(function(){

        var step2bname = businessCheck(false),
            step2pcode = postalCheck(false),
            step3bsec  = bSectorCheck(false),
            step4csize = companySizeCheck(false),
            step2Overlay = false; 
			
            step2Done  = false;
			openPriceBox();

         $('.smeBox.smeBox2').each(function(index,event){			
            if(!step2bname && !step2pcode && !step3bsec && !step4csize){	
			var _this = $(this);
				s.pageName = "business:quick-quote.3";
				s.t();
                step2Done  = true;
                /** if company size is more than 250 ***/  
                if ($('#companySizeSelect')[0].selectedIndex === 4) {
                    step2Overlay = true;
                    $('#overlays').show();
                    $('#overlays .title .numberEmployees').html($('#companySizeSelect').val());
                    $('.Over250TotalEmployees').show();
                }  
				
                if ( $('#radio1').is(':checked') && $('#companySizeSelect')[0].selectedIndex != 4 ) {
                    step2Overlay = true;                  
                    $('#overlays').show();
                    $('#overlays .title .numberEmployees').html($('#companySizeSelect').val());
                    $('.CoverWithOtherProvider').show();

                }                 
                    var url = saveOrganisationAjaxURL+'&smeAjaxFetchSaveQuote=true';
						$.ajax({
                        beforeSend: function() {
                                spinner('newInterstitial', '#smeCoverDetails');
                        },
                        url: url,
                        data: $("#quickQuoteForm").serialize(),
                        type: "POST",
                        dataType: "json",
                        timeout: 60000,
                        success: function(data) {
							var postCodeError = data.postCodeError,
								status = data.response;
								
							if(status === 'Success'){
								if (_this.parent().parent().hasClass('editSme')){
									_this.parent().parent().removeClass('editSme');
								} 
							   
								if (!step2Overlay)  {
									if (_this.parent().parent().hasClass('selectedSme')) {
										_this.parent().parent().removeClass('selectedSme').addClass('doneSme doneSmeDetails');
										_this.parent().parent().find('.doneSmeDetails').css('display','block');
										//if($('.smeBox2 .smeContinue').parent().parent().parent().next().hasClass('doneSme doneSmeDetails') == false)
										//_this.parent().parent().next().addClass('selectedSme');
										
										_this.parent().parent().next().addClass('selectedSme');
										_this.parent().parent().next().addClass('editSme');
										_this.parent().parent().next().removeClass('doneSme');
										_this.parent().parent().next().find('.doneSmeDetails').hide();
						
						
											$('.doneSmeDetail.bname b').text($('#businessNameInput').val());
											$('.doneSmeDetail.bsector b').text($('#businessSectorInput>option:selected').html());
											$('.doneSmeDetail.bpostcode b').text($('#postalCodeInput').val());
											$('.doneSmeDetail.bsize b').text($('#companySizeSelect>option:selected').html());
											$('.doneSmeDetail.bcover b').text($('#radio2').val());

									}
								} 	
							}else if(postCodeError!==''){
								$('#postalCodeInput').removeClass('successValidation-icon').addClass('validationShadow validationError-icon');	
								$('#postcodeValidation').removeClass('hideError').text(postCodeError);
							}else{
								
							}								
                        },
                        error: function (xhr, error) {
                                                                
                                if(!!xhr.responseText) {
                                    
                                    $('#overlays').hide();
                                    spinner('stop');
                                    $('#smePortletContainer').html(xhr.responseText);

                                } else {
                                    
                                    ajaxTimeOutHandling();
                                }
                            },
                        complete:function(){
                          
                            spinner('stop');
                        }
                    });  
            }
         });

    });
    $('.smeBox.smeBox3 .smeContinue').click(function(){

        var step3empOne = empAgeCheck(false);
            //step3empTwo = empAgeCheck(false),
            step3Done   = false; 

        // console.log("step3empOne:" + step3empOne);   
         $('.smeBox.smeBox3').each(function(index,event){
            if(!step3empOne /*&& !step3empTwo*/){
				s.pageName = "business:quick-quote.4";
				s.t();
                step3Done  = true;
				priceOpen = true;
                if ($(this).parent().parent().hasClass('editSme')){
                    $(this).parent().parent().removeClass('editSme');
                }  
                    if ($(this).parent().parent().hasClass('selectedSme')) {
                        $(this).parent().parent().removeClass('selectedSme').addClass('doneSme doneSmeDetails');
                        $(this).parent().parent().find('.doneSmeDetails').css('display','block');
                        $(this).parent().parent().next().addClass('selectedSme');

                }               
            } 
			openPriceBox();
			
        });


    });
	function openPriceBox(){
		if(priceOpen === true){
			$(".smeBox4").show();
			$(".smeBox4").parent().parent().addClass("selectedSme");
			
		}
	}
	
});

// Business Validations start

/* ALL THE REGEX FOR LANDING PAGE FORM VALIDATION */
// Only alphabets regex
function hasAlphabets(nameStr) {
    var pattern = new RegExp(/^[a-zA-Z\s'-]+$/);
	return pattern.test(nameStr);
	
};

// Only email regex - email address format + not allow �/�/�/" these special characters
function validateEmail(emailAddress) {
	var trimmed = emailAddress.replace(/^\s+|\s+$/g, '')
	$('.validateEmailAddress').val(trimmed);
    //var pattern = new RegExp(/^[^\ \x22\xF7\xDE\xE7]{1,}@[^\ \x22\xF7\xDE\xE7]{1,}\.[^\ \x22\xF7\xDE\xE7]{2,}$/);
	var pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[A-Za-z]{2,6}$/);
	return pattern.test(trimmed);
};

// Only numbers regex and allow the curly braces, plus, hyphen
function isPhoneNumber(nameStr) {
	var trimmed = nameStr.replace(/^\s+|\s+$/g, '')
	$('#smeTelephoneNumber').val(trimmed);
    var pattern = new RegExp(/^[\+{1,}\({1,}\)0-9\s-]*$/);
    return pattern.test(trimmed);
};

function exclusionsValidate(nameStr) {
    var pattern = new RegExp(/^[^\x22\xF7\xDE\xE7]*[A-Za-z]+[^\x22\xF7\xDE\xE7]*$/);
    return pattern.test(nameStr);
};

function validateBusinessname(nameStr) {
    var pattern = new RegExp(/^[a-zA-Z0-9.@\s,&-]+$/);
    return pattern.test(nameStr);
};

function checkPostcode(nameStr) {
	var pattern = new RegExp(/^((GIR {0,1}0AA)|(((A[BL]|B[ABDHLNRSTX]?|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]?|F[KY]|G[LUY]?|H[ADGPRSUX]|I[GMPV]|JE|K[ATWY]|L[ADELNSU]?|M[EKL]?|N[EGNPRW]?|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKLMNOPRSTY]?|T[ADFNQRSW]|UB|W[ADFNRSV]|YO|ZE)[1-9]?[0-9]|((E|N|NW|SE|SW|W)1|EC[1-4]|WC[12])[A-HJKMNPR-Y]|(SW|W)([2-9]|[1-9][0-9])|EeCc[1-9][0-9]) {0,1}[0-9][AaBbD-Hd-hJjLlNnP-Up-uW-Zw-z]{2}))$/);
	var trimmed = nameStr.replace(/^\s+|\s+$/g, '');
	if(trimmed === "Postcode" || trimmed === "POSTCODE"){
		$('#postalCodeInput').val("Postcode");
	}else{
		$('#postalCodeInput').val(trimmed.toUpperCase());
	}
	
	return pattern.test(trimmed.toUpperCase());
};


// Business Validations ends


    function contactEmailInputCheck(validationError) {
        var emailInput = $('#contactEmailInput');
		
		var emailInputValue = emailInput.val().replace(/^\s+|\s+$/g, '');
		emailInput.val(emailInputValue);
		
		
        //var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!(validateEmail(emailInputValue)) && emailInputValue.length !=0) {
          
            $('.errorTable').show();
            emailInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');   
            $('#emailInputValidation').addClass('validationMessage').removeClass('hideError');
            $('#emailInputValidation').text('Please enter a valid email address');
            
            return true;            

        }
        else {
            $('#emailInputValidation').text('');
            emailInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
            if (emailInputValue.length == 0) {
                $('.errorTable').show();

                emailInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                
                $('#emailInputValidation').addClass('validationMessage').removeClass('hideError');
                $('#emailInputValidation').text('Please enter a valid email address');
                return true;
                
            } else {

            }
        }            
    }

     function contactTelephoneInputCheck(validationError) {
    
        var telephoneInput = $('#contactTelephoneInput');
        var validationMessage = $('#contactInputValidation');
		
		var telephoneInputValue = telephoneInput.val().replace(/^\s+|\s+$/g, '');
		telephoneInput.val(telephoneInputValue);

        //var validatePhoneString = /[0-9+()\s]+$/;

        if (telephoneInputValue.length == 0) {
            telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#contactInputValidation').text('Please enter a valid telephone no.');
            validationMessage.addClass('validationMessage').removeClass('hideError');
            return true;
        } else {
            if (!(isPhoneNumber(telephoneInputValue) )) {
                
                $('#contactInputValidation').text('Please enter a valid telephone no.');
                telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');                
                validationMessage.addClass('validationMessage').removeClass('hideError');
                return true;
            } else {
                telephoneInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');                
                validationMessage.removeClass('validationMessage').addClass('hideError');
                telephoneInput.removeAttr('required');
                return validationError;
            }

        }
    }

        function firstNameInputCheck(validationError) {
            var firstNameInput = $('#firstNameInput');
			var firstNameValue = firstNameInput.val().replace(/^\s+|\s+$/g, '');
			if(firstNameValue === "First name"){firstNameValue = ""; }else{firstNameInput.val(firstNameValue);}
			
			//firstNameInput = firstNameInput.val().replace(/^\s+|\s+$/g, '');
            //var fnameRegex = /^[a-zA-Z0-9-\\s]/;
            if( !(hasAlphabets(firstNameValue)) && firstNameValue.length !=0 ) {
       
                $('.errorTable').show();
                firstNameInput.addClass('validationError-icon validationShadow');
                $('#firstNameInputValidation').addClass('validationMessage').removeClass('hideError');
                $('#firstNameInputValidation').text('Please enter a valid first name');
                return true;            

            }
            else {

                if (firstNameValue.length == 0) {
                    $('.errorTable').show();
                    firstNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                    $('#firstNameInputValidation').addClass('validationMessage').removeClass('hideError');
                    $('#firstNameInputValidation').text('Please enter a valid first name');
                    return true;
                } else {
                    firstNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                    $('#firstNameInputValidation').removeClass('validationMessage').addClass('hideError');
                    firstNameInput.removeAttr('required');
                    return validationError;
                }            

            }

    }
    function lastNameInputCheck(validationError) {
        var lastNameInput = $('#lastNameInput');
		var lastNameValue = lastNameInput.val().replace(/^\s+|\s+$/g, '');
		if(lastNameValue === "Last name"){lastNameValue = "";}else{lastNameInput.val(lastNameValue);}
		

        if (!(hasAlphabets(lastNameValue)) && lastNameValue.length !=0 ) {

            $('.errorTable').show();
            lastNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#lastNameInputValidation').addClass('validationMessage').removeClass('hideError');
            $('#lastNameInputValidation').text('Please enter a valid last name');
            return true;           

        }
        else {
              if (lastNameValue.length == 0 ){
                $('.errorTable').show();
                lastNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                $('#lastNameInputValidation').addClass('validationMessage').removeClass('hideError');
                $('#lastNameInputValidation').text('Please enter a valid last name');
                return true;

            } else {

                
                lastNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                $('#lastNameInputValidation').removeClass('validationMessage').addClass('hideError');
                lastNameInput.removeAttr('required');
                return validationError;
            }       
        }
    }

    function postalCheck(validationError) {
        var postalInput = $('#postalCodeInput');
		var postCodeInput = postalInput.val();
		if(postCodeInput === "Postcode" || postCodeInput === "POSTCODE"){
			postalInput.attr("placeholder", "Postcode");
			postCodeInput = postCodeInput.toLowerCase();
			postCodeInput = postCodeInput.charAt(0).toUpperCase() + postCodeInput.substring(1);
			postalInput.val(postCodeInput);
		}else if(postCodeInput === ""){
			postalInput.val();
		}else{
			postalInput.val(postCodeInput);
		}
        //var validatePostalCodeRegex = /^(\s*)[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][A-Za-z]{2}\s*/;
        var validationMessage = $('#postalCodeInputValidation');
		
		var postalInputValue = postCodeInput.replace(/^\s+|\s+$/g, '');
		postalInput.val(postalInputValue);
        
        if (postalInputValue.length == 0 ) {
                postalInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');  
                $('.errorTable').show();              
                $('#postcodeValidation').addClass('validationMessage').removeClass('hideError'); 
                $('#postcodeValidation').text('Please enter a valid postcode');               
              
    
            return true;
        } else {
        
            if(!(checkPostcode(postalInputValue)) ){
                  
                postalInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');   
                $('.errorTable').show(); 
                $('#postcodeValidation').addClass('validationMessage').removeClass('hideError'); 
                $('#postcodeValidation').text('Please enter a valid postcode');   
                return true;        
            }
            else{
                
                postalInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');                
                validationMessage.removeClass('validationMessage').addClass('hideError'); 
                $('#postcodeValidation').text('');               
            }

        }
    }

        function businessCheck(validationError) {
            var bNameInput = $('#businessNameInput');
			var bNameInputValue = bNameInput.val();
			if(bNameInputValue === "Business name"){bNameInputValue = "";}else{bNameInput.val(bNameInputValue);}
            //var fnameRegex = /^[a-zA-Z0-9-\\s]/;
            if( !(validateBusinessname(bNameInput.val())) && bNameInputValue.length !=0 ) {
               
                $('.errorTable').show();
                bNameInput.addClass('validationError-icon validationShadow');
                $('#businessNameValidation').addClass('validationMessage').removeClass('hideError');
                $('#businessNameValidation').text('Please enter a valid business name');
                return true;            

            }
            else {

                if (bNameInputValue.length == 0) {
                    $('.errorTable').show();
                    bNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                    $('#businessNameValidation').addClass('validationMessage').removeClass('hideError');
                    $('#businessNameValidation').text('Please enter a valid business name');
                    return true;
                } else {
                    bNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                    $('#businessNameValidation').removeClass('validationMessage').addClass('hideError');
                    bNameInput.removeAttr('required');
                    return validationError;
                }            

            }

        }

    function bSectorCheck(validationError) {
     
        var titleInput = $('#businessSectorInput');
        
          if (titleInput[0].selectedIndex === 0) { 
            $('.errorTable').show();
          
            $('#businessSectorInput').parent().addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#businessSectorValidation').addClass('validationMessage').removeClass('hideError');
            $('#businessSectorValidation').text('Please enter a business sector');
            return true;
        } else {
      
            titleInput.parent().removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
            $('#businessSectorValidation').removeClass('validationMessage').addClass('hideError');
            $('#businessSectorValidation').text('');
            return validationError;
        }        

    }

    function companySizeCheck(validationError) {
      
        var comSel = $('#companySizeSelect');
        
          if (comSel[0].selectedIndex === 0) { 
            $('.errorTable').show();
           
            comSel.parent().addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#companySizeValidation').text('Please select the company size');
            return true;
        } else {
            
            comSel.parent().removeClass('validationError-icon validationShadow').addClass('successValidation-icon');          
            $('#companySizeValidation').text('');
            return validationError;
        }        

    }

    function empAgeCheck(validationError) {
        var empAgeSel = $('.empNoAge');
          var validError1=false;
		  var validError2=false;
        $('.empNoAge').each(function(i,e){  
            if(i == 0){
			console.log("Step 1"+i);
                 
                  if ($(this)[0].selectedIndex === 0) { 
                    $('.errorTable').show();                         
                    $(this).parent().addClass('validationError-icon validationShadow').removeClass('successValidation-icon');                
                    $('#empAgeValidation').text('Please select employee ages');
                     // validationError = true;
					  validError1 = true;
                    
                } else {
                    $(this).parent().removeClass('validationError-icon validationShadow').addClass('successValidation-icon');  
                    $('#empAgeValidation').removeClass('validationMessage').addClass('hideError');            
                    $('#empAgeValidation').text('');
                   //  validationError = false;                   
					 validError1 = false;
                }
            } 
            if(i == 1){     
               console.log("Step 2"+i);
                  if ($(this)[0].selectedIndex === 0) { 
                    $('.errorTable').show();                         
                    $(this).parent().addClass('validationError-icon validationShadow').removeClass('successValidation-icon');                
                    $('#empAgeValidationTwo').text('Please select employee ages');
                    //  validationError = true;
					  validError2 = true;
                    
                } else {
                    $(this).parent().removeClass('validationError-icon validationShadow').addClass('successValidation-icon');  
                    $('#empAgeValidationTwo').removeClass('validationMessage').addClass('hideError');            
                    $('#empAgeValidationTwo').text('');
                   //  validationError = false;                   
					 validError2 = false;
                }
            }
			
			if(i > 1){
			console.log("Step 3n "+i);			
				if ($(this)[0].selectedIndex === 0) { 
                   // $('.errorTable').show();                         
                    $(this).parent().removeClass('successValidation-icon');                
                    $('#empAgeValidation').text('Please select employee ages');
                    //  validationError = true;
                    
                } else {
                    $(this).parent().addClass('successValidation-icon');  
                   // $('#empAgeValidation').removeClass('validationMessage').addClass('hideError');            
                    //$('#empAgeValidation').text('');
                    // validationError = false;                   
                }
			}
			if(validError1 === false && validError2 === false){
				 validationError = false;
			}else{
				validationError = true;
			}
			
        });       
        return validationError;
    }     
   
	/*Function to a Add the employees and get values in a var*/
 function appendFormItem(id, count, status) {
           var item_count = $('.form-item').length;
           if (item_count == 9) {
				$('#overlays').show();
				$('#overlays .Over9EmployeesCovered').show();
               return;
           }
           for (var index = 1; index <= count; index++) {
          var form_item_id = "smeEm" +  (item_count + 1);
		   var tableRow = '<div class="smeEmployee empShow"><div class="employeeAge clearfix"><span class="delete-row">delete</span><label class="lfloat employeeLabel"> Employee <span class="count">'+ (item_count+1) +'</span></label><div class="styled-select employeeSelect rfloat"><select class="empNoAge" onblur="empAgeCheck(false)"><option value="">Select</option><option value="29">16-29</option><option value="39">30-39</option><option value="49">40-49</option><option value="59">50-59</option><option value="64">60-64</option><option value="69">65-69</option><option value="99">Over 70</option></select></div></div></div>';
			var form_item = "<div id='" + form_item_id + "' class='form-item'>";
			form_item += tableRow;
           form_item += "</div>";
           $('.smeEmployeelist').append(form_item);
           item_count++;
           }
  
			$('.delete-row').on('click', function(){
				$(this).parents('.form-item').remove();
				 item_count = $('.form-item').length;
				var countNew=1;
				$('.employeeLabel').each(function(){
					$(this).html('Employee <span class="count">'+ countNew + '</span>');
					countNew++;
				}); 
				 
			});
           //$("#" + id).prop( "disabled", status );
        }
        
 function getvalues(){
     //$('#get_values').prop( "disabled", true );
     var values = {}
		count=0,		
		emp1= $('#smeEm1').find('select').val(),
		emp2= $('#smeEm2').find('select').val();
    $(".smeEmployeelist .employeeAge ").each(function(){
        var select = $(this).find('select').val();
        //var label = $(this).find('label').text();
        values[count]= select;	
			count++;
    }); 
	
	if((emp1 !== '') && (emp2 !== '')){
     $.ajax({
		url:addUrl+'&smeAjaxFetchSaveQuote=true',
		type:'POST',
		dataType: 'json',
		data:values,
		 beforeSend: function() {
			spinner('newInterstitial', '#smeCoverDetails');
            },
		success:function(result){
			if(result.keyPrice != null  && result.keyPrice != null && result.completePrice != null){
			
				var empAgeArray = [];
				$.each(values, function(v, i){
					if(values[v] === "29"){
						empAgeArray.push("16-29");
					}
					if(values[v] === "39"){
						empAgeArray.push("30-39");
					}
					if(values[v] === "49"){
						empAgeArray.push("40-49");
					}
					if(values[v] === "59"){
						empAgeArray.push("50-59");
					}
					if(values[v] === "64"){
						empAgeArray.push("60-64");
					}
					if(values[v] === "69"){
						empAgeArray.push("65-69");
					}
					if(values[v] === "99"){
						empAgeArray.push("Over 70");
					}
				});
   
					$('.smeBox4 .quoteBox h1.keyCover #keyCover1').text(result.keyCoverPrice);
					$('.smeBox4 .quoteBox h1.keyCover #keyCover2').text('.'+result.keyCoverPrice2);
					$('.smeBox4 .quoteBox h1.enhancedCover #enhancedCover1').text(result.enhancedCoverPrice);
					$('.smeBox4 .quoteBox h1.enhancedCover #enhancedCover2').text('.'+result.enhancedCoverPrice2);
					$('.smeBox4 .quoteBox h1.completeCover #completeCover1').text(result.completeCoverPrice);
					$('.smeBox4 .quoteBox h1.completeCover #completeCover2').text('.'+result.completeCoverPrice2);
					$('.smeBox4 .quoteBox .refCode1 b').text('Reference: '+result.keyRef);
					$('.smeBox4 .quoteBox .refCode2 b').text('Reference: '+result.enhancedRef);
					$('.smeBox4 .quoteBox .refCode3 b').text('Reference: '+result.completeRef);
					
					
					$("#employeeAgesArray").html("");
					$.each(empAgeArray, function(v, i){
						$("#employeeAgesArray").append('<span class="doneSmeDetail">Employee '+ (v+1) +': Aged: <b>'+empAgeArray[v]+'</b></span><br/>');
					});
			}
				sendEmail();
		},
		error:function(e){
			
		},
		complete:function(){			
			spinner('stop');
		}
	 });   
	}
 }
 
 

 
 function sendEmail(){

$('.contactDetail .emailme').on('click', function(){ 
	s.pageName = "business:quick-quote.5";
	s.t();
	var _this = $(this);
	$.ajax({
		url:emailURL+'&smeAjaxFetchSaveQuote=true',
		type:'POST',
		dataType:'json',
		data: {
			'Email': $('.doneSmeDetail.demail b').text()
		},
		beforeSend: function() {
			spinner('newInterstitial', '#smeCoverDetails');
        },
		success:function(result){
			var status = result.EmailStatus;				
			if(status){	
				$('#overlays').show();
				$('#overlays .overlayContainer').show();
				$('#overlays .sendEmailQuoteOverlay').show();							
				$('#overlays .sendEmailQuoteOverlay .showEmailId').text($('.doneSmeDetail.demail b').text());	
			}			
		},
		error:function(e){
			
		},
		complete:function(){			
			spinner('stop');
		}
	});
 });
 
 $('.contactDetail .termsandcond').on('click', function(){ 
		$('#overlays').show();
		$('#overlays .overlayContainer').show();
		$('#overlays .termsConditions').show();	
	
 });
  $('.glossary .termsandcond1').on('click', function(){ 
		$('#overlays').show();
		$('#overlays .overlayContainer').show();
		$('#overlays .termsConditions').show();	
	
 });
 }
 
 
 
 /*end funtion*/