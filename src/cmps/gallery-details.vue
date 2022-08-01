<template>
  <section class="gallery-details">
    <img v-for="image in  images" :key="image" class="img-container clean-list" :src="image" />
  </section>
</template>
<script>
import { utilService } from '../services/util.service.js';

export default {
  name: "gallery-details",
  props: {
    stay: { type: Object },
  },
  data() {
    return {
      images: [
        utilService.getImgUrl(this.stay.imgUrls[0]),
        utilService.getImgUrl(this.stay.imgUrls[1]),
        utilService.getImgUrl(this.stay.imgUrls[2]),
        utilService.getImgUrl(this.stay.imgUrls[3]),
        utilService.getImgUrl(this.stay.imgUrls[4])
      ],
    };
  },
}
</script>

<style>
</style>