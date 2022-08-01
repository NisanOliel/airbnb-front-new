<template>
  <section v-if="stay" class="details-container">
    <div class="main-title">
      <h1>{{ stay.name }}</h1>
      <div class="reviews-title flex align-center">

        <up-info-details :stay="stay" />
      </div>
    </div>

    <gallery-details :stay="stay" />

    <div class="content-wrapper flex justify-space-between gray-box">
      <section class="left-side">
        <section class="box-padding flex justify-space-between gray-box">
          <div>
            <h2>{{ stay.roomType }} by {{ stay.host.fullname }}</h2>
            <div class="flex include">
              <span>{{ stay.capacity }} guests </span>
              <span class="gray">•</span>
              <span>{{ stay.bedrooms }} bedrooms</span>
              <span class="gray">•</span>
              <span>{{ stay.beds }} beds </span>
            </div>
          </div>
          <img class="host-image" :src="stay.host.thumbnailUrl" />
        </section>

        <features-details />


        <section class="gray-box description">
          <img class="aircover" src="../assets/icons/aircover.webp">
          <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like
            trouble checking in.</p>
        </section>


        <description-details :stay="stay" />


        <amenities-details :stay="stay" />
      </section>
      <section class="right-side">
        <order-details :stay="stay" />
      </section>
    </div>
    <reviews-details :stay="stay" />
  </section>
</template>

<script>
import { stayService } from '../services/stay.service.js';
import upInfoDetails from '../cmps/up-info-details.vue';
import galleryDetails from '../cmps/gallery-details.vue';
import featuresDetails from '../cmps/features-details.vue';
import descriptionDetails from '../cmps/description-details.vue';
import amenitiesDetails from '../cmps/amenities-details.vue';
import reviewsDetails from '../cmps/reviews-details.vue';
import orderDetails from '../cmps/order-details.vue';

export default {
  name: 'stay-Details',
  components: {
    upInfoDetails,
    galleryDetails,
    featuresDetails,
    amenitiesDetails,
    reviewsDetails,
    orderDetails,
    descriptionDetails
  },

  data() {
    return {
      stay: null,
    };
  },
  async created() {
    const { stayId } = this.$route.params;
    const stay = await stayService.getById(stayId)
    this.stay = stay;

  },
  methods: {

  },
  computed: {
    reviewsCount() {
      return this.stay.reviews.length;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
