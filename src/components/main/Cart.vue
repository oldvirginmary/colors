<template>
  <section class="cart">
    <transition name="fade">
      <div class="cart-window" v-show="isCartOpen">
        <div class="cart-window__header">
          <h3 class="cart-window__title">Корзина</h3>
          <button class="cart-window__close-btn" @click="closeCart">
            <IconBase class="cart-window__close-btn-icon" :width="24" :height="24"><CrossIcon/></IconBase>
          </button>
        </div>
        <div class="cart-window__properties">
          <p class="cart-window__cart-size">
            <span class="cart-window__cart-size-number">{{ $store.state.cart.length }}</span> товаров
          </p>
          <button class="cart-window__clear-cart-btn" 
            @click="$store.dispatch('cleanCart')"
          >Очисть список</button>
        </div>
        <ul class="cart-items">
          <li v-for="(cartItem, index) in cart" :key="cartItem.id"
            :class="['cart-item', {'cart-item--to-delete': cartItem.toDelete}]"
          >
            <img class="cart-item__image" 
              :src="require('../../assets/images/products/' + cartItem.picture)" alt="Банка с краской"
            >
            <div class="cart-item__description">
              <p class="cart-item__name">{{ cartItem.name }}</p>
              <p class="cart-item__price">{{ cartItem.price + " ₽" }}</p>
            </div>
            <div class="cart-item__management">
              <div class="cart-item__amount-management">
                <button class="cart-item__decrease-amount-btn" 
                  @click="decreaseCartItemAmount(cartItem)"
                >
                  <IconBase class="cart-item__decrease-amount-icon" :width="16" :height="16">
                    <MinusIcon/></IconBase>
                </button>

                <input class="cart-item__current-amount-input" 
                  v-model.number="cartItem.amount"
                  @input="changeCartItemAmount(cartItem.id, cartItem.amount)"
                >

                <button class="cart-item__increase-amount-btn" 
                  @click="increaseCartItemAmount(cartItem)"
                >
                  <IconBase class="cart-item__increase-amount-icon" :width="20" :height="20">
                    <PlusIcon/></IconBase>
                </button>
              </div>

              <button class="cart-item__remove-item-btn"
                @click="$store.commit('cartItemToDelete', index)"
              >
                <IconBase class="cart-item__remove-icon" 
                  v-show="!cartItem.toDelete" :width="24" :height="24">
                  <CrossIcon/></IconBase>
                <IconBase class="cart-item__repeat-icon" 
                  v-show="cartItem.toDelete" :width="24" :height="24">
                  <RepeatIcon/></IconBase>
              </button>
            </div>
          </li>
        </ul>
        <div class="cart-window__footer">
          <div class="cart-window__result">
            <div class="cart-window__result-title">Итого</div>
            <div class="cart-window__result-sum">{{ cartTotalPrice + " ₽" }}</div>
          </div>
          <a class="cart-window__checkout" href="#">Оформить заказ</a>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="popup-fade" v-show="isCartOpen" @click="closeCart"></div>
    </transition>
  </section>
</template>


<script>
import IconBase from './sprite/IconBase.vue'
import CrossIcon from './sprite/icons/CrossIcon.vue'
import MinusIcon from './sprite/icons/MinusIcon.vue'
import PlusIcon from './sprite/icons/PlusIcon.vue'
import RepeatIcon from './sprite/icons/RepeatIcon.vue'

export default {
  name: "Cart",
  props: {
    isCartOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    IconBase,
    CrossIcon,
    MinusIcon,
    PlusIcon,
    RepeatIcon,
  },

  computed: {
    cart: function () {
      return this.$store.state.cart
    },
    cartTotalPrice: function () {
      let prices = this.cart.map((cartItem) => (!cartItem.toDelete) ? cartItem.price * cartItem.amount : 0)
      let totalPrice = prices.reduce((accumulator, currentItem) => accumulator + currentItem, 0)
      return totalPrice.toLocaleString("ru")
    },
  },

  methods: {
    closeCart: function () {
      this.$emit("close-cart")
    },
    changeCartItemAmount: function (cartItemId, newValue) {
      this.$store.commit('changeCartItemAmount', [cartItemId, newValue])
    },
    increaseCartItemAmount: function (cartItem) {
      let newValue = cartItem.amount + 1
      this.changeCartItemAmount(cartItem.id, newValue)
    },
    decreaseCartItemAmount: function (cartItem) {
      let newValue = (cartItem.amount > 1) ? cartItem.amount - 1 : 1
      this.changeCartItemAmount(cartItem.id, newValue)
    },
  },
  
  created: function () {
    this.$store.dispatch("checkTemporaryCartItems")
  },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
@import '../../assets/styles/variables.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.cart-window {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 600px;
  height: 100%;

  overflow-y: scroll;
  background-color: #ffffff;
}

.cart-window__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 90px;
}

.cart-window__title {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.cart-window__close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border-width: 2px;
  }
}

.cart-window__close-btn-icon {
  width: 24px;
  height: 24px;
}

.cart-window__properties {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.cart-window__cart-size,
.cart-window__clear-cart-btn {
  font-size: 14px;
  text-transform: lowercase;
}

.cart-window__clear-cart-btn {
  opacity: 0.4;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}

.cart-items {
  margin-bottom: 64px;
  list-style: none;
}

.cart-item {
  display: flex;
  align-items: center;
  
  &:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &--to-delete {
    .cart-item__description,
    .cart-item__image,
    .cart-item__amount-management {
      opacity: 0.4;
    }
  }
}

.cart-item__image {
  width: 96px;
  height: 96px;
}

.cart-item__description {
  align-self: flex-end;
  width: 180px;
  margin-bottom: 5px;
}

.cart-item__name {
  margin-bottom: 16px;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.cart-item__price {
  font-weight: 600;
}

.cart-item__management {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  margin-left: auto;
}

.cart-item__amount-management {
  display: flex;
  align-items: center;
  width: 140px;
}

.cart-item__decrease-amount-btn,
.cart-item__current-amount-input {
  margin-right: 10px;
}

.cart-item__current-amount-input {
  width: 40px;
  height: 24px;
  text-align: center;
  border: none;
  outline: none;
  -moz-appearance: textfield;

  &:hover,
  &:focus {
    background-color: #F2F2F2;
    border-radius: 4px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.cart-item__decrease-amount-btn,
.cart-item__increase-amount-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 24px;
  background-color: #F2F2F2;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
}

.cart-item__increase-amount-icon,
.cart-item__decrease-amount-icon {
  width: 16px;
  height: 16px;
}

.cart-item__remove-item-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.cart-item__remove-icon {
  width: 24px;
  height: 24px;
  opacity: 0.2;
}

.cart-window__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.cart-window__result-sum {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.cart-window__checkout {
  padding: 20px 57px;

  color: $dark-turquoise;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  
  border-radius: 4px;
  background-color: $sexy-green;
  cursor: pointer;

  &:hover {
    color: #FFFFFF;
  }
}


@media (max-width: $tablet-size + 1px) {
  .cart-window {
    width: 100%;
  }

  .cart-window__header {
    margin-bottom: 56px;
  }

  .cart-window__title {
    font-size: 36px;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 0.8em;
  }

  .cart-window__close-btn {
    width: 36px;
    height: 36px;
  }

  .cart-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 48px;
  }

  .cart-item {
    position: relative;
    flex-direction: column;
    width: calc((100% - (32px * 2)) / 3);
    padding-top: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .cart-item__image {
    margin-bottom: 16px;
  }

  .cart-item__description {
    align-self: auto;
    margin-bottom: 16px;
  }

  .cart-item__description {
    width: auto;
  }

  .cart-item__management {
    width: 100%;
    margin-left: 0;
  }

  .cart-item__amount-management {
    justify-content: space-between;
    width: 100%;
  }

  .cart-item__remove-item-btn {
    position: absolute;
    top: 24px;
    right: 0;
  }
}


@media (max-width: 560px) {
  .cart-item {
    width: calc((100% - 32px) / 2);
  }

  .cart-window__checkout {
    padding: 20px 20px;
  }
}


@media (max-width: $mobile-size + 1px) {
  .cart-window__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .cart-window__result {
    margin-bottom: 24px;
  }
}
</style>