Vue.component('doing-task-list-item', {
  props : ['task'],
  computed : {
    fileInputId : function(){
      return 'doing-task-file-input-' + this.task.tarea.idTarea;
    },
    dropdownId : function(){
      return 'doing-task-dropdown-' + this.task.tarea.idTarea;
    },
    downloadLink : function(){
      return '/descargarEvidencia/' + this.task.tarea.idTarea;
    },
    triggerId : function(){
      return 'doing-task-trigger-' + this.task.tarea.idTarea;
    },
    canManipulate : function(){
      return this.task.evaluable
        || this.task.editable;
    }
  },
  mounted : function(){
    console.log(this.task);
    if(this.canManipulate){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment: 'right', constrainWidth: false }
      );
    }
  },
  updated : function(){
    console.log(this.task);
    if(this.canManipulate){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment: 'right', constrainWidth: false }
      );
    }
  },
  methods : {
    triggerFileInput : function(){
      // Open the file picker from the hidden file input.
      var fileInput = document.getElementById(this.fileInputId);
      fileInput.value = '';
      fileInput.click();
    },
    sendFile : function(){
      var fileInput = document.getElementById(this.fileInputId);
      if(fileInput.value !== ''){
        var authToken = document.querySelector(
          'input[name="_token"]'
        );
        var file = fileInput.files[0];
        var data = new FormData();
        console.log(this.task);
        data.append('idTarea', this.task.tarea.idTarea);
        data.append('_token', authToken.value);
        data.append('fila', file);
        fetch('/subirEvidencia', {
          method : 'POST',
          body : data
        })
        .then(response => response.json())
        .then(function(response){
          if(response.status === 'OK'){
            console.log(response.tarea);
            this.$emit('task-updated', response.tarea);
            SuccessToast(response.result);
          }else{
            WarningToast(response.result);
          }
        }.bind(this));
      }
    },
    handleApprovedDeliverable : function(){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idTarea : this.task.tarea.idTarea,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/validarEvidencia', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          console.log(response.tarea);
          this.$emit('deliverable-approved', response.tarea);
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    },
    handleRejectedDeliverable : function(){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idTarea : this.task.tarea.idTarea,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/rechazarEvidencia', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          console.log(response.tarea);
          this.$emit('task-updated', response.tarea);
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    }
  },
  template : `
    <div class="row zero-margin-bottom">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title">
                Tarea {{ task.tarea.numeroTarea }}
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons right"
                    :id="triggerId" :data-target="dropdownId"
                    v-if="canManipulate"
                    title="Opciones">more_vert</i>
                </a>
                <i class="material-icons right" 
                  title="Pendiente de validar"
                  v-if="task.status.pendiente">timer</i>
                <i class="material-icons right" 
                  title="Evidencia rechazada"
                  v-if="task.status.rechazada">close</i>
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                {{ task.tarea.descripcion }}
              </span>
              <span class="col s12">
                Evidencia solicitada: {{ task.tarea.evidencia }}
              </span>
              <span class="col s12">
                Encargado: 
                <user-full-name-span :user="task.encargado">
                </user-full-name-span>
              </span>
              <span class="col s12">
                Prioridad: 
                <priority-span :priority="task.tarea.puntaje">
                </priority-span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content"
        v-if="canManipulate">
        <li v-if="task.editable">
          <a href="#!" @click="triggerFileInput">
            Subir evidencia
          </a>
        </li>
        <li> 
          <a :href="downloadLink" target="_blank">
            Descargar evidencia
          </a>
        </li>
        <li v-if="task.evaluable"> 
          <a href="#!"
            @click="handleApprovedDeliverable">
            Validar evidencia
          </a>
        </li>
        <li v-if="task.evaluable">
          <a href="#!"
            @click="handleRejectedDeliverable">
            Rechazar evidencia
          </a>
        </li>
      </ul>
      <input type="file" class="hide"
        :id="fileInputId" 
        @change="sendFile"/>
    </div>
  `
});