function WarningToast(warning){
    M.toast({
        html : warning,
        classes : "yellow accent-3 black-text"
    });
}

function SuccessToast(success){
    M.toast({
        html : success,
        classes : "green accent-4"
    });
}

function ErrorToast(error){
    M.toast({
        html : error,
        classes : "red accent-3"
    });
}