const jq = $.noConflict(true);
jq(document).ready(function(){
    jq(this).append('<div id="test2"></div>');
    const vm = new Vue({
        el: 'test2',
        data: function(){
            return {
                test2:'test2'
            }
        },
        mounted(){
            this.test2();
        },
        methods: {
            test2() {
                alert("test22222");
            }
        }
    });
})
