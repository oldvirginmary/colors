<template>
  <div class="layout">
    <h1 class="visually-hidden">Магазин чудес и красок</h1>
    <Header/>
    <CategorySlider/>
    <Catalog/>
  </div>
</template>


<script>
import Header from './main/Header.vue'
import CategorySlider from './index/CategorySlider.vue'
import Catalog from './index/Catalog.vue'

export default {
  name: "IndexPage",
  components: {
    Header,
    CategorySlider,
    Catalog,
  },
}
</script>