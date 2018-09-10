function Center(){
    var b = $('#register-box').height();
    var a = $(window).height();
    var m = (a - b) >> 1;
    if(m < 0) return;
    $('#register-box').offset(
        { top : m, left : 0 }
    );
}

$(document).ready(function(){
    $(window).resize(Center);
    Center();
    $('#register-form').validate({
        rules : {
            nombre : {
                required : true,
                maxlength : 100,
                spanishWords : true
            },
            apellidoPaterno : {
                required : true,
                maxlength : 100,
                spanishWords : true
            },
            apellidoMaterno : {
                required : true,
                maxlength : 100,
                spanishWords : true
            },
            correo : {
                required : true,
                maxlength : 256,
                email : true
            },
            telefono : {
                required : true,
                maxlength : 10,
                mobileMX : true
            },
            contrasena : {
                required : true,
                minlength : 8
            },
            confirma : {
                equalTo : '#contrasena'
            }
        },
        messages : {
            nombre : {
                required : 'Ingresa tu nombre.',
                maxlength : 'Máximo 100 caractéres.',
                spanishWords : 'Ingresa caractéres válidos.'
            },
            apellidoPaterno : {
                required : 'Ingresa tu apellido paterno.',
                maxlength : 'Máximo 100 caractéres.',
                spanishWords : 'Ingresa caractéres válidos.'
            },
            apellidoMaterno : {
                required : 'Ingresa tu apellido materno.',
                maxlength : 'Máximo 100 caractéres.',
                spanishWords : 'Ingresa caractéres válidos.'
            },
            correo : {
                required : 'Ingresa tu correo.',
                maxlength : 'Máximo 256 caractéres.',
                email : 'Ingresa un correo válido.'
            },
            telefono : {
                required : 'Ingresa tu número de teléfono.',
                maxlength : 'Máximo 10 caractéres.',
                mobileMX : 'Ingresa un número válido.'
            },
            contrasena : {
                required : 'Ingresa una contraseña.',
                minlength : 'Tu contraseña debe ser de al menos 8 caractéres.'
            },
            confirma : {
                equalTo : 'Las contraseñas no coinciden.'
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
            json._token = $("[name='_token']").val();
            console.log(json);
            $.ajax({
                url : '/agregarUsuario',
                method : 'POST',
                data : json
            }).done(function(response){
                if(!response.hasOwnProperty('status'))
                    return;
                if(response.status === 'ERROR'){
                    ErrorToast(response.result);
                    return;
                }
                if(response.status === 'OK'){
                    SuccessToast(response.result);
                    if(response.hasOwnProperty('redirect'))
                        setTimeout(function(){
                            window.location.replace(
                                response.redirect
                            );
                        },2000);
                }
            });
        }
    });
});