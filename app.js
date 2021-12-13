const jq = $.noConflict(true);
(function(window){
    window.BinaryX = {
        onReady(callback) {
            jq(document).ready(function(){
                callback();
            });
        },
        addStyle(styles) {
            jq('head').append(`<style type="text/css">${styles}</style>`);
        },
        addHtml(html) {
            jq('body').append(html);
        }
    }
})(window);