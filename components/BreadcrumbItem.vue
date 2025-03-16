<script setup lang="ts">
defineProps<{
  text: string
  to?: string
  disabled?: boolean
  isLast?: boolean
}>()
</script>

<template>
  <component
    :is="to && !disabled ? 'router-link' : 'span'"
    :to="to"
    :class="[
      'breadcrumb-item',
      { 'text-grey': !isLast, 'text-primary font-weight-medium': isLast }
    ]"
  >
    {{ text }}
  </component>
</template>