<template>
  <div class="aside-wrapper">
    <transition name="fade">
      <div class="popup-fade" v-show="isPopUpOpen" @click="$emit('close-pop-up')"></div>
    </transition>
    
    <aside :class="['filters', {'filters--open': isPopUpOpen}]" @mousedown.prevent>
      <label class="filter">
        <input class="filter__checkbox" type="checkbox" v-model="filters.isNew">
        <div class="filter__custom-checkbox"></div>
        <span class="filter__text">Новинки</span>
      </label>
      <label class="filter">
        <input class="filter__checkbox" type="checkbox" v-model="filters.isInStock">
        <div class="filter__custom-checkbox"></div>
        <span class="filter__text">Есть в наличии</span>
      </label>
      <label class="filter">
        <input class="filter__checkbox" type="checkbox" v-model="filters.isContract">
        <div class="filter__custom-checkbox"></div>
        <span class="filter__text">Контрактные</span>
      </label>
      <label class="filter">
        <input class="filter__checkbox" type="checkbox" v-model="filters.isExclusive">
        <div class="filter__custom-checkbox"></div>
        <span class="filter__text">Эксклюзивные</span>
      </label>
      <label class="filter">
        <input class="filter__checkbox" type="checkbox" v-model="filters.isSale">
        <div class="filter__custom-checkbox"></div>
        <span class="filter__text">Распродажа</span>
      </label>
    </aside>
  </div>
</template>


<script>
export default {
  name: "Filters",
  props: {
    filters: {
      type: Object,
      required: true,
    },
    isPopUpOpen: {
      type: Boolean,
      required: true,
    },
  },
}
</script>


<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
@import "../../assets/styles/variables.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.filters {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 180px;
  margin-right: 64px;
}

.filter {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.filter__checkbox {
  display: none;

  &:checked + .filter__custom-checkbox {
    background-color: $sexy-green;

    &::before {
      transform: translate(calc(36px - 7px * 2 - 8px), -50%);
      transition: transform 0.5s;
    }
  }
}

.filter__custom-checkbox {
  position: relative;
  width: 36px;
  height: 22px;
  margin-right: 12px;
  background-color: $light-gray;
  border-radius: 40px;

  &::before {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform 0.5s;

    display: block;
    width: 8px;
    height: 8px;
    margin-left: 7px;
    margin-right: 7px;

    background-color: $dark-turquoise;
    border-radius: 50%;
    content: "";
  }
}

.filter__text {
  font-size: 12px;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.06em;
}


@media (max-width: $laptop-size + 1px) {
  .filters {
    margin-right: 24px;
  }
}


@media (max-width: $tablet-size + 1px) {
  .filters {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: auto;
    margin-right: 0;
    margin-bottom: 16px;
  }

  .filter {
    margin-right: 32px;
    margin-bottom: 18px;
  }
}


@media (max-width: $mobile-size + 1px) {
  .filters {
    display: none;
  }

  .filters--open {
    @include mobile-pop-up;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 0;
  }

  .filter {
    margin-right: 0;
  }

  .filter__text {
    font-size: 18px;
  }
}
</style>