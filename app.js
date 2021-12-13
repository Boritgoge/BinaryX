const vm = new Vue({
    el: 'app',
    data: function(){
        return {
            test:'test'
        }
    },
    mounted(){
        test();
    },
    methods: {
        test() {
            alert("test22222");
        }
    }
})