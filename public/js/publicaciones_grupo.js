var authToken = '';

$(document).ready(function(){
    authToken = $("[name = '_token']").val();
    console.log(authToken);
    var app = new Vue({
        el : "#posts-box",
        data : {
            //posts : []
            posts : [
                {
                    id : 0,
                    titulo : 'Aho Corasick', 
                    fechaCreacion : '14/05/2018', 
                    contenido : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                    id : 1,
                    titulo : 'Actividades de la semana', 
                    fechaCreacion : '15/05/2018', 
                    contenido : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                }
            ],
            editMode : false,
            editItem : {}
        },
        mounted : function(){
            $('#post-form').validate({
                rules : {
                    titulo : {
                        required: true,
                        maxlength: 30,
                        spanishWords : true
                    },
                    contenido : {
                        required: true,
                        maxlength: 500
                    }
                },
                messages : {
                    titulo : {
                        required : 'Ingresa un título.',
                        maxlength: 'Máximo 30 caractéres.',
                        spanishWords : 'Ingresa sólo caractéres válidos.'
                    },
                    contenido : {
                        required : 'Ingresa el contenido.',
                        maxlength: 'Máximo 256 caractéres.'
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
                    json._token = authToken;
                    console.log(json);
                    $.ajax({
                        url : this.editMode ? '/editarPublicacion' : '/crearPublicacion',
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
                            ErrorToast(response.result);
                            return;
                        }
                    });
                }.bind(this)
            });
        },
        methods : {
            disableEdit : function(){
                this.editMode = false;
                this.editItem = {};
            },
            enableEdit : function(item){
                this.editItem = item;
                this.editMode = true;
                M.updateTextFields();
            }
        }
    });
    M.AutoInit();
    $('textarea#postContent').characterCounter();
});