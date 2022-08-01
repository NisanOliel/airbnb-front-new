<template>

  <!-- <pre>{{ hostOrder }}</pre> -->
  <tr class="border_bottom">
    <td>{{ new Date(hostOrder.createdAt).toLocaleString() }}</td>
    <td class=" td-buyer flex align-center">
      <img class="host-image" :src="hostOrder.buyer.imgUrl">
      <span>{{ hostOrder.buyer.fullname }}</span>
    </td>
    <td>{{ hostOrder.stay.name }}</td>
    <td>{{ hostOrder.startDate }}-{{ hostOrder.endDate }}</td>
    <td class="text-center status" :class="statusClass">{{ hostOrder.status }}</td>
    <td class="text-center">{{ formatRevune }}</td>
    <td class="text-center">{{ hostOrder.guests.total }}</td>
    <td class="text-center">
      <el-button v-if="hostOrder.status === 'pending'" @click.prevent="approve" size="small" type="success" circle><span
          class="material-icons">
          done
        </span>
      </el-button>
      <el-button v-if="hostOrder.status === 'pending'" @click.prevent="decline" size="small" type="danger" circle>
        <span class="material-icons">close</span>
      </el-button>
      <el-button v-if="hostOrder.status === 'declined'" @click.prevent="approve" size="small" type="success" circle>
        <span class="material-icons">
          done
        </span>
      </el-button>
      <el-button v-if="hostOrder.status === 'approved'" @click.prevent="decline" size="small" type="danger" circle><span
          class="material-icons">close </span>
      </el-button>

    </td>


  </tr>

</template>

<script>

export default {
  name: 'orders-dashboard',
  props: { hostOrder: { type: Object } },
  data() {
    return {

    };
  },
  created() {

  },
  computed: {
    formatRevune() {
      const totalPrice = this.hostOrder.totalPrice
      return "$" + totalPrice.toLocaleString()
    },
    statusClass() {
      if (this.hostOrder.status === 'pending') return 'status-pending'
      if (this.hostOrder.status === 'approved') return 'status-approved'
      if (this.hostOrder.status === 'declined') return 'status-decline'
    }
  },
  methods: {
    approve() {
      const order = JSON.parse(JSON.stringify(this.hostOrder));
      this.$store.dispatch({ type: "saveOrder", order, status: 'approved' });
    },
    decline() {
      const order = JSON.parse(JSON.stringify(this.hostOrder));
      this.$store.dispatch({ type: "saveOrder", order, status: 'declined' });
    },
  }
};
</script>
