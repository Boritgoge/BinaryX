import moduleTest from './moduleTest';
(function (window) {
    window.test = {
        isReady(successCallBack) {
            jq(document).ready(function(){
                successCallBack();
                moduleTest();
            });
        }
    };
})(window);