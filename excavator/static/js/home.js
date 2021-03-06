$( document ).ready(function() 
{
	M.AutoInit();


	// 10EE80
	// $('.modal').open();
	var BASE_URL = $(location).attr("origin");
	var csrfmiddlewaretoken=$("input[name=csrfmiddlewaretoken]").val()
	function async_updateinfo()
	{
		var managing_code=$('#track_code').text();
		if(managing_code == undefined |managing_code == ''){}
		else{
			fetchRecords(managing_code)
		}
	}
	$('#refresh_logs').on("click",function(e)
	{
		async_updateinfo();
	});
	$('#result_records').on("click",'.showmore',function(self)
	{
		var rec_data=this.dataset;
		var all_keys=Object.keys(rec_data);
		var instance = M.Modal.getInstance($('#modalShowIP'));
		append_string=""
		all_keys.forEach(function(key)
		{
		 append_string=append_string+
		 "<li class='collection-item'>"+
		 "<span><strong>"+key.replace('_'," ").toUpperCase()+"</strong> :</span>"+
		 "<span class=''>"+rec_data[key]+"</span>"+
		 "</li>"
		});
		$('#modalResultFooter').html(append_string);
		instance.open();
	});
	function showLowerSlide()
	{

	}
   function formPOSTHandler(formData)
   {
		var search_field= $('#searchIDorURL')
		if(search_field.val().length == 6)
		{
			DoAjax(
				{'access_key':search_field.val(),'csrfmiddlewaretoken':csrfmiddlewaretoken},
				BASE_URL+'/load',
				'POST',
				onLoadExisting,"Checking existing Logger")

		}
		else
		{
			DoAjax({'access_key':search_field.val(),'csrfmiddlewaretoken':csrfmiddlewaretoken},BASE_URL+'/create','POST',onNewCreate,"Creating Logger")
		}
		ResetFields(formData);	
   }
   function onLoadExisting(response={})
   {  	
	   if(response.origin_url != false)
		   	{
				appendreqData("Orignal Url",response.origin_url,'origin_url')
				appendreqData("New Url ",BASE_URL+"/"+response.tracking_code,'managing_code')
				appendreqData("Tracking Code ",response.managing_code,'track_code')
				fetchRecords(response.managing_code);
				showresults();
			}
		else
		{
			M.toast({html: "Sorry not found",displayLength:3500});
		}
		
	   }
	function fetchRecords(mcode)
	{
		DoAjax(
			{'access_key':mcode,'csrfmiddlewaretoken':csrfmiddlewaretoken},
			BASE_URL+'/load_results',
			'POST',
			updateRecords,"Loading results")
	}
	function updateRecords(response={})
	{
		$('#result_records li').remove();
		$.each(response.data, function(key,value) {
			appendRecordData(value)
		});
	}
   function onNewCreate(response={}) 
   {
		appendreqData("Orignal Url",response.origin_url,'origin_url')
		appendreqData("New Url ",BASE_URL+"/"+response.tracking_code,'managing_code')
		appendreqData("Tracking Code ",response.managing_code,'track_code')
		showresults();

   }
   function appendreqData(name,value,rec_id)
   {
   		$('.tracker_info').append("<tr><td>"+name+"</td><td id="+rec_id+">"+value+"</td></tr>");
   }
   function appendRecordData(recordSingle)
   {
	   all_keys=(Object.keys(recordSingle))
	   append_string=""
		var defau ="NA";

	   all_keys.forEach(function(key)
	   {
		append_string=append_string+" data-"+key+"='"+(recordSingle[key] == undefined || recordSingle[key] ==null ? defau :recordSingle[key] )+"'"
	   });

	//    $('#result_records').append(
		
	// 	"<tr>"
	// 	+"<td>"+recordSingle.device_info+"</td>"+
	// 	"<td>"+(recordSingle.request_api_ip == undefined || recordSingle.request_api_ip ==null ? recordSingle.origin_ip :recordSingle.request_api_ip )+"</td>"+
	// 	"<td class='showmore' "+append_string+"><i class='material-icons'>send</i>"+"</td>"
	// 	+"</tr>"
	// );
  $('#result_records').append(
	"<li class='collection-item'>"+
	"<i class='showmore secondary-content material-icons'"+append_string+">send</i>"+
	"<strong>Device</strong>:"+recordSingle.device_info+"<br>"+
	"<span> <strong> IP</strong>:"+(recordSingle.request_api_ip == undefined || recordSingle.request_api_ip ==null ? recordSingle.origin_ip :recordSingle.request_api_ip )+"</span><br>"+
	"</li>"
	);
   }
   function ResetFields(form)
   {
		var search_field= $('#searchIDorURL');
		search_field.attr('type',"search");
		search_field.removeClass("holup");
		$("#searchiconToken").show();
	   	form.reset();return;
   }
   function DoAjax(data,url,method,callback=false,message='loading')
   {
		$.ajax({
			type:method,
			url:url,
			data:data,
            cache: false,
            beforeSend: function(xhr)
            {
				M.toast({html: message,displayLength:1500});
            },
            success: function (response) 
            { 
            		if($.isFunction(callback))
            		{
	            		callback(response);
            		}
            },
            error: function (e)
            {
            	console.log(e);
            	if($.isFunction(callback))
            		{
            			callback(e);
            		}
            }
		});
   }

   function appenddummydata(search_field_dummy="NA")
   {
   			appendreqData('Orignal Url',search_field_dummy);
			appendreqData('New URL ','https://grabify.link/V4PMN1');
			appendreqData('Tracking Code ','JFXZOL');
			appendreqData('Access Link','https://grabify.link/track/JFXZOL');
   }

   function hideresults()
   {
   		if(!$('.result_date').hasClass("hide"))
			{
				$('.result_date').addClass("hide");
			}

   }
   function showresults()
   {
   		if($('.result_date').hasClass("hide"))
			{
				$('.result_date').removeClass("hide");
			}
   }
   $('.form-globalsearch').submit(function(e)
   {
	if(this.method == "post")
	{
		hideresults();
		$('.tracker_info tr').remove();
		$('#result_records tr').remove();
		e.preventDefault();
		formPOSTHandler(this); return;
	}
});
$("#searchIDorURL").on("input", function()
{
		var search_field= $('#searchIDorURL')
		if(search_field.val().length > 6 && search_field.attr('type')=='search')
		{
			console.log("convert to url");
			search_field.attr('type',"url")
			search_field.addClass("holup");
			$("#searchiconToken").hide();
		}
		else if(search_field.val().length <= 6 && search_field.attr('type') != 'search')
		{
			console.log(search_field.val().length);
			search_field.attr('type',"search")
			search_field.removeClass("holup");
			$("#searchiconToken").show();

		}
});
	
 });
