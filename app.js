const vm = new Vue({
    el: 'test',
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
});