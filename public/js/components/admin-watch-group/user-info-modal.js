Vue.component('user-info-modal', {
  props : ['user'],
  data : function(){
    return {};
  },
  watch : {
    userId : function(){
      console.log('CHANGED FOREVER ');
      console.log(this.user);
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