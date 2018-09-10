var authToken = '';

$(document).ready(function(){
    authToken = $("[name = '_token']").val();
    var app = new Vue({
        el : "#admin-users-box",
        data : {
            users : []
        },
        mounted : function(){
            $.ajax({
                url : '/obtenerUsuarios',
                method : 'POST',
                data : {
                    _token : authToken
                }
            }).done(function(response){
                console.log(response);
                this.users = response.map(user => {
                    user.valid = (user.estado == 1);
                    return user;
                });
            }.bind(this));
        }
    });
    M.AutoInit();
});