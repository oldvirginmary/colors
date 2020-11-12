<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    role="presentation"
  >
    <title
      :id="iconName"
      lang="en"
    >{{iconName}}</title>
    <g :fill="fillColor" :stroke="strokeColor">
      <slot />
    </g>
  </svg>
</template>


<script>
export default {
  props: {
    iconName: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    fillColor: {
      type: String,
      default: 'transparent'
    },
    strokeColor: {
      type: String,
    },
    viewBox: {
      type: String,
      default: function () {
        return `0 0 ${this.width} ${this.height}`
      },
    },
  },
}
</script>