<template>
    <v-card class="pa-4" elevation="0">
      <v-card-title class="text-h6 font-weight-bold">{{ title }}</v-card-title>
      <v-card-subtitle class="text-body-2">{{ subtitle }}</v-card-subtitle>
      <v-divider class="my-3"></v-divider>
  
      <v-row v-for="(value, key) in userInfo" :key="key" align="center">
        <v-col cols="4" class="font-weight-bold text-body-2">
          {{ key }}
        </v-col><v-col cols="8" class="text-body-2">
  <template v-if="key === 'Avatar'">
    <div class="d-flex align-center justify-space-between">
      <v-avatar size="48">
        <v-img :src="value" />
      </v-avatar>
      <v-file-input size="small" color="primary" variant="plain" class="ml-2">Edit</v-file-input>
    </div>
  </template>
  <template v-else>
    {{ value }}
  </template>
</v-col>

      </v-row>
    </v-card>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: String,
    subtitle: String,
    userInfo: Object
  })
  </script>
  