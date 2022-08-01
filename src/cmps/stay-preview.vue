<template>
  <div class="preview" @click="goToDetails">
    <div class="like">
      <span class="material-icons favorite" :class="{ active: isLiked }" @click.stop="toggleWishList"> favorite </span>
    </div>
    <el-carousel trigger="click" height="285px" :autoplay="false">
      <el-carousel-item v-for="image in images" :key="image">
        <div class="img-wrapper">
          <img :src="image" />
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="preview-info">
      <div class="location-info flex justify-space-between">
        <span>{{ stay.address.city }}, {{ stay.address.country }}</span>
        <span class="stared">{{ $filters.reviewsRateAvg(stay) }} <span class="gray"> ({{ reviewsCount }})</span></span>
      </div>
      <div class="name-bed">
        <div>{{ stay.name }} </div>
        <div>{{ stay.beds }} beds </div>
      </div>
      <div><span class="bold">${{ stay.price }}</span> night
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { utilService } from '../services/util.service.js';
export default {
  name: 'stay-preview',
  props: {
    stay: Object,
  },
  data() {
    return {
      images: [
        utilService.getImgUrl(this.stay.imgUrls[0]),
        utilService.getImgUrl(this.stay.imgUrls[1]),
        utilService.getImgUrl(this.stay.imgUrls[2]),
        utilService.getImgUrl(this.stay.imgUrls[3])
      ],
      isLiked: false,
    };
  },
  created() {
    const user = this.$store.getters.loggedinUser;
    if (user && user.wishList && user.wishList.length > 0) {
      var isWish = user.wishList.filter(wish => wish === this.stay._id);
      if (isWish.length > 0) this.isLiked = true;
    }
  },
  computed: {
    reviewsCount() {
      return this.stay.reviews.length;
    },
  },
  methods: {
    goToDetails() {
      this.$router.push('/stay/' + this.stay._id);
    },

    toggleWishList() {
      const loggedinUser = this.$store.getters.loggedinUser;
      if (!loggedinUser) {
        ElMessage.error('You need to log in first!');
      } else {
        var stayId = this.stay._id;
        this.$store.dispatch({ type: 'toggleWishList', stayId });
        this.isLiked = !this.isLiked;
      }
    },
  },
  watch: {
    isShow: function () {
      if (this.isShow) {
        document.documentElement.style.overflow = 'hidden';
        return;
      }

      document.documentElement.style.overflow = 'auto';
    },
  },
};
</script>
