<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
    <h1>Logging Out</h1>
    <p>Please wait while we log you out...</p>
    <v-progress-circular indeterminate color="primary" class="mt-4" size="40"></v-progress-circular>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'fullscreen'
})

const { data, signOut } = useAuth();


onMounted(() => {
  setTimeout(async () => {
    await signOut(); 
    nextTick(() => {
      useRouter().push("/");
    });
  }, 5000);
});
</script>
