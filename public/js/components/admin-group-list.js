Vue.component('admin-group-list', {
    props : ['componentId','groups'],
    data : function(){
        return {
            searchInput : '',
            groupCount : 0
        };
    },
    mounted : function(){
        M.updateTextFields();
    },
    computed : {
        groupList : function(){
            const tokens = this.searchInput.split(' ').filter(Boolean);
            this.groupCount = 0;
            return this.groups.filter(group => {
                if(group.valid == this.filter){
                    if(tokens.length == 0){
                        this.groupCount++;
                        return true;
                    }
                    var display = false;
                    for(var i in tokens){
                        const token = tokens[i].toLowerCase();
                        if(group.nombreGrupo.toLowerCase().includes(token)){
                            display = true;
                            break;
                        }
                    }
                    if(display)
                        this.groupCount++;
                    return display;
                } 
                return false;
            });
        } 
    },
    template : 
        "<div>" +
            "<form class='row'>" +
                "<div class='input-field col s12'>" +
                    "<i class='material-icons prefix third-text'>search</i>" +
                    "<input v-model='searchInput' placeholder='Ingresa palabras clave'" +
                        " v-bind:id='componentId' type='text' class='validate'>" +
                    "<label v-bind:for='componentId'>B&uacute;squeda de Grupos</label>" +
                "</div>" +
            "</form>" +
            "<div class='row'>" +
                "<div class='col s12'>" +
                    "<ul class='collection with-header' " +
                        "style='max-height:500px;overflow:auto;'>" +
                        "<li v-if='!groupCount' class='collection-item'>" +
                            "No hay grupos que mostrar." +
                        "</li>" +
                        "<admin-group-list-item " +
                            "v-for='group in groupList'" +
                            "v-bind:key='group.idGrupo'" +
                            "v-bind:group='group'>" +
                        "</admin-group-list-item>" +
                    "</ul>" +
                "</div>" +
            "</div>" +
        "</div>"
});