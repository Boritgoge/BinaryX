const jq = $.noConflict(true);
jq(window).append('<div id="app"></div>');
const vm = new Vue({
    el: 'app',
    data: function(){
        return {
            test:'test'
        }
    },
    mounted(){
        this.test();
    },
    methods: {
        test() {
            alert("test22222");
        }
    }
})