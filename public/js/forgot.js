$(document).ready(function(){
    $('#forgot-form').validate({
        rules : {
            userId : {
                required : true,
                email : true
            }
        },
        messages : {
            userId : {
                required : 'Ingresa tu usuario.',
                email : 'Ingresa un usuario válido.'
            }
        },
        errorElement : 'div',
        errorPlacement : function(error, element){
            var placement = $(element).data('error');
            if(placement)
                $(placement).append(error);
            else
                error.insertAfter(element);
        },
        submitHandler : function(form){
            // TODO : Send input
            var json = {};
            $(form).serializeArray().map(function(p){
                var clean = p['value'].split(' ');
                clean = clean.filter(Boolean);
                json[p['name']] = clean.join(' ');
            });
            json._token = $("[name='_token']").val();
            console.log(json);
            $.ajax({
                url : '/recuperarContrasena',
                method : 'POST',
                data : json
            }).done(function(response){
                if(!response.hasOwnProperty('status'))
                    return;
                if(response.status === 'ERROR')
                    ErrorToast(response.result);
                if(response.status === 'OK')
                    SuccessToast(response.result);
            });
        }
    });
});