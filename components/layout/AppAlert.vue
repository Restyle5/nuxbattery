<template>
  <div :class="['alert', alertClass]" role="alert">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'success',
  },
})

const alertClass = computed(() => `alert-${props.type}`)
</script>
