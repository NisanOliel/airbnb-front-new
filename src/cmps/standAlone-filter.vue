<template>
  <form @change="onSaveFilters" class="form-filter" @submit.prevent>
    <div class="form-header">
      <div class="close-filter">
        <span @click="closeForm" class="material-icons-outlined"> close </span>
      </div>
      <h2>Filters</h2>
    </div>
    <div class="form-wrapper">
      <div class="form-price">
        <h2>Price range</h2>
        <p>The average nightly price is {{ getPricesAvg }}</p>
        <HistogramSlider :barRadius="0" @change="setPrice" :bar-height="64" :data="prices" :clip="false" :min="20"
          :barWidth="12" :max="805" :lineHeight="1" :primaryColor="primaryColor" :labelColor="labelColor"
          :holderColor="holderColor" :grid="false" :histSliderGap="0" :barGap="0" />
        <div class="form-inputs">
          <div class="price-inner">
            <label for="min">min price</label>
            <div class="flex form-input">
              <span>$</span>
              <input name="min" @input="setFilter" v-model="filterBy.price.minPrice" type="number" min="25$" />
            </div>
          </div>
          <div class="between-prices">-</div>
          <div class="price-inner">
            <label for="max"> max price</label>
            <div class="flex form-input">
              <span>$</span>
              <input name="max" @input="setFilter" v-model="filterBy.price.maxPrice" type="number" max="$800" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-rooms-and-beds">
        <h2>Rooms and beds</h2>
        <h3>BedRooms</h3>
        <el-radio-group text-color="#ffffff" fill="#000000" @change="setFilter" v-model="filterBy.bedrooms">
          <el-radio-button label="Any" />
          <el-radio-button v-for="(opt, idx) in numLabels" :key="idx" :label="opt" />
        </el-radio-group>
        <h3>beds</h3>
        <el-radio-group text-color="#ffffff" fill="#000000" @change="setFilter" v-model="filterBy.beds">
          <el-radio-button label="Any" />
          <el-radio-button v-for="(opt, idx) in numLabels" :key="idx" :label="opt" />
        </el-radio-group>
      </div>
      <div class="form-property-type">
        <h2>Property type</h2>
        <!-- <el-radio-group text-color="#ffffff" fill="#000000" @change="setFilter" v-model="filterBy.propertyType"> -->
        <!-- <div class="property-type" v-for="(opt, idx) in propertyTypes" :key="idx" :label="opt"></div> -->
        <div class="flex">
          <div class="property-type" v-for="propertyType in propertyTypes" :key="propertyType"
            @click="setPropertyType(propertyType)" :class="{ 'selected-item': propertyType.selected }">
            <div>
              <img :src="propertyType.src" />
              <span>{{ propertyType.propertyType }}</span>
            </div>
          </div>
        </div>
        <!-- </el-radio-group> -->
      </div>
      <div class="form-amenities">
        <div class="form-title-amenities">
          <h2>Amenities</h2>
        </div>
        <div class="essentials">
          <h3>Essentials</h3>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(opt, idx) in essentials" @change="setAmenities(opt, $event)" :key="idx" :label="opt" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="form-host-language">
        <div>
          <h2>Host language</h2>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(opt, idx) in language" @change="setLanguage(opt, $event)" :key="idx" :label="opt"
            size="large" />
        </el-checkbox-group>
      </div>
    </div>
    <div class="form-footer">
      <button @click="clearAll()">Clear all</button>
      <button @click="onSaveFilters($event)">Show {{ getStay }} stays</button>
    </div>
  </form>
</template>
<script>
import { ref } from 'vue';
import { stayService } from '../services/stay.service.js';
export default {
  name: 'standAlone-filter',
  data() {
    return {
      filterBy: this.getInitialFilterState(),
      numLabels: [1, 2, 3, 4, 5, 6, 7, `${8}+`],
      propertyTypes: [
        {
          propertyType: 'House',
          src: 'src/assets/app-filter-img/house.jpg',
          selected: false,
        },
        {
          propertyType: 'Apartment',
          src: 'src/assets/app-filter-img/Apartment.jpg',
          selected: false,
        },
        {
          propertyType: 'Guesthouse',
          src: 'src/assets/app-filter-img/Guesthouse.jpg',
          selected: false,
        },
        {
          propertyType: 'Hotel',
          src: 'src/assets/app-filter-img/Hotel.jpg',
          selected: false,
        },
      ],
      propertyType: null,
      language: ['English', 'German', 'French', 'Japanese'],
      essentials: ['Wifi', 'Kitchen', 'Washer', 'TV', 'Air conditioning'],
      price: null,
      checkList: ref([]),
      primaryColor: '#b0b0b0',
      holderColor: '#dddddd',
      labelColor: '#bdd6f8',
      handleColor: '#dddddd',
      propertyNum: null,
    };
  },
  created() {
    this.getStaysPrices();
    this.labels = this.$store.getters.getLabels;
    this.setFilter = stayService.debounce(this.setFilter);
  },
  methods: {
    getInitialFilterState() {
      return {
        price: {
          minPrice: 20,
          maxPrice: 805,
        },
        bedrooms: null,
        beds: null,
        amenities: [],
        hostLanguage: [],
        propertyType: [],
      };
    },
    setPrice(value) {
      this.filterBy.price = {
        minPrice: value.from,
        maxPrice: value.to,
      };
      this.setFilter();
    },
    getStaysPrices() {
      const stays = this.$store.getters.getStays;
      const staysPrices = stays.map(stay => stay.price);
      this.prices = staysPrices;
    },

    setFilter() {
      this.$store.dispatch({ type: 'setFilterBy', filterBy: this.filterBy });
    },

    setAmenities(currAmenity, isChecked) {
      if (isChecked) {
        this.filterBy.amenities.push(currAmenity);
      } else {
        this.filterBy.amenities = this.filterBy.amenities.filter(amenity => amenity !== currAmenity);
      }
      this.setFilter();
    },
    setPropertyType(propertyType) {
      propertyType.selected = !propertyType?.selected;
      if (propertyType.selected) {
        this.filterBy.propertyType.push(propertyType.propertyType);
      } else {
        this.filterBy.propertyType = this.filterBy.propertyType.filter(propertyType => propertyType.selected);
      }
      this.setFilter();
    },

    setLanguage(currLanguage, isChecked) {
      if (isChecked) {
        this.filterBy.hostLanguage.push(currLanguage);
      } else {
        this.filterBy.hostLanguage = this.filterBy.hostLanguage.filter(language => language !== currLanguage);
      }
      this.setFilter();
    },

    onSaveFilters(ev, value) {
      this.$store.dispatch({ type: 'setFilterBy', filterBy: this.filterBy });
      this.propertyNum = this.$store.getters.getStays.length;
      if (ev.type === 'click') {
        this.closeForm();
      }
    },

    clearAll() {
      this.filterBy = this.getInitialFilterState();
      this.checkList = ref([]);
      this.setFilter();
    },
    closeForm() {
      this.$emit('closeFilersForm');
    },
  },
  // created() {
  //   this.labels = this.$store.getters.getLabels;
  // },
  computed: {
    getPricesAvg() {
      if (!this.prices) return '0$';
      var Sum = this.prices.reduce((a, b) => a + b);
      Sum = Sum / this.prices.length;
      Sum = Sum.toFixed(0);
      return '$' + Sum;
    },
    getStay() {
      return this.$store.getters.getStays.length;
    },
  },
  components: {},
};
</script>
