Vue.component('new-member-list-item', {
  props : ['user','selected'],
  data : function(){
    return {};
  },
  methods : {
    handleChange : function(event){
      if(event.target.checked){
        this.$emit('add-new-member', this.user.idUsuario);
      }else{
        this.$emit('remove-new-member', this.user.idUsuario);
      }
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <div class="col s12 m9">
          <span class="title truncate col s12">
            <user-full-name-span :user="user">
            </user-full-name-span>
          </span>
          <span class="truncate col s12">
            Correo : {{ user.correo }}
          </span>
          <span class="truncate col s12">
            Teléfono : {{ user.telefono }}
          </span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <input type="checkbox" 
              @change="handleChange($event)"
              :checked="selected"/>
            <span>Agregar</span>
          </label>
        </div>
      </div>
    </li>
  `
});

/*
<!-- User Begins -->
<li class="collection-item avatar">
  <i class="material-icons circle third-background">person</i>
  <div class="row">
    <div class="col s12 m9">
      <span class="title truncate col s12">
        {{ userFullName }}
      </span>
      <span class="title truncate col s12">
        Correo : {{ user.correo }}
      </span>
      <span class="title truncate col s12">
        Teléfono : {{ user.telefono }}
      </span>
    </div>
    <div class="col s12 m3">
      <label class="right">
        <input type="checkbox" />
        <span>Agregar</span>
      </label>
    </div>
  </div>
</li>
<!-- User Ends -->
*/