<template>
  <div class="container">
    <b-container>
      <b-row no-gutters class="mb-1">
        <h1>Money income : {{ money_income }} Baht</h1>
      </b-row>
      <b-row no-gutters class="mb-1">
        <h1>Location</h1>
      </b-row>
      <b-row no-gutters class="my-4">
        <input style="width:70%;margin:auto;" type="text" v-model="search" placeholder="Search Location.."/>
      </b-row>
      <b-row no-gutters>
        <Card
          v-for="(vending_machine, id) in filteredList"
          :key="id"
          :vm_items="filteredList[id]"
          class="mb-2"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  components: {
    Card,
  },
  async asyncData({ $http }) {
    const vending_machines = await $http.$get("/api/vending_machine/");
    var money_income = 0
    for (var i in vending_machines){
      money_income += parseInt(vending_machines[i].oneCoin) + (parseInt(vending_machines[i].fiveCoin) * 5) + (parseInt(vending_machines[i].tenCoin) * 10)
    }
    return {
      vending_machines,
      money_income
    };
  },
  data() {
    return {
      search:''
    }
  },
  computed: {
    filteredList() {
      return this.vending_machines.filter(vm => {
        return vm.location.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

@media only screen and (max-width: 600px) {
  .row {
    display: block;
  }
}
</style>
