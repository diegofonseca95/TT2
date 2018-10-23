Vue.component('choose-task-user-modal', {
  props : ['projectMembers'],
  data : function(){
    return {
      chosenUser : null
    };
  },
  methods : {
    handleTaskUserChosen : function(user){
      this.chosenUser = user;
    },
    handleSubmitUser : function(){
      if(this.chosenUser !== null){
        this.$emit('task-user-submitted', this.chosenUser);
        this.chosenUser = null;
      }
    }
  },
  mounted : function(){
    var elems = document.querySelector('#choose-task-user-modal');
    var instances = M.Modal.init(elems);
  },
  template : `
    <div id="choose-task-user-modal" 
      class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Asignar tarea</h4>
        <div class="row">
          <form class="col s12">
            <task-user-list 
              @task-user-chosen="handleTaskUserChosen($event)"
              :project-members="projectMembers">
            </task-user-list>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!">
          Cancelar
        </a>
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!" @click="handleSubmitUser">
          Asignar tarea
        </a>
      </div>
    </div>
  `
});