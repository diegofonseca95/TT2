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
    handleIterationCreated : function(){
      // TODO : Add the new iteration on success
      // to save network resources.
    }
  },
  template : `
    <div>
      <iterations-card :iterations="iterations">
      </iterations-card>

      <new-iteration-card>
      </new-iteration-card>
    </div>
  `
});