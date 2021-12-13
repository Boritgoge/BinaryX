const jq = $.noConflict(true);
(function(window){
    window.BinaryX = {
        init() {
            BinaryX.ready(function(){
                GM_xmlhttpRequest({
                    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/app.css',
                    method: 'GET',
                    synchronous: true,
                    onload: function({response}){
                        BinaryX.addStyle(response);
                        console.log('response1');
                    }
                });
                console.log('response2');

                GM_xmlhttpRequest({
                    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/app.html',
                    method: 'GET',
                    synchronous: true,
                    onload: function({response}){
                        BinaryX.addHtml(response);
                        console.log('response3');
                    }
                });
            });
        },
        ready(callback) {
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