Vue.component('iterations-card', {
  props : ['iterations'],
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Iteraciones</b>
        </span>
        <iteration-list :iterations="iterations">
        </iteration-list>
      </div>
    </div>
  `
});