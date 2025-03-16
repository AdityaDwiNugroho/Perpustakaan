<template>

<v-row>
  <v-col cols="12" md="12" sm="3">
    <v-card-text>ID Peminjaman</v-card-text>
    <v-card-text>{{ loansId }}</v-card-text>
  </v-col>
  <v-col cols="6" md="6" sm="3">
    <v-card-text>ID Buku</v-card-text>
    <v-card-text>{{ bookId }}</v-card-text>
  </v-col>
  <v-col cols="6" md="6" sm="3">
    <v-card-text>ID User</v-card-text>
    <v-card-text>{{ userId }}</v-card-text>
  </v-col>
</v-row>
</template>


<script setup lang="ts">
import type { Peminjaman } from '~/types';


definePageMeta({
  layout: 'admin'
})

const loading = ref(false)
const search = ref("")
const itemsPerPage = ref("")
const serverItems = ref<Peminjaman[]>([])
const totalItems = ref(0)
const loansId = ref("")
const bookId = ref("")
const userId = ref("")

async function getItemFromApi() {
  loading.value = true;
  // TODO: Fetch data from API
  try {
    const response = await $fetch("/api/loans", {
      method: "GET",
      query: {
        search: search.value || "",
        page: 1,
        limit: itemsPerPage.value,
      },
    });

    console.log("API Response:", response.items);

    if (response.items.length > 0) {
      serverItems.value = response.items.map((item: Peminjaman) => ({
        ...item,
        // cover: item.cover ?? undefined,
      }));
      totalItems.value = response.total;
      bookId.value = response.bookId.length > 0 ? response.bookId[0].bookId : "";
      userId.value = response.userId.length > 0 ? response.userId[0].userId : "";
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}



onMounted(() => {
  getItemFromApi();
})
</script>