<template>
  <div>
    <p class="text-desc">{{ formatedText }}<span v-if="!isMore && longText">...</span>
      <br>

      <span class="under-line read-more " v-if="longText" @click="isMore = !isMore">{{ readText }}

      </span>
    </p>
  </div>

</template>

<script>



export default {
  name: 'reviews-text',
  props: {
    reviews: { type: String },
  },

  data() {
    return {
      isMore: false,
      longText: this.reviews.length > 160,
    }
  },

  computed: {
    formatedText() {
      return this.isMore ? this.reviews : this.reviews.slice(0, 160)
    },
    readText() {
      return this.isMore ? ' Show Less' : ' Show more'
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
