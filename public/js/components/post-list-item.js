Vue.component('post-list-item', {
    props : ['post','editFunction'],
    data : function(){
        return {
            deleted : false
        };
    },
    methods : {
        setEditable : function(){
            this.editFunction(this.post);
        }
    },
    template : 
"<div class='card'>" +
"<div class='card-content'>" +
"<ul id='dropdown"+post.id+"' class='dropdown-content'>" +
"<li><a class='first-text modal-trigger' href='#post-modal' v-on:click='setEditable'>" +
"<i class='material-icons'>edit</i>Editar" +
"</a></li>" +
"<li><a href='#!' class='red-text'>" +
"<i class='material-icons'>close</i>Eliminar" +
"</a></li>" +
"</ul>" +
"<span class='card-title grey-text text-darken-4'>" +
"<b>{{ post.titulo }}</b>" +
"<a href='#!' class='black-text'>" +
"<i data-target='dropdown"+post.id+"' class='dropdown-trigger material-icons right tooltipped' data-position='left' data-tooltip='Opciones'>more_vert</i>" +
"</a>" +
"</span>" +
"<p>Publicado en : {{ post.fechaCreacion }}</p>" +
"<br/>" +
"<p>" +
"{{ post.contenido }}" +
"</p>" +
"</div>" +
"</div>"
});