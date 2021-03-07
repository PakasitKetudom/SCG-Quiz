<template>
  <div class="container">
    <div class="my-4">
      <h1>Location : {{ selectID_vending_machine.location }}</h1>
    </div>
    <div>
      <Table :items="selectID_vending_machine.product" :fields="fields" @click="click"/>
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
        "action"
      ],
    };
  },
  async asyncData({ $http, route }) {
    const selectID_vending_machine = await $http.$get(
      "/api/vending_machine/" + route.params.id
    );
    return {
      selectID_vending_machine,
    };
  },
  methods: {
    click(row) {
      alert(row)
    }
  }
};
</script>