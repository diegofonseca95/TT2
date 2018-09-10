function Center(){
    var b = $('#login-box').height();
    var a = $(window).height();
    var m = (a - b) >> 1;
    if(m < 0) return;
    $('#login-box').offset(
        { top : m, left : 0 }
    );
}
$(document).ready(function(){
    var instance = M.Modal.init(
        document.querySelector('.modal')
    );
    $(window).resize(Center);
    Center();
});