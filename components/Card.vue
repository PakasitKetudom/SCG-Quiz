 <template>
  <div class="col-md-4">
    <b-link class="link" :href="'/machine/'+vm_items.id">
    <b-card
      border-variant="secondary"
      :header="vm_items.location"
      align="center"
      class="card-between"
    >
      <b-card-text>
        <no-ssr>
          <table width="100%">
            <tr v-for="(vm_item, id) in vm_items.product" :key="id">
              <td>
                <span>{{ vm_item.name }}</span>
              </td>
              <td>
                <span>{{ vm_item.quantity }} pc.</span>
              </td>
            </tr>
          </table>
        </no-ssr>
      </b-card-text>
      <template #footer>
        <no-ssr>
          <table width="100%">
            <tr>
              <td>
                <span>Total Money</span>
              </td>
              <td>
                <span
                  >{{
                    1 * vm_items.oneCoin +
                    5 * vm_items.fiveCoin +
                    10 * vm_items.tenCoin
                  }}
                  Baht</span
                >
              </td>
            </tr>
          </table>
        </no-ssr>
      </template>
    </b-card>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    vm_items: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style>
td {
  width: 50%;
}
.link {
  color: black;
}
.link:hover {
  color: black;
  text-decoration: none;
}
.card-between {
  min-height: 300px;
  margin-right: 5%;
}
@media only screen and (max-width: 600px) {
  .card-between {
    margin-right: 0;
  }
}
</style>