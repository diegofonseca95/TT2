$(document).ready(function(){
    $('#login-form').validate({
        rules : {
            correo : {
                required: true,
                maxlength: 256,
                email : true
            },
            contrasena : {
                required: true,
                minlength: 8,
                maxlength: 20
            }
        },
        messages : {
            correo : {
                required : 'Ingresa tu correo electrónico.',
                maxlength: 'Máximo 256 caractéres.',
                email : 'Ingresa un correo electrónico válido.',
            },
            contrasena : {
                required : 'Ingresa tu contraseña',
                minlength : 'La contraseña debe tener al menos 8 caracteres.',
                maxlength: 'La contraseña debe tener a lo más 20 caracteres.'
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
            var json = {};
            $(form).serializeArray().map(function(p){
                var clean = p['value'].split(' ');
                clean = clean.filter(Boolean);
                json[p['name']] = clean.join(' ');
            });
            // ERROR TEST : https://api.myjson.com/bins/19xl8j
            // OK TEST : https://api.myjson.com/bins/a9q3n
            console.log(json);
            $.ajax({
                url : '/iniciarSesion',
                method : 'POST',
                data : json
            }).done(function(response){
                if(!response.hasOwnProperty('status'))
                    return;
                if(response.status === 'ERROR'){
                    ErrorToast(response.result);
                    return;
                }
                // Replace with the actual 
                // page/script
                window.location.replace(response.result);
            });
        }
    });
});
