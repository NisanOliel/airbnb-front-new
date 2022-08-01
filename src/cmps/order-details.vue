<template>
  <div v-if="isConfirm" class="order-alert-overlay"></div>
  <section class="order-confirmation-modal" :class="{ showConfirm: isConfirm }">
    <div class="confirmation-details">
      <div class="confirm-title-container">
        <p class="confirm-title">One last step</p>
        <h1 class="confirm-text">Dear Guest,</h1>
        <h1 class="confirm-text"> In order to complete your reservation, please confirm your trip details. </h1>
      </div>
      <div class="reservation-details-container">
        <div class="trip-details-container flex column">
          <h1 class="reservation-details-title">Reservation details</h1>
          <span class="mini-trip-title">Trip dates:</span>
          <h1 class="mini-trip-detail">{{ formatCheck }} - {{ formatCheckOut }}</h1>
          <span class="mini-trip-title">Guests:</span>
          <h1 class="mini-trip-detail">{{ guestCount }} guests</h1>

          <div class="price-details-container flex column">
            <h1 class="mini-trip-title">Price Details</h1>
            <div class="price-per-night flex justify-space-between">
              <h1 class="mini-trip-detail">${{ stay.price }} X {{ daysTotal }} nights</h1>
              <h1 class="mini-trip-detail">${{ totalPriceSum }}</h1>
            </div>

            <div class="service flex justify-space-between">
              <h1 class="mini-trip-detail">Service fee</h1>
              <h1 class="mini-trip-detail">${{ serviceFee }}</h1>
            </div>
            <div class="total-price flex justify-space-between">
              <h1 class="mini-trip-detail">Total</h1>
              <h1 class="mini-trip-detail">${{ totalPrice }}</h1>
            </div>
          </div>

        </div>

        <div class="order-stay-details flex column">
          <img class="order-stay-image" :src="imgOrder">
          <h1 class="stay-detail">{{ stay.name }}</h1>
          <h1 class="stay-detail">{{ stay.address.city }},{{ stay.address.country }}</h1>
        </div>

      </div>
      <div class="modal-btns-container">
        <div class="cell"></div>
        <div class="cell"></div>
        <div @click.prevent="sendOrder" class="btn-container">
          <div v-for="i in 100" class="cell"></div>
          <div class="content">
            <button class="action-btn">
              <span>Confirm</span>
            </button>
          </div>
        </div>

        <div @click="isConfirm = false" class="sign-up-continue go-back">

          <el-button size="large">Back</el-button>
        </div>
      </div>

    </div>
  </section>


  <section class="order-container sticky">
    <div class="order-form-header">
      <p><span class="cost bold">${{ stay.price }}</span> night</p>
      <p class="stared">
        {{ $filters.reviewsRateAvg(stay) }} <span class="reviews"> ({{ reviewsCount }})</span></p>
    </div>

    <!-- Date !! -->
    <div class="order-data">
      <v-date-picker color="gray" v-model="trip.dates" is-range :columns="2">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <div class="date-picker">
              <div class="date-input">
                <label>CHECK-IN</label>
                <input :placeholder="checkIn" :value="inputValue.start" v-on="inputEvents.start"
                  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
              </div>

              <div class="date-input">
                <label>CHECK-OUT</label>
                <input :placeholder="checkOut" :value="inputValue.end" v-on="inputEvents.end"
                  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
              </div>
            </div>
          </div>
        </template>
      </v-date-picker>
      <!--  -->

      <div @click="isShow = !isShow" class="guest-input">
        <label>GUESTS
          <div class="expand-order">
            <span class="material-icons-outlined" :class="{ flip: !isShow }"> expand_less </span>
          </div>
        </label>
        <input disabled :placeholder="guestsCount" />
      </div>
    </div>

    <div class="cell"></div>
    <div class="cell"></div>
    <div @click="openConfirm" class="btn-container">
      <div v-for="i in 100" class="cell"></div>
      <div class="content">
        <button class="action-btn">
          <span>Reserve</span>
        </button>
      </div>
    </div>





    <div class="flex column guest-add" v-if="isShow" v-click-away="onClickAway">

      <div class="guests-container flex justify-space-between align-center">
        <div class="flex column titles">
          <h5>Adults</h5>
          <span>Age 13+</span>
        </div>
        <div class="guests-btns flex align-center justify-space-between">
          <button @click.stop="updateGuests('adults', -1)">
            <span> - </span>
          </button>
          <span>{{ trip.guests.adults }}</span>
          <button @click.stop="updateGuests('adults', 1)">
            <span> + </span>
          </button>
        </div>


      </div>
      <div class="guests-container flex justify-space-between align-center">
        <div class="flex column titles">
          <h5>Children</h5>
          <span>Ages 2-12</span>
        </div>
        <div class="guests-btns flex align-center justify-space-between">
          <button @click.stop="updateGuests('children', -1)">
            <span> - </span>
          </button>
          <span>{{ trip.guests.children }}</span>
          <button @click.stop="updateGuests('children', 1)">
            <span> + </span>
          </button>
        </div>
      </div>


      <div class="guests-container flex justify-space-between align-center">
        <div class="flex column titles">
          <h5>Infants</h5>
          <span>Under 2</span>
        </div>
        <div class="guests-btns flex align-center justify-space-between">
          <button @click.stop="updateGuests('Infants', -1)">
            <span> - </span>
          </button>
          <span>{{ trip.guests.Infants }}</span>
          <button @click.stop="updateGuests('Infants', 1)">
            <span> + </span>
          </button>
        </div>
      </div>
      <div class="flex under-line close-btn">
        <button @click="isShow = !isShow">
          Close
        </button>

      </div>
    </div>

    <div class="pricing" v-if="dateCheck">
      <h4>You won't be charged yet</h4>
      <h5 class="flex justify-space-between">
        <span class="under-line ">${{ stay.price }} X {{ daysTotal }}</span><span> ${{ totalPriceSum }}</span>
      </h5>
      <h5 class="flex justify-space-between">
        <span class="under-line ">Service fee</span><span> ${{ serviceFee }}</span>
      </h5>
      <p class="flex justify-space-between">
        <span>Total</span><span> ${{ totalPrice }}</span>
      </p>
    </div>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus';
import { utilService } from '../services/util.service.js';

export default {
  name: ' order-details',
  props: { stay: { type: Object } },
  data() {
    return {
      imgOrder: utilService.getImgUrl(this.stay.imgUrls[0]),
      isConfirm: false,
      totalPriceSum: 0,
      isShow: false,
      trip: {
        guests: {
          adults: 1,
          children: 0,
          Infants: 0
        },
        dates: {},
      },
      // loggedinUser: null,
      fee: 1.10,
      serviceFee: null,
      daysTotal: null,
      totalPriceWithFee: null
    };
  },
  created() {
    // this.loggedinUser = this.$store.getters.loggedinUser;
    // console.log('this.loggedinUser:', this.loggedinUser)

  },
  computed: {
    reviewsCount() {
      return this.stay.reviews.length;
    },
    dateCheck() {
      return Object.keys(this.trip.dates).length;
    },
    formatCheck() {
      return new Date(this.trip.dates.start).toLocaleDateString()
    },

    guestCount() {
      const { children, adults, Infants } = this.trip.guests
      return children + adults + Infants;
    },

    formatCheckOut() {
      return new Date(this.trip.dates.end).toLocaleDateString()
    },

    guestsCount() {
      const { children, adults, Infants } = this.trip.guests

      const guestsCount = children + adults + Infants;
      if (guestsCount >= 1) return guestsCount + ' guests';
      else return 'Add guests';
    },
    checkIn() {
      if (!this.trip.dates[0]) return "Add date"
      else return this.trip.dates[0]
    },
    checkOut() {
      if (!this.trip.dates[1]) return "Add date"
      else return this.trip.dates[1]
    },

    totalPrice() {
      let size = Object.keys(this.trip.dates).length;
      if (size > 1) {
        const time = JSON.parse(JSON.stringify(this.trip.dates));
        const { start, end } = time;

        const timeDiff = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 3600 * 24);
        this.daysTotal = timeDiff.toLocaleString()
        this.totalPriceSum = Number(parseInt(this.stay.price * timeDiff));
        this.serviceFee = Number(parseInt((this.totalPriceSum * this.fee) - this.totalPriceSum))
        const totalWithFee = (+this.totalPriceSum + +this.serviceFee).toFixed(0)
        this.totalPriceWithFee = totalWithFee
        return totalWithFee
      }
    },
  },
  methods: {
    updateGuests(type, number) {
      const { children, adults, Infants } = this.trip.guests
      const guestsCount = children + adults + Infants;
      if (this.trip.guests[type] === 0 && number === -1) return;
      if (this.stay.capacity === guestsCount && number == 1) return ElMessage.error('You over the guests capacity');

      this.trip.guests[type] += number;
    },

    openConfirm() {
      const loggedinUser = this.$store.getters.loggedinUser;
      if (!loggedinUser) return ElMessage.error("log in first");

      if (this.dateCheck === 0) return ElMessage.error('Fill check in and check out date ')
      const { adults, children, Infants } = this.trip.guests
      if (children === 0 && adults === 0) return ElMessage.error('Add guests! ')
      this.isConfirm = true
    },
    sendOrder() {
      const time = JSON.parse(JSON.stringify(this.trip.dates));
      const { start, end } = time;
      const loggedinUser = this.$store.getters.loggedinUser;
      const { adults, children, Infants } = this.trip.guests

      let order = {
        "hostId": this.stay.host._id,
        "createdAt": Date.now(),
        "buyer": {
          "_id": loggedinUser._id,
          "fullname": loggedinUser.fullname,
          "imgUrl": loggedinUser.imgUrl
        },
        "totalPrice": this.totalPriceWithFee,
        "startDate": start,
        "endDate": end,
        "guests": {
          "total": (adults + children + Infants),
          "adults": adults,
          "children": children,
          "Infants": Infants
        },
        "stay": {
          "_id": this.stay._id,
          "name": this.stay.name,
          "price": this.stay.price
        },
        "status": "pending"
      }

      this.$store.dispatch({ type: "saveOrder", order, status: 'pending' });
      ElMessage.success('Order send!')

      setTimeout(() => this.$router.push('/'), 1000);

    },
    onClickAway(event) {
      this.isShow = false
    }

  },
};
</script>
