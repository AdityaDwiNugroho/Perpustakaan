<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItemType {
  title: string 
  disabled?: boolean
  to?: string
  isLast?: boolean
}

const props = withDefaults(defineProps<{
  showHomeIcon?: boolean
  variant?: 'simple' | 'default' | 'custom'
}>(), {
  showHomeIcon: true,
  variant: 'default'
})

const route = useRoute()

const breadcrumbs = computed<BreadcrumbItemType[]>(() => {
  const path = route.path
  const parts = path.split('/').filter(part => part)

  return parts.map((part, index) => {
    const isLast = index === parts.length - 1
    // Changed from text to title
    const title = part.charAt(0).toUpperCase() + part.slice(1) 
    const to = '/' + parts.slice(0, index + 1).join('/')

    return {
      title,  
      disabled: isLast,
      to,
      isLast
    }
  })
})
</script>

<template>
  <!-- Simple: Text Style -->
  <div v-if="variant === 'simple'" class="px-4 py-2 bg-grey-lighten-4 d-flex align-center mb-4">
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
      <BreadcrumbItem
        :text="crumb.title"  
        :to="crumb.to"
        :disabled="crumb.disabled"
        :is-last="crumb.isLast"
      />
      <v-icon
        v-if="!crumb.isLast"
        size="small"
        color="grey"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>
    </template>
  </div>

  <!-- Default: Vuetify Style -->
  <v-breadcrumbs
    v-else-if="variant === 'default'"
    :items="breadcrumbs"
    class="px-4 py-2 mb-4"
  >
    <template v-if="showHomeIcon" v-slot:prepend>
      <v-icon size="small" color="primary" class="mr-2">
        mdi-home
      </v-icon>
    </template>
  </v-breadcrumbs>

  <!-- Custom: Home Style -->
  <div v-else class="d-flex align-center px-4 py-2 bg-grey-lighten-4 mb-4">
    <v-icon v-if="showHomeIcon" color="primary" class="mr-2">
      mdi-home
    </v-icon>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0">
      <template v-slot:divider>
        <v-icon size="small">mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<style scoped>
.breadcrumb-item {
  text-decoration: none;
}

:deep(.v-breadcrumbs-item--disabled) {
  opacity: 1;
  color: rgba(var(--v-theme-on-surface), 0.8);
}
</style>