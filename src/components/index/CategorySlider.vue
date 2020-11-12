<template>
    <section 
      :class="[
        'category-slider', 
        'category-slider--' + currentCategory.name, 
        'category-slider--' + currentCategory.theme
      ]"
    >
      <transition name="fade"
        v-for="(category, index) in categories"
        :key="index"
      >
        <img class="slider-image"
          v-if="category === currentCategory"
          :src="require('../../assets/images/' + category.name + '-intro.jpg')"
        >
      </transition>

      <div class="category-slider__header">
        <ul class="breadcrumbs">
          <li class="crumb"><a href="#">Главная</a></li>
          <li class="crumb"><a href="#">Продукты</a></li>
          <li class="crumb"><a href="#">Краски</a></li>
        </ul>
        <a class="phone-number" href="tel:+74952217769">
          +7 (495) 221-77-69
        </a>
      </div>

      <div class="category">
        <div class="category-info">
          <h2 class="category-title">{{ currentCategory.title }}</h2>
          <p class="category-subtitle">{{ currentCategory.subtitle }}</p>
        </div>

        <button 
          class="category-slider__roll-btn category-slider__roll-btn--next"
          @mousedown.prevent
          @click.stop="rollSlider('right')"
        >
          <IconBase class="category-slider__roll-icon category-slider__roll-icon--next" 
            :width="22" :height="42"><ArrowRightIcon/></IconBase>
        </button>

        <button 
          class="category-slider__roll-btn category-slider__roll-btn--previous"
          @mousedown.prevent
          @click.stop="rollSlider('left')"
        >
          <IconBase class="category-slider__roll-icon category-slider__roll-icon--previous"  
            :width="22" :height="42"><ArrowLeftIcon/></IconBase>
        </button>
      </div>

      <ul class="category-slider__status">
        <li 
          :class="[
            'category-slider__status-item', 
            {'category-slider__status-item--current': currentCategory === category}
          ]" 
          v-for="(category, index) in categories"
          :key="index"
          @click="rollSlider(index)"
        ></li>
      </ul>
    </section>
</template>


<script>
import styleVariables from '../../assets/styles/variables.scss'
import IconBase from '../main/sprite/IconBase.vue'
import ArrowRightIcon from '../main/sprite/icons/ArrowRightIcon.vue'
import ArrowLeftIcon from '../main/sprite/icons/ArrowLeftIcon.vue'

export default {
  name: "CategorySlider",
  components: {
    IconBase,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
  data: function () {
    return {
      sliderPictureTheme: "", // dark, light
      categories: [
        {
          name: "color",
          theme: "dark",
          title: "Краски",
          subtitle: "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
        },
        {
          name: "enamel",
          theme: "dark",
          title: "Эмали",
          subtitle: "Существа бесцветные. Используйте для смешивания с краской."
        },
        {
          name: "varnish",
          theme: "light",
          title: "Лаки",
          subtitle: "Создают блеск и препятствуют попаданию влаги!"
        },
      ],
      currentCategory: {},
      styleVariables: styleVariables,
    }
  },

  mounted: function () {
    this.currentCategory = this.categories[0]
  },
  
  methods: {
    rollSlider: function (direction) {
      if (typeof direction === "number")
        return this.currentCategory = this.categories[direction]

      switch (direction) {
        case "right":
          if (this.currentCategory === this.categories[this.categories.length - 1]) 
            this.currentCategory = this.categories[0]
          else 
            this.currentCategory = this.categories[this.categories.indexOf(this.currentCategory) + 1]
          break
        case "left":
          if (this.currentCategory === this.categories[0]) 
            this.currentCategory = this.categories[this.categories.length - 1]
          else 
            this.currentCategory = this.categories[this.categories.indexOf(this.currentCategory) - 1]
      }
    }
  },
}
</script>


<style lang="scss" scoped>

@import '../../assets/styles/variables.scss';
@import '../../assets/styles/main.scss';

.category-slider {
  @include container;

  position: relative;
  height: 560px;
  padding-top: 32px;
  padding-bottom: 32px;
  overflow: hidden;
}

.category-slider {
  &--dark {
    .slider-image {
      background-color: #000000;
    }

    .crumb {
      a {
        color: $light-pink;
      }

      &:not(:first-child)::before {
        background-color: $light-pink;
      }
    }

    .category-info {
      color: $light-pink;
    }

    .category-slider__roll-icon {
      stroke: $light-pink;
    }
  }

  &--light {
    .slider-image {
      background-color: #FFFFFF;
    }

    .crumb {
      a {
        color: $dark-turquoise;
      }

      &:not(:first-child)::before {
        background-color: $dark-turquoise;
      }
    }
    
    .category-info {
      color: $dark-turquoise;
    }

    .category-slider__roll-icon {
      stroke: $dark-turquoise;
    }
  }
}

.slider-image {
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  min-width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.category-slider__header {
  position: relative;
}

.breadcrumbs {
  display: flex;
  list-style: none;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.crumb {
  display: flex;
  align-items: center;
  margin-right: 8px;

  a {
    text-decoration: none;
  }

  &:not(:first-child)::before {
    display: table;
    width: 3px;
    height: 3px;
    margin-right: 8px;
    border-radius: 100%;
    content: "";
  }
}

.phone-number {
  display: none;
}

.category-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 470px;
  text-align: center;
}

.category-title {
  margin-bottom: 24px;
  font-size: 72px;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.category-subtitle {
  font-size: 16px;
  line-height: 1.3em;
  letter-spacing: 0.02em;
}

.category-slider__roll-btn {
  position: absolute;
  top: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &--next {
    right: 15px;
  }

  &--previous {
    left: 75px;
  }
}

.category-slider__status {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 32px;

  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  list-style: none;
}

.category-slider__status-item {
  width: 6px;
  height: 6px;
  background-color: #FFFFFF;
  opacity: 0.2;
  border-radius: 50%;

  &--current {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
}


@media (max-width: $tablet-size + 1px) {
  .category-title {
    font-size: 64px;
  }
}


@media (max-width: $mobile-size + 1px) {
  .category-slider {
    height: auto;
    padding-top: 16px;
    padding-bottom: 0;
  }

  .category-slider--dark,
  .category-slider--light {
    .slider-image {
      background-color: #FFFFFF;
    }

    .category-slider__header {
      opacity: 0.3;
    }

    .crumb {
      a {
        color: $dark-turquoise;
      }

      &:not(:first-child)::before {
        background-color: $dark-turquoise;
      }
    }

    .category-info {
      color: $dark-turquoise;
    }
  }

  .slider-image {
    display: none;
  }

  .category-info {
    position: static;
    transform: none;
    text-align: left;
  }

  .category-slider__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 38px;
  }

  .breadcrumbs {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .phone-number {
    display: block;
    color: $dark-turquoise;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: none;
  }

  .category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  }

  .category-title {
    margin-bottom: 0;
    font-size: 36px;
    letter-spacing: -0.04em;
    line-height: 0.8em;
  }

  .category-subtitle {
    display: none;
  }

  .category-slider__roll-btn {

    &--previous {
      display: none;
    }

    &--next {
      position: static;
    }
  }

  .category-slider__roll-btn {
    padding: 0;

    &--next {
      position: static;
      transform: none;
    }
  }

  .category-slider--dark .category-slider__roll-icon {
    stroke: $dark-turquoise;
  }

  .category-slider__status {
    display: none;
  }
}
</style>