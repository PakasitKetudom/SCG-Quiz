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

      <template #cell(action)="row">
        <b-button
          size="sm"
          @click="click(row.item)"
          class="mr-1"
        >
          Buy
        </b-button>
      </template>

      <!-- <template #cell(name)="data">
        <b class="text-info"><b>{{ data.value.productname }}</b>
      </template> -->

      <!-- A custom formatted column -->
      <!-- <template #cell(product)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
      </template>


      <template #cell(quantity)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
      </template>

      <template #cell(price)="data">
        {{ data.index + 1 }}
      </template> -->

      <!-- <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
      </template> -->
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
  },
  methods: {
    click(value){
        this.$emit('click',value.id);
    }
  }
};
</script>