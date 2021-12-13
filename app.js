(function (window) {
    let testAlert = () => alert("test2");
    window.test = {
        isReady(successCallBack) {
            jq(document).ready(function(){
                successCallBack();
                testAlert();
            });
        }
    };
})(window);