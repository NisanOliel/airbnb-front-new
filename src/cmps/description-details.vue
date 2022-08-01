<template>

  <section class="gray-box description">
    <h2>Description</h2>
    <p>{{ stay.summary }}</p>
  </section>

</template>

<script>
export default {
  name: "description-details",
  props: {
    stay: { type: Object },
  },
}
</script>

<style>
</style>