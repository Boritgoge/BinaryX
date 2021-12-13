(function (window) {    
    window.test = {
        isReady(successCallBack) {
            jq(document).ready(function(){
                successCallBack();
                alert("test2");
            });
        }
    };
})(window);