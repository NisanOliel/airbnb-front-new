<template>
  <section class="up-info flex justify-space-between ">
    <div class=" flex left-side">
      <span class="stared"> {{ $filters.reviewsRateAvg(stay) }}</span>
      <span class="dot">•</span>
      <span>
        <a class="under-line">{{ reviewsCount }} reviews</a></span>
      <span class="gray dot">•</span>
      <span>
        <a class="under-line">{{ city }} ,{{ country }} </a></span>
    </div>


    <div class="flex"></div>
    <div class="flex right-info">
      <el-tooltip content="Copy url" placement="top" effect="light">

        <button @click="copyUrl" class="margin20">
          <div class="flex align-center">
            <span><img src="@/assets/icons/share.svg"></span>
            Share
          </div>
        </button>
      </el-tooltip>


      <button @click="toggleWishList">
        <div class="flex align-center">
          <span><img src="@/assets/icons/love.svg"></span>
          Save
        </div>
      </button>
    </div>


  </section>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'up-info-details',
  props: {
    stay: { type: Object },
  },
  data() {
    return {
      isLiked: false,

    }
  },

  computed: {
    reviewsCount() {
      return this.stay.reviews.length;
    },

    city() {
      return this.stay.address.city;
    },
    country() {
      return this.stay.address.country;
    },

  },
  methods: {
    toggleWishList() {
      this.isLiked = !this.isLiked;
      console.log('heart is active', this.isLiked);
    },

    copyUrl() {
      try {
        navigator.clipboard.writeText(window.location.href);
        ElMessage({
          message: 'Url copy to clipboard',
          type: 'success',
        })
      }
      catch {
        ElMessage.error('Oops, failed to copy url.')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
