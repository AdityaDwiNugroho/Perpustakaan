<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer app>
    <v-list>
      <!-- Logo and Title in One Row -->
      <v-list-item class="py-4">
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-img 
              src="/logo.png" 
              alt="Perpustakaan Logo" 
              max-height="40" 
              max-width="40"
              contain
            />
          </v-col>
          <v-col cols="10">
            <v-list-item-title class="text-h8 font-weight-bold ml-2">
              Perpustakaan
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Navigation Links -->
      <v-list-item title="Dashboard" to="/dashboard" />
      <v-list-item title="Kelola Buku" to="/book-management" />
      <v-list-item title="Anggota" to="/user-management" />
      <v-list-item title="Peminjaman" to="/loan-management" />
      <v-list-item title="Pengumuman" to="/announcement-management" />
      <v-list-item title="Laporan" to="/reports" />
      <v-list-item title="Pengaturan" to="/settings" />
    </v-list>
  </v-navigation-drawer>

  <!-- App Bar -->
  <v-app-bar app>
    <v-app-bar-title>Admin Panel</v-app-bar-title>
    <v-spacer />
    
    <!-- Profile Button with Image -->
    <v-btn text to="/user">
      <v-avatar size="32" class="mr-2">
        <v-img src="/admin-avatar.png" alt="Admin Avatar" />
      </v-avatar>
      {{ data?.user?.fullname }}
    </v-btn>
  </v-app-bar>
  
  <!-- Main Content  -->
  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
const { data } = useAuth();

</script>
