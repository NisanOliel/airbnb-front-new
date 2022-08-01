<template>
  <section class="reviews-container box-padding">


    <div class="flex">
      <h2 class="stared">
        {{ $filters.reviewsRateAvg(stay) }}
        <span>·</span>
        {{ reviewsCount }} reviews
      </h2>
    </div>
    <reviews-stats :stay="stay" />

    <div>
      <ul class="clean-list reviews-list-container">
        <li class="review-preview-container" v-for="reviews in stay.reviews" :key="reviews">
          <div class="flex header-review">
            <img :src="reviews.by.imgUrl" class="host-image" />

            <div class="reviews-by">
              <h3>{{ reviews.by.fullname }}</h3>
              <h5>{{ new Date(reviews.at).toLocaleDateString() }}</h5>
            </div>
          </div>

          <reviews-text :reviews="reviews.txt" />

        </li>
      </ul>
    </div>
  </section>
</template>

<script>

import reviewsStats from '../cmps/reviews-stats.vue';
import reviewsText from '../cmps/reviews-text.vue';

export default {
  name: 'reviews-details',
  props: {
    stay: { type: Object },
  },

  components: {
    reviewsStats,
    reviewsText
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
