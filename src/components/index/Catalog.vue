<template>
  <section class="catalog">
    <Filters :filters="filters" :is-pop-up-open="isFilterPopUpOpen" 
      @close-pop-up="isFilterPopUpOpen = false"
    />

    <div class="catalog-wrapper">
      <div class="catalog-properties-wrapper">
        <p class="products-amount">
          <span class="products-amount__number">{{ sortedProducts.length }}</span> товаров
        </p>

        <button class="filters-open-btn" @click="isFilterPopUpOpen = true">Фильтры</button>

        <Sorting @change-current-sorting="changeCurrentSorting"/>
      </div>
      
      <ul class="products-list">
        <li class="product" v-for="product in sortedProducts" 
          :key="product.id"
        >
          <img class="product__image" alt="Банка краски на картинке"
            :src="require('../../assets/images/products/' + product.picture)">

          <p class="product__name">{{ product.name }}</p>

          <div class="product__bottom-wrapper">
            <p class="product__price">{{ product.price + " ₽" }}</p>
            <button 
              @click="switchProduct(product)"
              :class="[
                'product__add-to-cart-btn', 
                {'product__add-to-cart-btn--added': product.isInCart && !product.toDelete},
              ]"
            >
              <IconBase class="product__add-to-cart-btn-icon"
                v-show="!product.isInCart" 
                :width="20" :height="20" 
                :stroke-color="styleVariables.darkTurquoise"
              ><PlusIcon/></IconBase>

              <IconBase class="product__add-to-cart-btn-icon" 
                v-show="product.isInCart && !product.toDelete" 
                :width="24" :height="24" 
                :stroke-color="styleVariables.darkTurquoise" :fillColor="styleVariables.darkTurquoise"
              ><CheckMarkIcon/></IconBase>
            </button>
          </div>
        </li>
      </ul>
    </div>

  </section>
</template>


<script>
import Filters from './Filters.vue'
import Sorting from './Sorting.vue'

import IconBase from '../main/sprite/IconBase.vue'
import PlusIcon from '../main/sprite/icons/PlusIcon.vue'
import CheckMarkIcon from '../main/sprite/icons/CheckMarkIcon.vue'

import styleVariables from '../../assets/styles/variables.scss'

export default {
  name: "Catalog",
  components: {
    Filters,
    Sorting,
    IconBase,
    PlusIcon,
    CheckMarkIcon,
  },
  
  data: function () {
    return {
      filters: {
        isNew: true,
        isInStock: false,
        isContract: false,
        isExclusive: false,
        isSale: false,
      },
      isFilterPopUpOpen: false,
      currentSorting: {},
      styleVariables: styleVariables,
    }
  },

  computed:  {
    products: function () {
      return this.$store.state.products
    },
    
    sortedProducts: function () {
      let self = this
      let productsToShow = []

      this.products.forEach(function (product) {
        let isAppropriate = true

        for (let filter in self.filters) {
          if (self.filters[filter] && !product.properties[filter])
            isAppropriate = false
        }

        if (isAppropriate) productsToShow.push(product)
      })

      switch (this.currentSorting.name) {
        case "expensive":
          productsToShow.sort(function (a, b) {
            return b.price - a.price
          })
          break
        case "inexpensive":
          productsToShow.sort(function (a, b) {
            return a.price - b.price
          })
          break
        case "popular":
          productsToShow.sort(function (a, b) {
            return b.popularityRating - a.popularityRating
          })
          break
        case "new":
          productsToShow.sort(function (a, b) {
            return new Date(b.dateAdded).valueOf() - new Date(a.dateAdded).valueOf()
          })
          break
      }

      return productsToShow
    },
  },
  
  methods: {
    changeCurrentSorting: function (to) {
      this.currentSorting = to
    },
    switchProduct: function (product) {
      if (product.isInCart)
        this.$store.commit('removeFromCart', product.id)
      else
        this.$store.commit('addToCart', product.id)
    },
  },
}
</script>


<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
@import "../../assets/styles/variables.scss";

.catalog {
  @include container;

  display: flex;
  justify-content: space-between;
  padding-top: 72px;
  padding-bottom: 72px;
}

.catalog-wrapper {
  display: flex;
  flex-direction: column;
  width: 1496px;
}

.catalog-properties-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.products-amount,
.filters-open-btn {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.filters-open-btn {
  display: none;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.product {
  width: calc((100% - (32px * 4)) / 5);
  margin-right: 32px;
  margin-bottom: 32px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:nth-child(5n) {
    margin-right: 0;
  }
}

.product__image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 55px;
}

.product__name {
  margin-bottom: 24px;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.product__bottom-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product__price {
  font-weight: 600;
}

.product__add-to-cart-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 32px;
  background: $sexy-green;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  &:hover {
    box-shadow: inset 80px 32px 40px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.4s;
  }

  &:not(:hover) {
    box-shadow: none;
    transition: box-shadow 0.3s;
  }

  &--added {
    background: $light-gray;
  }
}

.product__add-to-cart-btn-icon {
  height: 20px;
}


@media (max-width: $desktop-size + 1px) {
  .catalog-wrapper {
    width: auto;
    flex-grow: 1;
  }

  .product__image {
    width: 100%;
  }
}


@media (max-width: 1440px) {
  .product {
    width: calc((100% - (32px * 3)) / 4);

    &:nth-child(5n) {
      margin-right: 32px;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}


@media (max-width: $laptop-size + 1px) {
  .catalog {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}


@media (max-width: 920px) {
  .product {
    width: calc((100% - (32px * 2)) / 3);

    &:nth-child(4n) {
      margin-right: 32px;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}


@media (max-width: $tablet-size + 1px) {
  .catalog {
    flex-direction: column;
  }
}


@media (max-width: 560px) {
  .product {
    width: calc((100% - 24px) / 2);
    margin-right: 24px;

    &:nth-child(3n),
    &:nth-child(5n) {
      margin-right: 24px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}


@media (max-width: $mobile-size + 1px) {
  .catalog {
    padding-top: 0;
  }

  .catalog-properties-wrapper {
    align-items: flex-start;
  }

  .products-amount {
    display: none;
  }

  .filters-open-btn {
    display: block;
    margin-top: -17px;
    padding-left: 0;
    padding-right: 0;
    padding-top: 17px;
    padding-bottom: 17px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .product__add-to-cart-btn {
    width: 40px;
    height: 24px;
  }

  .product__add-to-cart-btn-icon {
    width: 16px;
    height: 16px;
  }
}
</style>