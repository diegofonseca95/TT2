Vue.component('priority-span', {
  props : [
    'priority'
  ],
  computed : {
    priorityText : function(){
      if(this.priority === 1){
        return 'Muy Baja';
      }
      if(this.priority === 2){
        return 'Baja';
      }
      if(this.priority === 3){
        return 'Media';
      }
      if(this.priority === 4){
        return 'Alta';
      }
      if(this.priority === 5){
        return 'Muy Alta';
      }
    }
  },
  template : `
    <span>
      {{ priorityText }}
    </span>
  `
});