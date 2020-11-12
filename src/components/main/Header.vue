<template>
  <header class="main-header">
    <transition name="fade">
      <div class="popup-fade" v-show="isNavPopUpOpen" @click="isNavPopUpOpen = false"></div>
    </transition>
    <div class="header-wrapper header-wrapper--left">
      <button class="open-navigation-btn" @click="isNavPopUpOpen = true">
        <IconBase class="main-header__logotype" 
          :width="24" :height="14" 
          :fill-color="styleVariables.darkTurquoise"
        ><SandwichIcon/></IconBase>
      </button>

      <IconBase class="main-header__logotype" 
        :width="132" :height="26"
      ><LogotypeIcon/></IconBase>
      
      <nav :class="['main-navigation', {'main-navigation--open': isNavPopUpOpen}]">
        <a class="main-navigation__item main-navigation__item--current" href="#">Продукты</a>
        <a class="main-navigation__item" href="#">Цвета</a>
        <a class="main-navigation__item" href="#">Вдохновение</a>
        <a class="main-navigation__item" href="#">Советы</a>
        <a class="main-navigation__item" href="#">Найти магазин</a>
      </nav>
    </div>

    <div class="header-wrapper header-wrapper--right">
      <div class="contacts">
        <a href="tel:+74952217769">
          <strong class="contacts__number">+7 (495) 221-77-69</strong>
          <span class="contacts__type">Заказать звонок</span>
        </a>
      </div>
      <div class="user-block">
        <a class="user-block__item user-block__search">
          <IconBase :width="20" :height="20">
            <SearchIcon/></IconBase>
        </a>
        <a class="user-block__item user-block__personal-cabinet">
          <IconBase :width="22" :height="22">
            <ProfileIcon/></IconBase>
        </a>
        <a class="user-block__item user-block__favorites">
          <IconBase :width="22" :height="22">
            <HeartIcon/></IconBase>
        </a>
        <button 
          @click="openCart"
          :class="[
            'user-block__item', 
            'user-block__cart-btn', 
            {'user-block__cart-btn--green': $store.state.cart.length > 0}
          ]" 
        >
          {{ $store.state.cart.length }}
        </button>
      </div>
    </div>

    <Cart :is-cart-open="isCartOpen" @close-cart="closeCart"/>
  </header>
</template>


<script>
import Cart from './Cart.vue'

import IconBase from './sprite/IconBase.vue'
import LogotypeIcon from './sprite/icons/LogotypeIcon.vue'
import SandwichIcon from './sprite/icons/SandwichIcon.vue'
import SearchIcon from './sprite/icons/SearchIcon.vue'
import ProfileIcon from './sprite/icons/ProfileIcon.vue'
import HeartIcon from './sprite/icons/HeartIcon.vue'

import styleVariables from '../../assets/styles/variables.scss'

export default {
  name: "Header",
  components: {
    Cart,
    IconBase,
    LogotypeIcon,
    SandwichIcon,
    SearchIcon,
    ProfileIcon,
    HeartIcon,
  },
  data: function () {
    return {
      isCartOpen: false,
      isNavPopUpOpen: false,
      styleVariables: styleVariables,
    }
  },
  methods: {
    openCart: function () {
      this.isCartOpen = true
      document.body.classList.add("blur")
    },
    closeCart: function () {
      this.isCartOpen = false
      document.body.classList.remove("blur")
    },
  },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables.scss';
@import '../../assets/styles/main.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.main-header {
  @include container;

  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 36px;
  padding-bottom: 36px;
}

.header-wrapper {
  display: flex;
  align-items: center;

  &--left {
    margin-right: 36px;
  }

  &--right {
    flex-grow: 1;
    flex-shrink: 0;
  }
}

.open-navigation-btn {
  display: none;
}

.main-header__logotype {
  display: block;
  flex-shrink: 0;
  margin-right: 64px;
}

.main-navigation {
  display: flex;
  flex-wrap: wrap;
}

.main-navigation__item {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $dark-turquoise;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  &:not(:hover) {
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:not(:last-child) {
    margin-right: 24px;
  }
}

.contacts {
  margin-left: auto;
  margin-right: 64px;
  
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $dark-turquoise;
    text-decoration: none;
  }
}

.contacts__number {
  font-weight: 500;
  letter-spacing: -0.02em;
}

.contacts__type {
  font-size: 14px;
  opacity: 0.3;
}

.user-block {
  display: flex;
  align-items: center;
}

.user-block__item {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 24px;
  }
}

.user-block__cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  font-size: 12px;
  font-weight: 500;

  border: none;
  border-radius: 50%;
  background-color: $light-gray;
  outline: none;

  &--green {
    background-color: $sexy-green;
  }
}


@media (max-width: 1330px) {
  .main-header__logotype {
    margin-bottom: 16px;
  }

  .header-wrapper {
    &--left {
      align-items: flex-start;
      flex-direction: column;
    }

    &--right {
      flex-direction: column;
      align-items: flex-end;

      .contacts {
        order: 1;
        margin-right: 0;
      }

      .user-block {
        margin-bottom: 16px;
      }
    }
  }
}


@media (max-width: $laptop-size + 1px) {
  .main-navigation__item {
    margin-bottom: 8px;
  }
}


@media (max-width: $tablet-size + 1px) {
  .header-wrapper--left {
    margin-right: 24px;
  }

  .user-block__item:not(:last-child) {
    margin-right: 12px;
  }
}


@media (max-width: $mobile-size + 1px) {
  .main-header {
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .header-wrapper--left {
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 0;
  }

  .header-wrapper--right .user-block {
    margin-bottom: 0;
  }

  .open-navigation-btn {
    display: block;
    width: 24px;
    height: 14px;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .main-header__logotype {
    margin-bottom: 0;
    margin-right: 0;
  }

  .main-navigation {
    display: none;

    &--open {
      @include mobile-pop-up;
      
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      text-align: center;
    }
  }

  .main-navigation__item {
    margin-bottom: 24px;
    font-size: 18px;

    &:not(:last-child) {
      margin-right: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .contacts {
    display: none;
  }

  .user-block__item {
    display: none;

    &.user-block__cart-btn {
      display: block;
    }
  }
}
</style>