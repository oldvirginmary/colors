<template>
  <div class="sorting-block">
    <button class="sorting-block__current-sort-btn" @click="isSortingListOpen = true">
      <p class="sorting-block__current-sort-text">{{ currentSorting.title }}</p>
      <IconBase :width="8" :height="6" :fill-color="styleVariables.darkTurquoise">
        <ArrowBottomIcon/>
      </IconBase>
    </button>
    
    <transition name="fade">
      <div class="sorting-list" 
        v-show="isSortingListOpen" 
        @mousedown.prevent
      >
        <label 
          v-for="(sorting, index) in sortingTypes"
          :key="index"
          :class="[
            'sorting-list__item', 
            {'sorting-list__item--checked': currentSorting.name === sorting.name}
          ]"
        >
          <input type="radio" name="sort-type" :value="sorting" 
            v-model="currentSorting" 
            @change="selectSorting(index)" 
            @click="isSortingListOpen = false"
          >
          {{ sorting.title }}
        </label>
      </div>
    </transition>
    <transition name="fade">
      <div class="popup-fade" v-show="isSortingListOpen" @click="isSortingListOpen = false"></div>
    </transition>
  </div>
</template>


<script>
import IconBase from '../main/sprite/IconBase.vue'
import ArrowBottomIcon from '../main/sprite/icons/ArrowBottomIcon.vue'

import styleVariables from '../../assets/styles/variables.scss'

export default {
  name: "Sorting",
  components: {
    IconBase,
    ArrowBottomIcon,
  },
  data: function () {
    return {
      currentSorting: {},
      sortingTypes: [
        {
          name: "expensive",
          title: "Сначала дорогие",
        },
        {
          name: "inexpensive",
          title: "Сначала недорогие",
        },
        {
          name: "popular",
          title: "Сначала популярные",
        },
        {
          name: "new",
          title: "Сначала новые",
        },
      ],
      isSortingListOpen: false,
      styleVariables: styleVariables,
    }
  },

  watch: {
    currentSorting: function () {
      this.$emit("change-current-sorting", this.currentSorting)
    },
  },

  methods: {
    selectSorting: function (sortingIndex) {
      this.$nextTick(function () {
        this.sortingTypes.unshift(this.sortingTypes.splice(sortingIndex, 1)[0])
      })
    },
  },

  mounted: function () {
    this.currentSorting = this.sortingTypes[0]
  },
}
</script>


<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.sorting-block {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 280px;
  margin-top: -17px;
}

.sorting-block__current-sort-btn,
.sorting-block__current-sort-text,
.sorting-list__item {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1em;
}

.sorting-block__current-sort-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 24px;
  padding-right: 12px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: $light-gray;
  }
}

.sorting-block__current-sort-text {
  margin-right: 4px;
}

.sorting-list {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 280px;
  list-style: none;
}

.sorting-list__item {
  display: block;
  text-align: right;
  padding: 17px 24px;
  background-color: #FFFFFF;
  cursor: pointer;

  &:not(&--checked):hover {
    background-color: $light-gray;
  }

  &--checked {
    background-color: $sexy-green;
  }

  input[type="radio"] {
    display: none;
  }
}


@media (max-width: $tablet-size + 1px) {
  .sorting-block,
  .sorting-list {
    width: 220px;
  }
}


@media (max-width: $mobile-size + 1px) {
  .sorting-block__current-sort-btn {
    padding-left: 0;
    padding-right: 0;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>