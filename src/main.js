import { createApp } from 'vue';

import { router } from './router.js';
import { store } from './store/store.js';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import VCalendar from 'v-calendar';

import VueClickAway from 'vue3-click-away';

import './assets/styles/main.scss';
import App from './App.vue';
// import Intersect from 'vue-intersect';
import HistogramSlider from 'vue3-histogram-slider';
import 'vue3-histogram-slider/dist/histogram-slider.css';
// import { Skeletor } from 'vue-skeletor';
import 'vue-skeletor/dist/vue-skeletor.css';
const app = createApp(App);

app.config.globalProperties.$filters = {
  reviewsRateAvg(stay) {
    var sum = 0;
    stay.reviews.forEach(review => {
      sum += review.rate;
    });
    sum = sum / stay.reviews.length;
    return `${sum.toFixed(1)} `;
  },
};
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(VCalendar, {});
// app.use(IntersectionRoot, IntersectionChild);
app.use(VueClickAway);
// app.use(Skeletor);
app.component(HistogramSlider.name, HistogramSlider);

app.mount('#app');
