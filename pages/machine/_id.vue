<template>
  <div class="container">
    <div class="my-4">
      <h1>Location : {{ selectID_vending_machine.location }}</h1>
    </div>
    <div>
      <Table
        :items="selectID_vending_machine.product"
        :fields="fields"
        @click="click"
        @inputonebaht="inputonebaht"
        @inputfivebaht="inputfivebaht"
        @inputtenbaht="inputtenbaht"
        :onebaht="onebaht"
        :fivebaht="fivebaht"
        :tenbaht="tenbaht"
        @resetvalue="resetvalue"
        @handleOk="handleOk"
      />
    </div>
    <div>
      {{ selectID_vending_machine }}
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
export default {
  components: {
    Table,
  },
  data() {
    return {
      selectID_vending_machine: "",
      fields: [
        "index",
        { key: "name", label: "Product Name" },
        "quantity",
        "price",
        "action",
      ],
      onebaht: 0,
      fivebaht: 0,
      tenbaht: 0
    };
  },

  async asyncData({ $http, route }) {
    // this.http = $http
    // this.route_id = route.params.id
    const selectID_vending_machine = await $http.$get(
      "/api/vending_machine/" + route.params.id
    );
    return {
      selectID_vending_machine,
      // http: $http,
      route_id: route.params.id,
    };
  },
  methods: {
    // click(proid , { $http }) {
    //   // alert(row)
    //   const buy = await $http.$put("/api/vending_machine/:id/" + route.params.id + "/" +proid);
    // return {
    //   buy,
    // };
    // }
    async click(proid, quantity) {
      // alert(quantity);
      // alert(proid + " " + quantity)
      // const buy = await this.$http.$put("/api/vending_machine/" + testroute + "/" +proid)
      // alert(buy)
      await this.$http.$put(
        "/api/vending_machine/" + this.route_id + "/" + proid,
        { quantity: parseInt(quantity) - 1 }
      );
      await this.$nuxt.refresh()
      if(quantity < 10){
        alert("สินค้าใกล้หมด")
      }
    },
    inputonebaht(value){
      this.onebaht = 1 * parseInt(value)
    },
    inputfivebaht(value){
      this.fivebaht = 5 * parseInt(value)
    },
    inputtenbaht(value){
      this.tenbaht = 10 * parseInt(value)
    },
    resetvalue(){
      this.onebaht = 0
      this.fivebaht = 0
      this.tenbaht = 0
    },
    async handleOk(proid, quantity){
      await this.$http.$put(
        "/api/vending_machine/" + this.route_id + "/" + proid,
        { quantity: parseInt(quantity) - 1 }
      );
      await this.$nuxt.refresh()
      if(quantity <= 10){
        alert("สินค้าใกล้หมด")
      }
    }
  },
};
</script>
