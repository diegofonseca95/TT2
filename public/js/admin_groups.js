var authToken = '';

$(document).ready(function(){
    authToken = $("[name = '_token']").val();
    console.log(authToken);
    var app = new Vue({
        el : "#admin-groups-box",
        data : {
            groups : []
        },
        mounted : function(){
            $.ajax({
                url : '/obtenerGrupos',
                method : 'POST',
                data : {
                    _token : authToken
                }
            }).done(function(response){
                console.log(response);
                this.groups = response;
            }.bind(this));
        }
    });
    M.AutoInit();
});