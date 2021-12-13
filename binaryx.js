const jq = $.noConflict(true);
(function(window){
    window.BinaryX = {
        init() {
            BinaryX.ready(function(){
                //Load Css
                GM_xmlhttpRequest({
                    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/binaryx.css',
                    method: 'GET',
                    onload: function({response}){
                        BinaryX.addStyle(response);
                    }
                });

                //Load Html
                GM_xmlhttpRequest({
                    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/binaryx.html',
                    method: 'GET',
                    onload: function({response}){
                        BinaryX.addHtml(response);
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
            BinaryX.loadApp();
        },
        loadApp(){
            const vm = new Vue({
                el: '#binaryx_popup',
                data() {
                    return {
                        test: '123123'
                    }
                },
                mounted(){
                    console.log(this.test);
                }
            })
        }
    }
})(window);