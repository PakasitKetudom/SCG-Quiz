<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        {{ test }}
        {{ movies }}
      </h1>
      <div>
        {{ vending_machine }}
      </div>

      <div>
        {{ selectID_vending_machine }}
      </div>

      <div>
        {{ new_vending_machine }}
      </div>

      <button @click="addSupply">addSupply</button>

      <div>{{ text }}</div>
      <!-- <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default{
    // asyncData(context){
    //     // if (process.server){
    //     //     console.log("hi");
    //     // }
    //     // return { name: "Kan" }
    // },
    // middleware:"server"
    // data(){
    //   return{
    //     cls: '1'
    //   }
    // },
    // async created(){
    //   this.getData();
    // },
    // methods:{
    //   async getData(){
    //     console.log("create")
    //     // const res = await Movies
    //     // console.log(res)
    //   }
    // },
    data(){
      return{
        text: "change me",
        new_vending_machine: "",
      }
    },
    async asyncData ({ $http }) {
      const test = await $http.$get('/api/test')
      const data = await $http.$get('/api/movies')
      const vending_machine = await $http.$get('/api/vending_machine')
      const selectID_vending_machine = await $http.$get('/api/vending_machine/0')
      // const new_vending_machine = await $http.$post('/api/vending_machine')
      return {
        test,
        movies: data,
        vending_machine,
        selectID_vending_machine,
        // new_vending_machine
      }
    },
    methods: {
      async addSupply(){
        const new_vending_machine = await this.$http.$post('/api/vending_machine')
        // return {
        //   new_vending_machine
        // }
        this.text = new_vending_machine
      }
      // addSupply(){
      //   this.text = "changeeeeeeeeeeeeeeeeeee"
      // }
    }
    // async asyncData ({ $http }) {
    //   const data = await $http.$get('/api/movies')
    //   return { movies: data }
    // }
};
    
</script>