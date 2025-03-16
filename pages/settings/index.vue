<template>
  <Breadcrumbs variant="default" :show-home-icon="true" />

  <!-- Dialog: User Preferences -->
  <v-dialog v-model="userPreferences" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 bg-primary text-white d-flex align-center">
        <p class="mb-0">Pengaturan Tema Aplikasi</p>
        <v-spacer></v-spacer>
        <v-btn text @click="userPreferences = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>

  <!-- Pengaturan Admin -->
  <v-row v-if="data?.user?.role === 'ADMINISTRATOR'">
    <v-col cols="12">
      <span class="text-h6 font-weight-bold">Admin Settings</span>
      <v-divider class="my-2" />
    </v-col>

    <!-- Input: Tanggal Peminjaman -->
    <v-col cols="12">
      <v-form @submit.prevent="submitMaxBorrowDate">
        <v-label class="text-caption font-weight-light">
          Maksimal Tanggal Peminjaman *
        </v-label>
        <v-text-field placeholder="Mis. 7" variant="outlined">
          <template #append-inner>
            <v-btn variant="text" color="primary" type="submit">
              Confirm
            </v-btn>
          </template>
        </v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <v-row>
    <!-- Pengaturan Pengguna -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold">Pengaturan Aplikasi</span>
    </v-col>

    <v-divider class="my-2" />

    <!-- Input: Tema Aplikasi -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Tema * </v-label>
      <v-select
        v-model="selectedTheme"
        item-title="text"
        item-value="value"
        :items="themes"
        placeholder="Pilih Tema"
        variant="outlined"
        class="text-caption font-weight-light"
      />
      <!-- <v-btn
        text="Pilih Tema"
        variant="outlined"
        class="text-caption font-weight-light"
        @click="userPreferences = true"
      /> -->
    </v-col>
    
    <!-- Input: Tema Aplikasi -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Tema * </v-label>
      <v-select
        v-model="selectedTheme"
        item-title="text"
        item-value="value"
        :items="themes"
        placeholder="Pilih Tema"
        variant="outlined"
        class="text-caption font-weight-light"
      />
      <!-- <v-btn
        text="Pilih Tema"
        variant="outlined"
        class="text-caption font-weight-light"
        @click="userPreferences = true"
      /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const { data } = useAuth();

const userPreferences = ref(false);
const submitMaxBorrowDate = () => {
  console.log("Max borrow date");
};

const themes = [
  { text: "Light", value: "light" },
  { text: "Dark", value: "dark" },
  { text: "System", value: "system" },
];
const selectedTheme = ref(themes[0].value);

watch(selectedTheme, (newValue) => {
  console.log("Selected theme:", newValue);
});


const getItemFromApi = async () => {
  // TODO: Fetch data from API

  const response = await $fetch("/api/settings", {
    method: "GET",
  });
};
</script>
