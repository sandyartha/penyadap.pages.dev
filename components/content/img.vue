<template>
  <img
    :src="src"
    :alt="alt"
    :title="title"
    :class="[
      'rounded-lg',
      {
        'mx-auto': align === 'center',
        'ml-auto': align === 'right',
        'mr-auto': align === 'left'
      }
    ]"
    :style="{
      maxWidth: width ? `${width}px` : '100%',
      height: height ? `${height}px` : 'auto'
    }"
    loading="lazy"
  />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: null
  },
  height: {
    type: [String, Number],
    default: null
  },
  align: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  }
})
</script>

