Vue.component('iteration-card-group', {
  data : function(){
    return {
      iterations : []
    };
  },
  beforeCreate : function(){
    // TODO : Fetch iteration list.
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