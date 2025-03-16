<template>
  <Breadcrumbs variant="default" :show-home-icon="true" />

  <v-row class="mb-4">
    <!-- Card: Total Peminjaman -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1">Total Peminjaman</v-card-title>
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">{{ totalItems }}</p>
          <p class="text-green-darken-2 text-caption">
            ↑ 12% dibanding bulan lalu
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Peminjaman Aktif -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1">Peminjaman Aktif</v-card-title>
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">
            {{ totalAvailable }}
          </p>
          <p class="text-green-darken-2 text-caption">
            ↑ 5% dibanding bulan lalu
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Peminjaman Terlambat -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1"
          >Peminjaman Terlambat</v-card-title
        >
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">
            {{ totalBorrowed }}
          </p>
          <p class="text-red-darken-2 text-caption">
            ↓ 3% dibanding bulan lalu
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Pengembalian Hari ini -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1"
          >Pengembalian Hari ini</v-card-title
        >
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">23</p>
          <p class="text-red-darken-2 text-caption">
            ↓ 8% dibanding bulan lalu
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row align="center" class="mb-4">
    <v-col cols="6">
      <v-text-field
        v-model="search"
        placeholder="Cari peminjaman..."
        dense
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-magnify"
        style="width: 100%"
      />
    </v-col>
    <v-spacer />
    <v-col cols="2" class="d-flex align-center">
      <v-select
        v-model="selectedStatusPeminjaman"
        :items="filterPeminjaman"
        item-title="label"
        item-value="value"
        label="Pilih Status"
        dense
        variant="outlined"
        hide-details
        class="no-uppsercase"
        style="width: 100%"
      />
    </v-col>
    <v-col cols="2" class="d-flex align-center">
      <v-text-field
        label="Tanggal"
        type="date"
        dense
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-magnify"
        style="width: 100%"
      />
    </v-col>
    <v-col cols="2">
      <v-btn
        color="primary"
        small
        @click="router.push('/book-management/create')"
      >
        Peminjaman Baru
      </v-btn>
    </v-col>
    <!-- <v-col cols="2">
      <v-btn color="success" small> Import Data </v-btn>
    </v-col> -->
  </v-row>

  <!-- Tabs -->
  <v-tabs v-model="tab">
    <v-tab value="semua">Semua</v-tab>
    <v-tab value="tersedia">Dipinjam</v-tab>
    <v-tab value="dipinjam">Terlambat</v-tab>
    <v-tab value="terlambat">Menunggu</v-tab>
    <v-tab value="terlambat">Dikembalikan</v-tab>
  </v-tabs>

  <!-- Tab Content -->
  <v-window v-model="tab">
    <v-window-item value="semua">
      <v-card class="mt-4">
        <v-card-title>
          <v-row align="center">
            <v-col cols="8">
              <span class="text-h6 font-weight-bold">Daftar Peminjaman</span>
            </v-col>
            
            <!-- <v-col cols="2">
              <v-btn color="primary" small> Peminjaman Baru </v-btn>
            </v-col> -->
          </v-row>
        </v-card-title>

        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          class="elevation-1"
        >
          <!-- <template v-slot:item.buku="{ item }">
            <v-row align="center" no-gutters>
              <v-col cols="2">
                <v-img
                  src="/default-avatar.png"
                  alt="Book Image"
                  max-height="30"
                  max-width="30"
                  contain
                />
              </v-col>
              <v-col cols="10">
                {{ item.judul }}
              </v-col>
            </v-row>
          </template> -->

          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status as StatusPinjaman)" dark>
              {{ item.status as StatusPinjaman }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn text color="secondary" class="mr-2">Kembalikan</v-btn>
            <v-btn text color="primary" @click="router.push(`/loan-management/${loansId}`)">Detail</v-btn>
          </template>
        </v-data-table-server>

        <!-- <v-pagination v-model="page" :length="3" class="my-4" /> -->
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import type { Peminjaman, StatusPinjaman } from "@/types";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const itemsPerPage = ref(10);
const tab = ref("terbaru");
const search = ref("");
const page = ref(1);
const totalItems = ref(0);
const loading = ref(false);

// Total Peminjaman
const totalAvailable = ref(0);
const totalBorrowed = ref(0);
const loansId = ref("");

const selectedStatusPeminjaman= ref(null);
const filterPeminjaman = ref<{ label: string; value: "Semua" | StatusPinjaman }[]>([
  { label: "Semua", value: "Semua" },
  { label: "Pending", value: "PENDING" },
  { label: "Diajukan", value: "DIAJUKAN" },
  { label: "Disetujui", value: "DISETUJUI" },
  { label: "Dipinjam", value: "DIPINJAM" },
  { label: "Diperpanjang", value: "DIPERPANJANG" },
  { label: "Dikembalikan", value: "DIKEMBALIKAN" },
  { label: "Dibatalkan", value: "DIBATALKAN" },
  { label: "Ditolak", value: "DITOLAK" },
  { label: "Terlambat", value: "TERLAMBAT" },
  { label: "Diberhentikan", value: "DIBERHENTIKAN" },
]);

// Server Items
const serverItems = ref<Peminjaman[]>([]);
  const headers = ref([
  // { title: "Kode Buku", align: "start", key: "id" },
  { title: "User Id", align: "start", key: "userId" },
  { title: "Buku Id", align: "start", key: "bookId" },
  { title: "Tanggal Peminjaman", align: "start", key: "borrowedAt" },
  { title: "Tanggal Pengembalian", align: "start", key: "dueDate" },
  { title: "Status", align: "start", key: "status" },
  // { title: "Status", align: "center", key: "status" },
  { title: "Aksi", align: "center", key: "actions", sortable: false },
] as const);


function getStatusColor(status: StatusPinjaman): string {
  switch (status) {
    case "PENDING":
      return "grey";
    case "DIAJUKAN":
      return "green";
    case "DIPINJAM":
      return "red";
    case "DISETUJUI":
      return "orange";
    case "DIPINJAM":
      return "orange";
    case "DIPERPANJANG":
      return "orange";
    case "DIKEMBALIKAN":
      return "orange";
    case "DIBATALKAN":
      return "orange";
    default:
      return "grey";
  }
}

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

    // console.log("API Response:", response.items);

    if (response.items.length > 0) {
      serverItems.value = response.items.map((item: Peminjaman) => ({
        ...item,
        // cover: item.cover ?? undefined,
      }));
      totalItems.value = response.total;
      totalAvailable.value = response.total;
      totalBorrowed.value = response.availableLoan;
      loansId.value = response.loansId.length > 0 ? response.loansId[0].id : "";
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// search input (delay API call)
let timeout: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    getItemFromApi();
  }, 100);
});

onMounted(async () => {
  await getItemFromApi();
});
</script>
