<template>
  <div>
    <!-- <b-table striped hover :items="items"></b-table> -->
    <!-- {{ item }} -->
    <!-- <b-table hover head-variant="dark"
        id="pages-table"
        :items="items"
        :fields="fields">
        <template slot="actions" slot-scope="data">
            <button class="btn btn-dark" @click="update(data)" :ref="'btn' + data.index">Update</button>
        </template>
    </b-table> -->

    <b-table striped hover :fields="fields" :items="items" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(quantity)="row">
        <span v-if="row.item.quantity >= 10">{{ row.item.quantity }}</span>
        <span v-else style="color: red">{{ row.item.quantity }}</span>
      </template>

      <template #cell(action)="row">
        <!-- <b-button
          v-if="row.item.quantity > 0"
          size="sm"
          @click="click(row.item)"
          class="mr-1 button"
        >
          Buy
        </b-button> -->
        <!-- <b-button
          v-if="row.item.quantity > 0"
          size="sm"
          v-b-modal.modal-insert-coin
          class="mr-1 button"
        >
          Buy
        </b-button> -->
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
      @hide="resetInfoModal"
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
            <td class="tdcol1">Total</td><td class="tdcol2">{{ onebaht + fivebaht + tenbaht }}</td><td class="tdcol3">Baht</td>
          </tr>
        </table>
      </form>
    </b-modal>

    <!-- <b-modal
      id="modal-insert-coin"
      ref="modal"
      title="Insert Coin"
      centered
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    > -->
    <!-- <b-modal
      id="modal-insert-coin"
      ref="modal"
      title="Insert Coin"
      centered
      @show="resetModal"
      @hidden="resetModal"
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
            <td class="tdcol1">Total</td><td class="tdcol2">{{ onebaht + fivebaht + tenbaht }}</td><td class="tdcol3">Baht</td>
          </tr>
        </table>
      </form>
    </b-modal> -->
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
      quantity:""
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
    click(value) {
      this.$emit("click", value.id, value.quantity);
    },
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
      this.$emit("handleOk",this.proid,this.quantity);
    },
    info(item, index, button) {
      // this.$emit("info",item, index, button);
      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = "hello",
      this.proid = item.id
      this.quantity = item.quantity
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
  },
};
</script>

<style>
.button {
  width: 60%;
  margin: auto;
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