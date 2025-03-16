<template>
  <Breadcrumbs variant="default" :show-home-icon="true" />

  <v-row>
    <!-- Judul & Deskripsi -->
    <v-col cols="12" class="d-flex">
      <div>
        <span class="text-h6 font-weight-bold">
          Tambah Buku ke Koleksi Perpustakaan
        </span>
        <br />
        <span class="text-caption font-weight-light">
          Silakan isi informasi lengkap tentang buku yang akan ditambahkan.
        </span>
      </div>
      <v-spacer />
      <div class="d-flex justify-end mt-2">
        <v-btn class="mr-2">Kembali</v-btn>
        <v-btn color="primary">Daftar Buku</v-btn>
      </div>
    </v-col>

    <!-- Informasi Dasar -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold">Informasi Dasar</span>
    </v-col>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <!-- Input: Judul Buku -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Judul Buku * </v-label>
      <v-text-field
        placeholder="Masukkan judul buku"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Tahun Terbit -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Tahun Terbit * </v-label>
      <v-text-field
        placeholder="Mis. 2022"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Penulis -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Penulis * </v-label>
      <v-text-field
        placeholder="Masukkan nama penulis"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Edisi -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Edisi * </v-label>
      <v-text-field
        placeholder="Mis. Edisi 2"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Penerbit -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Penerbit * </v-label>
      <v-text-field
        placeholder="Masukkan nama penerbit"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>
  </v-row>

  <v-row>
    <!-- Identifikasi & Kategorisasi -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold"
        >Identifikasi dan Kategorisasi</span
      >
    </v-col>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <!-- Input: Kode Buku -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Kode Buku * </v-label>
      <v-text-field
        v-model="kodeBuku"
        placeholder="Mis. BK-001"
        variant="outlined"
        class="text-caption font-weight-light"
        hide-details
      >
        <template #append-inner>
          <v-btn variant="text" color="primary" @click="generateKodeBuku">
            Generate
          </v-btn>
        </template>
      </v-text-field>
    </v-col>

    <!-- Input: Kategori -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Kategori * </v-label>
      <v-select
        placeholder="Pilih Kategori"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: ISBN -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> ISBN * </v-label>
      <v-text-field
        placeholder="Mis. 978-3-16-148410-0"
        variant="outlined"
        class="text-caption font-weight-light"
        hide-details
      >
        <template #append-inner>
          <v-btn text color="primary" class="text-caption font-weight-light">
            Cek ISBN
          </v-btn>
        </template>
      </v-text-field>
    </v-col>

    <!-- Input: Sub Kategori -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Sub Kategori * </v-label>
      <v-text-field
        placeholder="Tambah Sub Kategori"
        variant="outlined"
        class="text-caption font-weight-light"
      />
      <p class="text-caption font-weight-light">
        Tekan Enter untuk menambahkan sub kategori baru.
      </p>
    </v-col>
  </v-row>

  <v-row>
    <!-- Detail & Ketersediaan -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold"
        >Detail Fisik dan Ketersediaan</span
      >
    </v-col>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <!-- Input: Jumlah Halaman -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">
        Jumlah Halaman *
      </v-label>
      <v-text-field
        placeholder="Mis. 170"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Kategori -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">
        Jumlah Salinan *
      </v-label>
      <v-text-field
        placeholder="1"
        type="number"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Ukuran Buku -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">
        Ukuran Buku (cm) *
      </v-label>
      <v-row>
        <v-col cols="4">
          <v-text-field
            placeholder="Lebar"
            variant="outlined"
            class="text-caption font-weight-light"
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            placeholder="Tinggi"
            variant="outlined"
            class="text-caption font-weight-light"
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            placeholder="Tebal"
            variant="outlined"
            class="text-caption font-weight-light"
            hide-details
          />
        </v-col>
      </v-row>
    </v-col>

    <!-- Input: Sub Kategori -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Sub Kategori * </v-label>
      <v-text-field
        placeholder="Tambah Sub Kategori"
        variant="outlined"
        class="text-caption font-weight-light"
      />
      <p class="text-caption font-weight-light">
        Tekan Enter untuk menambahkan sub kategori baru.
      </p>
    </v-col>
  </v-row>

  <v-row>
    <!-- Deskripsi & Sampul -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold">Deskripsi dan Sampul</span>
    </v-col>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <!-- Input: Jumlah Halaman -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">
        Deskripsi Buku *
      </v-label>
      <v-textarea
        placeholder="Masukkan deskripsi buku"
        variant="outlined"
        class="text-caption font-weight-light"
        auto-grow
        rows="3"
      />
    </v-col>

    <!-- Input: Sampul Buku -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Sampul Buku * </v-label>
      <v-file-input
        accept="image/*"
        variant="outlined"
        append-inner-icon="mdi-camera"
        class="text-caption font-weight-light"
        hide-details
        show-size
      />
    </v-col>

    <!-- Input: Kondisi Buku -->
    <v-col cols="12" md="6">
      <span class="text-caption font-weight-bold">Kondisi Buku *</span>
      <v-radio-group v-model="kondisiBuku" class="mt-2">
        <v-radio label="Baik" value="baik"></v-radio>
        <v-radio label="Sedang (sedikit rusak)" value="sedang"></v-radio>
        <v-radio
          label="Rusak (halaman sobek/tulisan tidak terbaca)"
          value="rusak"
        ></v-radio>
      </v-radio-group>
    </v-col>

    <!-- Preview: Book Cover Preview -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">Preview *</v-label>
      <v-img
        :src="previewImage || 'https://via.placeholder.com/150'"
        class="rounded-lg"
        height="150"
        contain
      />
    </v-col>
  </v-row>

  <v-row>
    <!-- MMetadata Tambahan -->
    <v-col cols="12" class="mb-1">
      <span class="text-h6 font-weight-bold">Tambahan (Opsional)</span>
    </v-col>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <!-- Input: Genre -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light"> Genre * </v-label>
      <v-text-field
        placeholder="Mis. Petualangan, Drama, dll"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>

    <!-- Input: Tanggal Akuisisi -->
    <v-col cols="12" md="6">
      <v-label class="text-caption font-weight-light">
        Tanggal Akuisisi *
      </v-label>
      <v-text-field
        placeholder="T"
        type="date"
        variant="outlined"
        class="text-caption font-weight-light"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const kodeBuku = ref("");
const previewImage = ref("");
const kondisiBuku = ref("");

const generateKodeBuku = () => {
  const randomNum = Math.floor(100 + Math.random() * 900); // Random 3 digit angka (100-999)
  kodeBuku.value = `BK-${randomNum}`;
};
</script>
