Vue.component('project-list-item', {
  props : ['project', 'projectLeader'],
  data : function(){
    return {};
  },
  methods : {
    handleDeleteProject : function(){
      // TODO : Check if it works.
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idProyecto : this.project.idProyecto,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/eliminarProyecto', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
          this.$emit('project-deleted', this.project);
          SuccessToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    },
    handleWatchProject : function(){
      window.location.replace('/verProyecto/' + this.project.idProyecto);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">folder</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ project.nombreProyecto }}
        </span>
        <span class="title truncate col s12">
          Líder del proyecto :
          <user-full-name-span :user="projectLeader">
          </user-full-name-span>
        </span>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Eliminar"
            @click="handleDeleteProject">
            <i class="material-icons">remove</i>
          </a>
          <a class="btn remove-button-background"
            href="#!" title="Ver" 
            @click="handleWatchProject">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});