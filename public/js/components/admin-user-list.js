Vue.component('admin-user-list', {
  props : ['componentId','filter','users'],
  data : function(){
    return {
      searchInput : '',
      userCount : 0
    };
  },
  mounted : function(){
    M.updateTextFields();
  },
  methods : {
    handleMemberSelected : function(selectedUser){
      this.$emit('member-selected', selectedUser);
    }
  },
  computed : {
    userList : function(){
      const tokens = this.searchInput.split(' ').filter(Boolean);
      this.userCount = 0;
      return this.users.filter(user => {
        if(user.valid == this.filter){
          if(tokens.length == 0){
            this.userCount++;
            return true;
          }
          var display = false;
          for(var i in tokens){
            const token = tokens[i].toLowerCase();
            var field = user.apellidoPaterno.toLowerCase();
            if(field.includes(token)){
              display = true;
              break;
            }
            field = user.apellidoMaterno.toLowerCase();
            if(field.includes(token)){
              display = true;
              break;
            }
            field = user.telefono.toLowerCase();
            if(field.includes(token)){
              display = true;
              break;
            }
            field = user.nombre.toLowerCase();
            if(field.includes(token)){
              display = true;
              break;
            }
            field = user.correo.toLowerCase();
            if(field.includes(token)){
              display = true;
              break;
            }
          }
          if(display)
            this.userCount++;
          return display;
        } 
        return false;
      });
    } 
  },
  template : 
      "<div>" +
          "<form class='row'>" +
              "<div class='input-field col s12'>" +
                  "<i class='material-icons prefix third-text'>search</i>" +
                  "<input v-model='searchInput' placeholder='Ingresa palabras clave'" +
                      " v-bind:id='componentId' type='text' class='validate'>" +
                  "<label v-bind:for='componentId'>B&uacute;squeda de Usuarios</label>" +
              "</div>" +
          "</form>" +
          "<div class='row'>" +
              "<div class='col s12'>" +
                  "<ul class='collection with-header' " +
                      "style='max-height:500px;overflow:auto;'>" +
                      "<li v-if='!userCount' class='collection-item'>" +
                          "No hay usuarios que mostrar." +
                      "</li>" +
                      "<admin-user-list-item " +
                      "@member-selected='handleMemberSelected'" +
                      "v-for='user in userList'" +
                      "v-bind:key='user.idUsuario'" +
                      "v-bind:user='user'>" +
                      "</admin-user-list-item>" +
                  "</ul>" +
              "</div>" +
          "</div>" +
      "</div>"
});