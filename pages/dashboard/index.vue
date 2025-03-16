<template>
  <!-- Dialog for Tambah Petugas -->
  <v-dialog v-model="dialogPetugas" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 bg-primary text-white d-flex align-center">
        <p class="mb-0">Tambah Petugas Baru</p>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogPetugas = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="petugasForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.nama"
                placeholder="Nama Lengkap"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.username"
                placeholder="Username"
                prepend-inner-icon="mdi-badge-account"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.email"
                placeholder="Email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.phone"
                placeholder="No. Telepon"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.password"
                placeholder="Password"
                type="password"
                prepend-inner-icon="mdi-shield-account"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStaff.confirmPassword"
                placeholder="Konfirmasi Password"
                type="password"
                prepend-inner-icon="mdi-shield-account"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newStaff.role"
                :items="staffRoles"
                label="Jabatan"
                prepend-inner-icon="mdi-shield-account"
                variant="outlined"
                dense
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newStaff.address"
                label="Alamat"
                prepend-inner-icon="mdi-map-marker"
                variant="outlined"
                dense
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-4 px-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialogPetugas = false"> Batal </v-btn>
        <v-btn color="primary" @click="saveStaff"> Simpan </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog untuk Unduh Laporan Bulanan -->
  <v-dialog v-model="dialogLaporan" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 bg-primary text-white d-flex align-center">
        <p class="mb-0">Unduh Laporan Bulanan</p>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogLaporan = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="laporanForm">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="selectedMonth"
                :items="months"
                label="Pilih Bulan"
                prepend-inner-icon="mdi-calendar"
                variant="outlined"
                dense
                required
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="selectedYear"
                :items="years"
                label="Pilih Tahun"
                prepend-inner-icon="mdi-calendar-range"
                variant="outlined"
                dense
                required
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="selectedFormat"
                :items="formats"
                label="Pilih Format"
                prepend-inner-icon="mdi-file"
                variant="outlined"
                dense
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-4 px-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialogLaporan = false"> Batal </v-btn>
        <v-btn color="primary" @click="downloadReport">Unduh</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog for Tambah Pengumuman Baru -->
  <v-dialog v-model="dialogPengumuman" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 bg-primary text-white d-flex align-center">
        <p class="mb-0">Tambah Pengumuman Baru</p>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogPengumuman = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="pengumumanForm">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newPengumuman.judul"
                label="Judul Pengumuman"
                prepend-inner-icon="mdi-bullhorn"
                variant="outlined"
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="newPengumuman.isi"
                label="Isi Pengumuman"
                prepend-inner-icon="mdi-text"
                variant="outlined"
                dense
                rows="3"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="newPengumuman.kategori"
                :items="kategoriPengumumanList"
                label="Kategori Pengumuman"
                prepend-inner-icon="mdi-tag"
                variant="outlined"
                dense
                required
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-switch
                v-model="newPengumuman.is_active"
                label="Aktifkan Pengumuman"
                inset
                color="primary"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-4 px-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialogPengumuman = false">
          Batal
        </v-btn>
        <v-btn color="primary" @click="saveStaff"> Simpan </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row class="mb-4">
    <!-- Card: Total Buku -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1">Total Buku</v-card-title>
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">{{ totalBook }}</p>
          <!-- <p class="text-green-darken-2 text-caption">
            ↑ 12% dibanding bulan lalu
          </p> -->
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Total Anggota -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1">Total Anggota</v-card-title>
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">{{ totalUser }}</p>
          <!-- <p class="text-green-darken-2 text-caption">
            ↑ 5% dibanding bulan lalu
          </p> -->
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Peminjaman Aktif -->
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-4">
        <v-card-title class="text-subtitle-1">Peminjaman Aktif</v-card-title>
        <v-card-text>
          <p class="text-h5 font-weight-bold text-primary">{{ totalLoan }}</p>
          <!-- <p class="text-red-darken-2 text-caption">
            ↓ 3% dibanding bulan lalu
          </p> -->
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
          <p class="text-h5 font-weight-bold text-primary">{{ lateLoan }}</p>
          <!-- <p class="text-red-darken-2 text-caption">
            ↓ 8% dibanding bulan lalu
          </p> -->
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Card: Aksi Cepat Admin -->
  <v-row class="mb-4">
    <!-- Card: Tambah Petugas -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="pa-4 text-center">
        <v-card-title class="text-subtitle-1">Tambah Petugas</v-card-title>
        <v-card-text>
          <v-btn
            color="primary"
            prepend-icon="mdi-account-plus"
            @click="dialogPetugas = !dialogPetugas"
            >Tambah</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Unduh Laporan Bulanan -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="pa-4 text-center">
        <v-card-title class="text-subtitle-1"
          >Unduh Laporan Bulanan</v-card-title
        >
        <v-card-text>
          <v-btn
            color="success"
            prepend-icon="mdi-download"
            @click="dialogLaporan = !dialogLaporan"
            >Unduh</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card: Tambah Pengumuman -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="pa-4 text-center">
        <v-card-title class="text-subtitle-1"
          >Buat Pengumuman Baru</v-card-title
        >
        <v-card-text>
          <v-btn
            color="warning"
            prepend-icon="mdi-bullhorn"
            @click="dialogPengumuman = !dialogPengumuman"
            >Tambah</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Tabs -->
  <v-tabs v-model="tab">
    <v-tab value="terbaru">Peminjaman Terbaru</v-tab>
    <v-tab value="pengembalian">Pengembalian Hari Ini</v-tab>
    <!-- <v-tab value="populer">Buku Populer</v-tab> -->
  </v-tabs>

  <!-- Tab Content: Peminjaman Terbaru -->
  <v-window v-model="tab" class="mb-4">
    <v-window-item value="terbaru">
      <v-card class="mt-4">
        <v-card-title>
          <v-row align="center">
            <v-col cols="7">
              <span class="text-h6 font-weight-bold"
                >Daftar Peminjaman Terbaru</span
              >
            </v-col>
            <v-col cols="3">
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
            <!-- <v-col cols="2">
              <v-btn color="primary" small> Peminjaman Baru </v-btn>
            </v-col> -->
          </v-row>
        </v-card-title>

        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="
            peminjaman.filter(
              (v) => v.status === 'DIAJUKAN' || v.status === 'DIPINJAM'
            )
          "
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          class="elevation-1"
        >
          <template v-slot:item.buku="{ item }">
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
                {{ item.buku }}
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status as StatusPinjaman)" dark>
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.borrowedAt="{ item }">
            <span>{{ useFormatDate(item.borrowedAt) }}</span>
          </template>

          <template v-slot:item.dueDate="{ item }">
            <span>{{ useFormatDate(item.dueDate) }}</span>
          </template>

          <template v-slot:item.aksi="{ item }">
            <v-btn text color="primary" class="mr-2">Detail</v-btn>
            <v-btn text color="secondary">Setujui</v-btn>
          </template>
        </v-data-table-server>

        <!-- <v-pagination v-model="page" :length="3" class="my-4" /> -->
      </v-card>
    </v-window-item>
  </v-window>

  <!-- Tab Content: Buku Perlu Dikembalikan -->
  <v-window v-model="tab">
    <v-window-item value="pengembalian">
      <v-card class="mt-4">
        <v-card-title>
          <v-row align="center">
            <v-col cols="7">
              <span class="text-h6 font-weight-bold"
                >Buku yang perlu dikembalikan hari ini</span
              >
            </v-col>
            <v-col cols="5">
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
            <!-- <v-col cols="2">
              <v-btn color="primary" small> Peminjaman Baru </v-btn>
            </v-col> -->
          </v-row>
        </v-card-title>

        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="
            peminjaman.filter(
              (v) =>
                v.status === 'MENDEKATI_TANGGAL_PENGEMBALIAN' ||
                v.status === 'TERLAMBAT'
            )
          "
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          class="elevation-1"
        >
          <template v-slot:item.buku="{ item }">
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
                {{ item.buku }}
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status as StatusPinjaman)" dark>
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.borrowedAt="{ item }">
            <span>{{ useFormatDate(item.borrowedAt) }}</span>
          </template>

          <template v-slot:item.dueDate="{ item }">
            <span>{{ useFormatDate(item.dueDate) }}</span>
          </template>
          <template v-slot:item.aksi="{ item }">
            <v-btn
              text
              color="primary"
              class="mr-2"
              :ripple="true"
              elevation="2"
              small
              rounded
              prepend-icon="mdi-eye"
            >
              <span class="font-weight-medium">Detail</span>
            </v-btn>

            <v-btn
              text
              color="secondary"
              :ripple="true"
              elevation="2"
              small
              rounded
              prepend-icon="mdi-keyboard-return"
            >
              <span class="font-weight-medium">Kembalikan</span>
            </v-btn>
          </template>
        </v-data-table-server>

        <!-- <v-pagination v-model="page" :length="3" class="my-4" /> -->
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import type { StatusPinjaman } from "@/types";

definePageMeta({
  layout: "admin",
});

const createUser = ref(false);

// Card: Dashboard
const totalBook = ref(0);
const totalUser = ref(0);
const totalLoan = ref(0);
const lateLoan = ref(0);

const itemsPerPage = ref(10);
const tab = ref("terbaru");
const search = ref("");
const page = ref(1);
const totalItems = ref(0);
const loading = ref(false);
// const serverItems = ref<User[]>([]);

// Dialog: Admin Actions
const dialogPetugas = ref(false);
const dialogLaporan = ref(false);
const dialogPengumuman = ref(false);

// Laporan Bulanan
const selectedMonth = ref("");
const selectedYear = ref("");
const months = ref([
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]);
const years = ref(["2021", "2022", "2023", "2024", "2025"]);
const selectedFormat = ref("pdf");
const formats = ref(["pdf", "xlsx"]);
const staffRoles = ref(["Admin", "Petugas"]);
const newStaff = reactive({
  nama: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "",
  address: "",
});

const newPengumuman = reactive({
  judul: "",
  isi: "",
  kategori: "",
  is_active: true,
});

const kategoriPengumumanList = ref([
  "Umum",
  "Kegiatan",
  "Pemberitahuan",
  "Penting",
]);

const headers = [
  { title: "ID", key: "id" },
  { title: "Buku", key: "judul" },
  { title: "Peminjam", key: "fullname" },
  { title: "Tanggal Pinjam", key: "borrowedAt" },
  { title: "Tanggal Kembali", key: "dueDate" },
  { title: "Status", key: "status" },
  { title: "Aksi", key: "aksi", sortable: false },
];

const peminjaman = ref<any[]>([]);

const saveStaff = () => {
  // console.log(newStaff);
};

const downloadReport = () => {
  console.log(selectedMonth, selectedYear);
};

const getStatusColor = (status: StatusPinjaman) => {
  // if (status === "Dipinjam") return "green";
  // if (status === "Mendekati Deadline") return "orange";
  // if (status === "Terlambat") return "red";
  if (status === "DIPINJAM") return "green";
  if (status === "MENDEKATI_TANGGAL_PENGEMBALIAN") return "orange";
  if (status === "TERLAMBAT") return "red";
  return "grey";
};

async function getBookFromApi() {
  const response = await $fetch("/api/books", {
    method: "GET",
  });

  // console.log("API Response:", response.items);
  // console.log("API Total Book Response:", response.total);

  totalBook.value = response.total;
}

async function getUsersFromApi() {
  const response = await $fetch("/api/users", {
    method: "GET",
  });

  // console.log("API Response:", response.items);
  // console.log("API Total User Response:", response.total);

  totalUser.value = response.total;
}

async function getLoansFromApi() {
  const response = await $fetch("/api/loans", {
    method: "GET",
  });

  // console.log("API Response:", response.items);
  // console.log("API Total Loan Response:", response.total);

  peminjaman.value = response.items.map((loan) => ({
    id: loan.id,
    borrowedAt: loan.borrowedAt,
    dueDate: loan.dueDate,
    status: loan.status,
    judul: loan.book?.judul || "Tidak diketahui",
    fullname: loan.user?.fullname || "Tidak diketahui",
  }));

  const activeLoans = response.items.filter((loan) =>
    [
      "DIAJUKAN",
      "DISETUJUI",
      "DIPINJAM",
      "DIPERPANJANG",
      "MENDEKATI_TANGGAL_PENGEMBALIAN",
    ].includes(loan.status)
  );

  const lateLoans = response.items.filter((loan) =>
    ["TERLAMBAT"].includes(loan.status)
  );

  totalLoan.value = activeLoans.length;
  lateLoan.value = lateLoans.length;
}

onMounted(async () => {
  await getBookFromApi();
  await getUsersFromApi();
  await getLoansFromApi();
});
</script>

<style>
.v-input .v-label {
  font-size: 12px;
}
</style>
