Vue.component('group-projects-card', {
  props : ['groupId'],
  data : function(){
    return {};
  },
  methods : {
    handleCreateProject : function(){
      var groupIdInput = document.querySelector('input[name="group-id"]');
      window.location.replace('/agregarProyecto/' + groupIdInput.value);
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Proyectos</b>
        </span>
        <project-list
          :group-id="groupId">
        </project-list>
        <div class="row">
          <div class="col s12">
            <a class="btn-floating btn-large remove-button-background right"
              href="#!" title="Agregar proyecto" 
              @click="handleCreateProject">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
});

/*
<!-- Group Projects Begin -->
<div class="card">
  <div class="card-content">
    <span class="card-title first-text">
      <b>Proyectos</b>
    </span>
    <project-list>
    </project-list>
    <div class="row">
      <div class="col s12">
        <a href="#!" title="Agregar proyecto" class="btn-floating btn-large remove-button-background right">
          <i class="material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</div>
<!-- Group Projects End-->
*/