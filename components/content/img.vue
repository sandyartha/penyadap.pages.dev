<template>
  <img
    :src="src"
    :alt="alt"
    :width="imageWidth"
    :height="imageHeight"
    :class="[
      'rounded-lg max-w-full h-auto',
      {
        'mx-auto': align === 'center',
        'ml-auto': align === 'right',
        'mr-auto': align === 'left'
      }
    ]"
    :style="{
      aspectRatio: imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : undefined
    }"
    loading="lazy"
    @load="onImageLoad"
    ref="imgRef"
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

const imgRef = ref(null)
const imageWidth = ref(props.width ? Number(props.width) : null)
const imageHeight = ref(props.height ? Number(props.height) : null)

const onImageLoad = (event) => {
  if (!imageWidth.value || !imageHeight.value) {
    const img = event.target
    if (img.naturalWidth && img.naturalHeight) {
      imageWidth.value = img.naturalWidth
      imageHeight.value = img.naturalHeight
    }
  }
}

// Try to get dimensions from image metadata on mount
onMounted(() => {
  if (imgRef.value && (!imageWidth.value || !imageHeight.value)) {
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        imageWidth.value = img.naturalWidth
        imageHeight.value = img.naturalHeight
      }
    }
    img.src = props.src
  }
})
</script>

