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
    <!-- <v-app-bar-title>Admin Panel</v-app-bar-title> -->
    <v-spacer />

    <v-btn text to="/search"> Search </v-btn>
    <v-btn text to="/user/[id]/list.vue"> My List </v-btn>

    <!-- Profile Button with Image -->
    <v-btn text to="/user">
      <v-avatar size="32" class="mr-2">
        <v-img src="/admin-avatar.png" alt="Admin Avatar" />
      </v-avatar>
      <!-- {{ data?.user?.fullname }} -->
    </v-btn>

    <!-- Menu: Dropdown -->
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <!-- <v-btn
        color="indigo"
        v-bind="props"
        >
        Menu as Popover
      </v-btn> -->
      <v-btn :icon="menu ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="menu = !menu" />

      </template>

      <v-card max-width="300" class="mt-10">
        <v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-btn
                text
                variant="plain"
                prepend-icon="mdi-translate"
                to="/languages"
                class="ml-2"
                >Languages
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                text
                variant="plain"
                prepend-icon="mdi-cog"
                to="/settings"
                class="ml-2"
                >Settings
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                text
                variant="plain"
                prepend-icon="mdi-comment-question"
                to="/faq"
                class="ml-2"
                >FAQ
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                text
                variant="plain"
                prepend-icon="mdi-logout"
                to="/user/logout"
                class="ml-2"
                >Settings
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </v-menu>
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

const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);
const items = [
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
];
</script>
