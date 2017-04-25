$(document).ready(function () {

    // Initially, load the table content
    // GET /api/account
    update_account_table() ;
    
    // Adding a handler to the submit event
    /*
    $("#add_acc_list").submit(function(event) {
    	// Stop the usual form submission event
    	event.preventDefault() ;
        // Check if valid
        var textlength = $("input[name='acc_description']").val().length ;
            if(textlength < 3) {
                $('div#errorbox').text("Name too short").addClass("text-danger") ;
                $("input[name='acc_description']").parent().addClass("has-error") ;
                window.setTimeout(function () {
                    $("input[name='acc_description']").parent().removeClass("has-error") ;
                }, 5000) ;
                event.preventDefault() ;
            } else {

            	// Insert the new element in the DB
            	// POST /api/account
            	// Get the elements required for the post method            	
            	// Update (refresh) the table
            	// PUT /api/account/id
            	//event.preventDefault() ;
            }        
    });
    */
    
    $(".btn_add_acc_item").click(function() {
    	$("#frm_add_acc_item").modal('show') ;
    }) ;
    
    $(".btn_acc_save_item").click(function() {
    	var arr = {acc_type : $("#input_acc_type").val(), acc_category : $("#select_acc_category").val(), acc_date : $("#input_acc_date").val(), description : $("#input_acc_description").val(), amount : $("#input_acc_amount").val()} ;
    	$.ajax({
    		type: "POST",
    		url: "/api/account",
    		dataType: "json",
    		success: function(msg) {
    			if (msg) {
    				alert("เพิ่มข้อมูลรายจ่ายในระบบแล้ว !") ;
    				location.reload(true) ;
    			} else {
    				alert("ไม่สามารถเพิ่มข้อมูลรายจ่าย !") ;
    			}
    		},
    		data: JSON.stringify(arr),
    		contentType: "application/json",
    		accept: "application/json"
    	}) ;
    });
    
    $('.btn_acc_update_item').click(function() {
    	var id_for_update = $("#input_edit_acc_id").val();
    	var update_acc_arr = {acc_type : $("#input_edit_acc_type").val(), acc_category : $("#select_edit_acc_category").val(), acc_date : $("#input_edit_acc_date").val(), description : $("#input_edit_acc_description").val(), amount : $("#input_edit_acc_amount").val()};
    	$.ajax({
    		type: "PUT",
    		url: "/api/account/"+id_for_update,
    		dataType: "json",
    		success: function(msg) {
    			if (msg) {
    				alert("ปรับปรุงข้อมูลรายจ่ายในระบบแล้ว !") ;
    				location.reload(true) ;
    			} else {
    				alert("ไม่สามารถปรับปรุงข้อมูลรายจ่าย !") ;
    			}
    		},
    		data: JSON.stringify(update_acc_arr),
    		contentType: "application/json",
    		accept: "application/json"
    	}) ;
    }) ;
    
    $('#input_acc_date').datetimepicker({
    	timepicker:false,
    	maskInput:true
    });
    
    $('#input_edit_acc_date').datetimepicker({
    	timepicker:false,
    	maskInput:true
    });
    
    $('#date_query_account_list').datetimepicker({
    	defaultDate: ,
    	timepicker:false
    });
    
    $.datetimepicker.setLocale('th');
    
});

function update_account_table() {

    // get the JSON with the list of mybucket from the server
    $.ajax(
        '/api/account',
        {
            method: "GET",
            dataType: "JSON",
            success: function(data, status) {
                // alert(data.objects[0].description) ;
                var account = data.objects ; // array of account
                for(var i=0; i<account.length; i++) {
                	var id = account[i].id ;
                    var description = account[i].description ;
                    var amount = account[i].amount ;
                    var edit_button = '<a id = "'+id+'" class="edit btn btn-default"><span class="glyphicon glyphicon-pencil"></span> แก้ไขรายการ</a>' ;
                    //var delete_button = '<a id = "'+id+'" class="delete btn btn-default"><span class="glyphicon glyphicon-remove"></span> แก้ไขรายการ</a>' ;

                    //<a href="#" id="description">ซื้อกับข้าว</a>
                    
                    $("table#account-list").append("<tr><td>"+id+"</td><td>"+description+
                        "</td><td>"+amount+"</td><td>"+edit_button+"</td></tr>") ;
                } // table is complete, now

                // Delete the element in the DB
                // DELETE /api/account
                
                $("a.edit").click(function(event) {
                	$("#frm_edit_acc_item").modal('show') ;
                	var id_for_edit = this.id ;
                	$.ajax({
                		type: "GET",
                		url: "/api/account/"+id_for_edit,
                		dataType: "json",
                		success: function(one_account, status) {
                			//alert(one_account);
                			var one_account = one_account ;
                			$("#input_edit_acc_id").val(one_account.id);
                			$("#input_edit_acc_type").val(one_account.acc_type);
                			$("#select_edit_acc_category").val(one_account.acc_category);
                			$("#input_edit_acc_date").val(one_account.acc_date);
                			$("#input_edit_acc_description").val(one_account.description);
                			$("#input_edit_acc_amount").val(one_account.amount);
                		}
                	}) ;
                	
                }) ;
                
                $("a.delete").click( function(event) {
                	var id_for_delete = this.id ;
                	$.ajax({
                		method: "DELETE",
                		url: "/api/account/"+id_for_delete,
                		contentType: "application/json",
                		processdata: false,
                		dataType: "json",
                		success: function(Msg) {
                			alert("ลบข้อมูลรายการจ่ายออกแล้ว !") ;
                			location.reload(true) ;
                		},
                		error: function(errMsg) {
                			alert("ไม่สามารถบข้อมูลได้ !") ;
                		}
                	}) ;
                }) ;

            }
        }
    ) ;
}