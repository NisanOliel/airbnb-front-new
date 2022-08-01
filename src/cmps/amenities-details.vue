<template>
  <section class=" amenities-details ">
    <h2>What this place offers</h2>
    <ul class="amenities flex flex-flow-wrap gap-row ">
      <li class="" v-for="amenity in stay.amenities" :key="amenity">
        <div class="flex gap-row align-center">
          <img class="amenity-icons" :src="amenity.src" />
          <span>
            {{ amenity.name }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'amenities-details',
  props: {
    stay: { type: Object },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
