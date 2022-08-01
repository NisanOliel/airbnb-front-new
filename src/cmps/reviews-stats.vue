<template>

  <div class="reviews-stats" v-if="stay">

    <div v-for="reviewScore, key of percentageFormat" class="stats">
      <div class="flex align-center ustify-space-between">

        <label>{{ key }} </label>
        <div class="bar-label flex">

          <el-progress :stroke-width="4" :show-text=false :percentage=reviewScore />
          <span>{{ reviewScore / 20 }}</span>
        </div>
      </div>
    </div>





  </div>
</template>

<script>

export default {
  name: 'reviews-stats',
  props: {
    stay: { type: Object },
  },
  data() {
    return {

    };
  },
  created() {
  },
  components: {},

  computed: {
    reviewsCount() {
      return this.stay.reviews.length;
    },
    percentageFormat() {
      return Object.entries(this.stay.reviewScores).reduce((sum, val) => {
        sum[val[0]] = val[1] * 20
        return sum
      }, {})
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
