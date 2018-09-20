Vue.component('user-info-modal', {
  props : ['userId'],
  data : function(){
    return {};
  },
  watch : {
    userId : function(){
      console.log('CHANGED FOREVER ' + this.userId);
    }
  },
  template : `
    <div class="row">
      <div class="col s12">
        {{ userId }}
      </div>
    </div>
  `
});