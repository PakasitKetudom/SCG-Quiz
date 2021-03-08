<template>
  <div>
    <b-table sticky-header hover :fields="fields" :items="items" responsive="sm" class="table">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(quantity)="row">
        <span v-if="row.item.quantity >= 10">{{ row.item.quantity }}</span>
        <span v-else style="color: red">{{ row.item.quantity }}</span>
      </template>

      <template #cell(action)="row">
        <b-button
          v-if="row.item.quantity > 0"
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Buy
        </b-button>
        <b-button v-else size="sm" class="mr-1 button" disabled>
          Out of stock
        </b-button>
      </template>
    </b-table>

    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      :ok-disabled="false"
      centered
      @show="resetModal"
      @hide="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <table width="100%" class="text-center">
          <tr>
            <td class="tdcol1">1 Coin Baht</td><td class="tdcol2"><b-form-input class="input-num" type="number" min="0.00" max="100.00" @keyup="inputonebaht($event.target.value)"></b-form-input></td><td class="tdcol3">Unit</td>
          </tr>
           <tr>
            <td class="tdcol1">5 Coin Baht</td><td class="tdcol2"><b-form-input class="input-num" type="number" min="0.00" max="100.00" @keyup="inputfivebaht($event.target.value)"></b-form-input></td><td class="tdcol3">Unit</td>
          </tr>
           <tr>
            <td class="tdcol1">10 Coin Baht</td><td class="tdcol2"><b-form-input class="input-num" type="number" min="0.00" max="100.00" @keyup="inputtenbaht($event.target.value)"></b-form-input></td><td class="tdcol3">Unit</td>
          </tr>
          <tr>
            <td class="tdcol1">Total</td><td class="tdcol2">{{ onebaht + (fivebaht * 5) + (tenbaht * 10) }}</td><td class="tdcol3">Baht</td>
          </tr>
        </table>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      proid:"",
      quantity:"",
      price:""
    };
  },
  props: {
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
    onebaht: {
      type: Number,
      required: false,
    },
    fivebaht: {
      type: Number,
      required: false,
    },
    tenbaht: {
      type: Number,
      required: false,
    },
  },
  methods: {
    inputonebaht(value) {
      this.$emit("inputonebaht", value);
    },
    inputfivebaht(value) {
      this.$emit("inputfivebaht", value);
    },
    inputtenbaht(value) {
      this.$emit("inputtenbaht", value);
    },
    resetModal() {
      this.$emit("resetvalue");
    },
    handleOk() {
      this.$emit("handleOk",this.proid,this.quantity,this.price);
    },
    info(item, index, button) {
      // this.$emit("info",item, index, button);
      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = "hello",
      this.infoModal.title = "Insert Coin"
      this.proid = item.id
      this.quantity = item.quantity
      this.price = item.price
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
  },
};
</script>

<style>
.button {
  width: 60%;
  margin: auto;
}
.table{
  max-height:100%;
}
.tdcol1 {
  width: 40%;
}
.tdcol2 {
  width: 30%;
}
.tdcol3 {
  width: 40%;
}
.input-num {
  text-align: right;
}
</style>