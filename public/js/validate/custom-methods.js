$.validator.addMethod( "spanishWords", function(value, element){
    var regex = /^([a-záéíóúñ]+[ ]*)+$/i;
    return this.optional(element) 
    || regex.test(value.trim().toLowerCase());
}, "Letters only please." );

$.validator.addMethod( "spanishWord", function(value, element){
    var regex = /^[a-záéíóúñ]+$/i;
    return this.optional(element) 
    || regex.test(value.trim().toLowerCase());
}, "Letters only please." );

$.validator.addMethod( "mobileMX", function(value, element){
    var regex = /^[0-9]{10}$/i;
    return this.optional(element) 
    || regex.test(value.split(' ').join(''));
}, "Letters only please." );