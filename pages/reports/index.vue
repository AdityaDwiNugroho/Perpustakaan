<template>
  <Breadcrumbs variant="default" :show-home-icon="true" />

  <v-row>
    <!-- Judul Laporan -->
    <v-col cols="12" class="d-flex">
      <div>
        <span class="text-h6 font-weight-bold"> Cetak Laporan </span>
        <!-- <span class="text-caption font-weight-light">
            Silakan isi informasi lengkap tentang buku yang akan ditambahkan.
        </span> -->
      </div>
    </v-col>
    <v-divider class="mb-4" />

    <v-col cols="12">  
      <card-title class="text-subtitle-1">Filter Laporan</card-title>
    </v-col>

    <!-- Input： Jenis Laporan  -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light mb-2">
        Jenis Laporan *
      </v-label>
      <v-select
        v-model="reportType"
        placeholder="Jenis Laporan"
        variant="outlined"
        />
    </v-col>

        <!-- Input： Status Laporan  -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light mb-2">
        Status *
      </v-label>
      <v-text-field
        v-model="reportStatus"
        placeholder="Status Laporan"
        variant="outlined"
      />
    </v-col>

    <!-- Input: Dari Tanggal -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light mb-2">
        Dari Tanggal *
      </v-label>
      <v-text-field
        v-model="borrowDate"
        placeholder="Tanggal Awal"
        type="date"
        variant="outlined"
      />
    </v-col>

    <!-- Input: Sampai Tanggal -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light mb-2">
        Sampai Tanggal *
      </v-label>
      <v-text-field
        v-model="dueDate"
        placeholder="Tanggal Akhir"
        type="date"
        variant="outlined"
      />
    </v-col>
    <v-col cols="12" class="d-flex justify-end">
      <v-btn color="success" variant="outlined" @click="printReports">Tampilkan</v-btn>
      <v-btn class="ml-4" color="primary" variant="outlined" @click="printReports">Cetak Laporan</v-btn>
    </v-col>
  </v-row>

  <v-divider class="my-4"></v-divider>

  <v-row>
    <v-col cols="12" class="d-flex">
      <div class="d-flex align-center justify-center text-center">
        <span class="text-h6 font-weight-bold"> Pritinjau Laporan </span>
        <!-- <span class="text-caption font-weight-light">
            Silakan isi informasi lengkap tentang buku yang akan ditambahkan.
        </span> -->
      </div>

    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const borrowDate = ref(new Date().toISOString().substr(0, 10));
const dueDate = ref(new Date().toISOString().substr(0, 10));


const printReports = async() => {}

const reportType  = ref("") 


const reportStatus = ref("")
</script>
