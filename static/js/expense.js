$(document).ready(function() {
	
	$.ajax({
		type: "GET",
		url: "/api/account",
		dataType: "json",
		success: function(data) {
			if (data) {
				for(i=0; i<data.objects.length; i++){
					$("#expense-list").append("<tr><td><input class='acc_item_checkbox' type='checkbox'>"+data.objects[i].id+
							"</td><td><a href='#' id='description'>"+data.objects[i].description+
							"</a></td><td>"+data.objects[i].amount+
							"</td><td>"+data.objects[i].acc_category+
							"</td></tr>");
				}
			} else {
				alert("ไม่สามารถดึงข้อมูลจากระบบ !") ;
			}
			
			$('.acc_item_checkbox').change(function() {
				alert($('.acc_item_checkbox').val());
			});
			

			
		},
		contentType: "application/json",
		accept: "application/json"
	

			
	}) ;
	
	$('#description1').editable();		
	
});