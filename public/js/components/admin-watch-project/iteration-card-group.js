Vue.component('iteration-card-group', {
  data : function(){
    return {
      iterations : []
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

    // Fetch the sprint list.
    fetch('/obtenerSprintsActivos', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response.result);
      if(response.status === 'OK'){
        this.iterations = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleIterationCreated : function(iteration){
      this.iterations.push(iteration);
    }
  },
  template : `
    <div>
      <iterations-card :iterations="iterations">
      </iterations-card>

      <new-iteration-card
        @iteration-created="handleIterationCreated($event)">
      </new-iteration-card>
    </div>
  `
});