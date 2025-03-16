<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-4 elevation-4 rounded-lg" max-width="100%">
          <!-- Tabs -->
          <v-tabs v-model="tab" grow>
            <v-tab value="info" variant="plain">
              <v-icon start size="small">mdi-information</v-icon>
              <span class="text-body-2">Info</span>
            </v-tab>
            <v-tab value="profile" variant="plain">
              <v-icon start size="small">mdi-account</v-icon>
              <span class="text-body-2">Profile</span>
            </v-tab>
            <v-tab value="settings" variant="plain">
              <v-icon start size="small">mdi-cog</v-icon>
              <span class="text-body-2">Settings</span>
            </v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-window v-model="tab">
            <v-window-item value="info">
              <InfoCard
                title="Profile Information"
                subtitle="General details about your account."
                :user-info="userInfo"
              />
            </v-window-item>

            <v-window-item value="profile">
              <v-card class="pa-4" elevation="0">
                <v-card-title class="text-h6 font-weight-bold"
                  >Profile Settings</v-card-title
                >
                <v-card-subtitle class="text-body-2"
                  >Manage your account preferences.</v-card-subtitle
                >
                <v-divider class="my-3"></v-divider>

                <!-- Form: Update Profile -->
                <v-form @submit.prevent="updateProfile">

                  <v-label class="text-white mb-1">Email</v-label>
                  <v-text-field
                  v-model="userInfo.Email"
                  placeholder="Email"
                  variant="outlined"
                ></v-text-field>

                <v-label class="text-white mb-1">Username</v-label>
                <v-text-field
                  v-model="userInfo.Username"
                  placeholder="Username"
                  variant="outlined"
                  ></v-text-field>

                <v-btn color="primary">Save</v-btn>
                <v-divider class="my-4"></v-divider>
                <v-label class="text-white mb-1">Change Password</v-label>
                <v-text-field
                placeholder="Password"
                variant="outlined"
                ></v-text-field>
                <v-btn color="primary">Save</v-btn>
              </v-form>
              </v-card>
            </v-window-item>

            <v-window-item value="settings">
              <v-card class="pa-4" elevation="0">
                <v-card-title class="text-h6 font-weight-bold"
                  >Other Settings</v-card-title
                >
                <v-card-subtitle class="text-body-2"
                  >Manage your account preferences.</v-card-subtitle
                >
                <v-divider class="my-3"></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>Change Password</v-list-item-title>
                    <v-btn size="small" color="primary" variant="text"
                      >Edit</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      >Enable Two-Factor Authentication</v-list-item-title
                    >
                    <v-switch></v-switch>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-window-item>
          </v-window>

          <v-divider class="my-3"></v-divider>

          <v-card-actions class="d-flex justify-end">
            <v-btn color="error" variant="tonal" class="px-5" @click="logout">
              <v-icon start>mdi-logout</v-icon> Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

import { ref, computed } from "vue";

const { data, signOut } = useAuth();
// console.log(data.value);
const tab = ref("info");

const userInfo = computed(() => ({
  ID: data?.value?.user?.id || "N/A",
  Username: data?.value?.user?.username || "Unknown",
  Email: data?.value?.user?.email || "No email available",
  Role: data?.value?.user?.role || "Visitor",
  Avatar: data?.value?.user?.image || "/default-avatar.png",
}));

const updateProfile = async () => {
  console.log("Updating profile...");
}

const logout = async () => {
  // await signOut()
  useRouter().push("/user/logout");
};
</script>
