Vue.component('group-info-card', {
  props : ['groupMembers'],
  data : function(){
    return {
      groupInfo : {
        nombre : 'El mejor grupo del mundo',
        descripcion : 'La peor descripcion del universo'
      }
    };
  },
  methods : {
    handleUpdatedInfo : function(newInfo){
      // TODO : Update info from server.
      console.log('Updating Group Info...');
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>{{ groupInfo.nombre }}</b>
        </span>
        <div class="row">
          <span class="title col s12" style="word-break: break-all;">
            {{ groupInfo.descripcion }}
          </span>
          <span class="title col s12" style="word-break: break-all;">
            Líder del grupo: Nombre Apellido
          </span>
          <div class="col s12">
            <button title="Editar" data-target="edit-group-info-modal" 
              class="btn-floating btn-large modal-trigger remove-button-background right">
              <i class="material-icons">mode_edit</i>
            </button>
          </div>
        </div>
      </div>
      <edit-group-info-modal
        @group-info-updated='handleUpdatedInfo'
        :group-members="groupMembers"
        :group-info="groupInfo">
      </edit-group-info-modal>
    </div>
  `
});

/*
<!-- Group Info Begins -->
<div class="card">
  <div class="card-content">
    <span class="card-title first-text">
      <b>{{ groupInfo.nombre }}</b>
    </span>
    <div class="row">
      <span class="title col s12" style="word-break: break-all;">
        {{ groupInfo.descripcion }}
      </span>
      <span class="title col s12" style="word-break: break-all;">
        Líder del grupo: Nombre Apellido
      </span>
      <div class="col s12">
        <button title="Editar" data-target="edit-group-info-modal" class="btn-floating btn-large modal-trigger remove-button-background right">
          <i class="material-icons">mode_edit</i>
        </button>
      </div>
    </div>
  </div>
  <edit-group-info-modal :group-info="groupInfo" :group-members="users">
  </edit-group-info-modal>
</div>
<!-- Group Info Ends -->
*/