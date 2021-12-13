
(function (window) {
    window.test = {
        isReady(successCallBack) {
            jq(document).ready(function(){
                successCallBack();
                alert("123123");
                
            });
        }
    };
})(window);