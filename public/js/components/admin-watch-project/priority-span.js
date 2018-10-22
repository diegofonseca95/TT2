Vue.component('priority-span', {
  props : [
    'priority'
  ],
  computed : {
    priorityText : function(){
      if(priority === 1){
        return 'Muy Baja';
      }
      if(priority === 2){
        return 'Baja';
      }
      if(priority === 3){
        return 'Media';
      }
      if(priority === 4){
        return 'Alta';
      }
      if(priority === 5){
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