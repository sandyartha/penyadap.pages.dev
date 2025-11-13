<template>
  <img
    :src="src"
    :alt="alt || ''"
    :width="imageWidth"
    :height="imageHeight"
    :style="imageStyle"
    loading="lazy"
    decoding="async"
    class="rounded-lg my-4 mx-auto max-w-full h-auto"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  width: undefined,
  height: undefined
})

const imageWidth = ref<number | undefined>(props.width ? Number(props.width) : undefined)
const imageHeight = ref<number | undefined>(props.height ? Number(props.height) : undefined)
const aspectRatio = ref<string | undefined>(undefined)

const imageStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (aspectRatio.value) {
    styles.aspectRatio = aspectRatio.value
  }
  return styles
})

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (!imageWidth.value || !imageHeight.value) {
    imageWidth.value = img.naturalWidth
    imageHeight.value = img.naturalHeight
    aspectRatio.value = `${img.naturalWidth} / ${img.naturalHeight}`
  }
}

const onImageError = () => {
  // Fallback jika gambar gagal load
  console.warn(`Failed to load image: ${props.src}`)
}

onMounted(() => {
  // Preload gambar untuk mendapatkan dimensi sebelum render
  if (props.src && !imageWidth.value && !imageHeight.value) {
    const img = new Image()
    img.onload = () => {
      imageWidth.value = img.naturalWidth
      imageHeight.value = img.naturalHeight
      aspectRatio.value = `${img.naturalWidth} / ${img.naturalHeight}`
    }
    img.src = props.src
  }
})
</script>

