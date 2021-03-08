<template>
  <div class="container">
    <div class="my-4">
      <h1>Location : {{ selectID_vending_machine.location }}</h1>
    </div>
    <div class="my-4">
      <h1>
        Total :
        {{
          selectID_vending_machine.oneCoin +
          selectID_vending_machine.fiveCoin * 5 +
          selectID_vending_machine.tenCoin * 10
        }}
        Baht
      </h1>
    </div>
    <div>
      <Table
        :items="selectID_vending_machine.product"
        :fields="fields"
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
    <!-- <div>
      {{ selectID_vending_machine }}
    </div> -->
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
      tenbaht: 0,
    };
  },

  async asyncData({ $http, route }) {
    const selectID_vending_machine = await $http.$get(
      "/api/vending_machine/" + route.params.id
    );
    return {
      selectID_vending_machine,
      route_id: route.params.id,
    };
  },
  methods: {
    inputonebaht(value) {
      this.onebaht = parseInt(value);
    },
    inputfivebaht(value) {
      this.fivebaht = parseInt(value);
    },
    inputtenbaht(value) {
      this.tenbaht = parseInt(value);
    },
    resetvalue() {
      this.onebaht = 0;
      this.fivebaht = 0;
      this.tenbaht = 0;
    },
    async handleOk(proid, quantity, price) {
      if (await this.calculate(price)) {
        await this.$http.$patch(
          "/api/vending_machine/" + this.route_id + "/" + proid,
          { quantity: parseInt(quantity) - 1 }
        );
      }
      await this.$nuxt.refresh();
      if (quantity <= 10) {
        alert("This product is nearly out of stock");
      }
    },
    async calculate(price) {
      const userpay = this.onebaht + this.fivebaht * 5 + this.tenbaht * 10;
      var change = 0;
      var coin1 = 0;
      var coin5 = 0;
      var coin10 = 0;
      if (userpay >= price) {
        if (userpay > price) {
          change = userpay - price;

          if (change >= 10) {
            coin10 = parseInt(change / 10);
            if (this.selectID_vending_machine.tenCoin < coin10) {
              coin10 = 0
              if (change >= 5) {
                coin5 = parseInt(change / 5);
                if (this.selectID_vending_machine.fiveCoin < coin5) {
                  coin5 = 0
                  if (change >= 1) {
                    coin1 = parseInt(change / 1);
                    if (this.selectID_vending_machine.oneCoin < coin1) {
                      coin1 = 0
                      alert("This machine not enough coins");
                      return false;
                    } else {
                      change -= coin1 * 1;
                    }
                  }
                } else {
                  change -= coin5 * 5;
                }
              }
            } else {
              change -= coin10 * 10;
            }
          }
          if (change >= 5) {
            coin5 = parseInt(change / 5);
            if (this.selectID_vending_machine.fiveCoin < coin5) {
              coin5 = 0
              if (change >= 1) {
                coin1 = parseInt(change / 1);
                if (this.selectID_vending_machine.oneCoin < coin1) {
                  coin1 = 0
                  alert("This machine not enough coins");
                  return false;
                } else {
                  change -= coin1 * 1;
                }
              }
            } else {
              change -= coin5 * 5;
            }
          }
          if (change >= 1) {
            coin1 = parseInt(change / 1);
            if (this.selectID_vending_machine.oneCoin < coin1) {
              coin1 = 0
              alert("This machine not enough coins");
              return false;
            } else {
              change -= coin1 * 1;
            }
          }
        } else {
          change == 0;
        }
        var total_one_baht =
          parseInt(this.selectID_vending_machine.oneCoin) +
          parseInt(this.onebaht) -
          parseInt(coin1);
        var total_five_baht =
          parseInt(this.selectID_vending_machine.fiveCoin) +
          parseInt(this.fivebaht) -
          parseInt(coin5);
        var total_ten_baht =
          parseInt(this.selectID_vending_machine.tenCoin) +
          parseInt(this.tenbaht) -
          parseInt(coin10);

        await this.$http.$put("/api/vending_machine/" + this.route_id, {
          oneCoin: parseInt(total_one_baht),
          fiveCoin: parseInt(total_five_baht),
          tenCoin: parseInt(total_ten_baht),
        });
      } else {
        alert("Insert more coin");
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.container{
  height: 100%;
}
</style>
