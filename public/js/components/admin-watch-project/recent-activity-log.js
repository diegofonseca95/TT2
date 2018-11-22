Vue.component('recent-activity-log', {
  data : function(){
    return {
      activities : [],
      channel : null, // The chat connection.
      pusher : null,  // The pusher object.
      newCount : 0    // New notification count.
    };
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var projectIdInput = document.querySelector('input[name="project-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idProyecto : projectIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the project information.
    fetch('/obtenerActividades', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.activities = response.result;
        this.activities.reverse();
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
    // Subscribe to the conversation.
    Pusher.logToConsole = true;
    this.pusher = new Pusher('5527fdb0d65f00f390d4', {
      authEndpoint : '/broadcasting/auth',
      cluster : 'us2',
      auth: {
        headers: {
          'X-CSRF-TOKEN' : authToken.value
        }
      }
    });
    this.channel = this.pusher.subscribe(
      'private-log.' + projectIdInput.value
    );
    this.channel.bind('App\\Events\\Logs', function(data) {
      this.activities.unshift(data.actividad);
      this.newCount++;
      var List = document.querySelector(
        '#recent-activity-log-list'
      );
      List.scrollTop = 0;
    }.bind(this));
  },
  mounted : function(){
    var options = {};
    options.onOpenEnd = function(){
      this.newCount = 0;
    }.bind(this);
    options.onCloseEnd = function(){
      this.newCount = 0;
    }.bind(this);
    M.Collapsible.init(
      document.querySelector('#recent-activity-log'), 
      options
    );
  },
  template : `
    <ul class="collapsible" id="recent-activity-log">
      <li>
        <div class="collapsible-header">
          <i class="material-icons">autorenew</i>Actividad Reciente
          <span class="new badge blue darken-1" data-badge-caption="nuevas"
            v-if="newCount > 0">
            {{ newCount }}
          </span>
        </div>
        <div class="collapsible-body zero-padding">
          <!-- Logs List Begins-->
          <ul class="collection scrollable-collection"
            id="recent-activity-log-list">
            <!-- No Logs to show item begins-->
            <li class="collection-item" 
              v-if="activities.length === 0">
              No hay actividad reciente.
            </li>
            <!-- No Logs to show item ends-->
            <!-- Log Begins -->
            <li class="collection-item avatar" 
              v-for="activity in activities"
              :key="activity.idActividad">
              <i class="material-icons circle third-background">autorenew</i>
              <div class="row">
                <div class="col s12 m9">
                  <span class="title truncate col s12">
                    Fecha: {{ activity.fecha }}
                  </span>
                  <span class="truncate col s12">
                    Acción: {{ activity.mensaje }}
                  </span>
                </div>
              </div>
            </li>
            <!-- Log Ends -->
          </ul>
          <!-- Logs List Ends-->
        </div>
      </li>
    </ul>
  `
});