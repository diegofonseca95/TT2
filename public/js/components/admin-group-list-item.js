Vue.component('admin-group-list-item', {
    props : ['group'],
    data : function(){
        return {
            deleted : false
        };
    },
    methods : {
        deleteGroup : function(event){
            $.ajax({
                url : '/eliminarGrupo',
                method : 'POST',
                data : {
                    idGrupo : this.group.idGrupo,
                    _token : authToken
                }
            }).done(function(response){
                if(!response.hasOwnProperty('status'))
                    return;
                if(response.status === 'OK'){
                    SuccessToast(response.result);
                    this.deleted = true;
                }
                if(response.status === 'ERROR')
                    ErrorToast(response.result);
            }.bind(this));
        },
        editGroup : function(){
            window.location.replace('/editarGrupo/' + this.group.idGrupo);
        }
    },
    template : 
        "<li class='collection-item avatar' v-if='!deleted'>" +
            "<i class='material-icons circle third-background'>person</i>" +
            "<div class='row'>" +
                "<span class='title truncate col s12'>" +
                    "{{ group.nombreGrupo }}" +
                "</span>" +
                "<p class='truncate col s12'>" +
                    "{{ group.descripcion }}" +
                "</p>" +
                "<div class='col s12'>" +
                    "<div class='col s4 offset-s2 m2 offset-m8 l3 offset-l5'>" +
                        "<a href='#!' class='btn red' title='Eliminar' v-on:click='deleteGroup'>" +
                            "<i class='material-icons'>close</i>" +
                        "</a>" +
                    "</div>" +
                    "<div class='col s4 offset-s2 m2 l3 offset-l1'>" +
                        "<a href='#!' v-on:click='editGroup' class='btn light-blue darken-2' title='Ver'>" +
                            "<i class='material-icons'>edit</i>" +
                        "</a>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</li>"
});