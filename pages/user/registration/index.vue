<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid theme="dark">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="registration-card elevation-5 rounded-lg" bg-color="surface">
          <v-card-title class="text-center text-h4 pt-6 pb-2 font-weight-bold primary--text">
            Create Account
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            Fill in your details to get started
          </v-card-subtitle>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="form.fullname" 
                    label="Full Name"
                    placeholder="John Doe"
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-account-outline"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="form.username" 
                    label="Username"
                    placeholder="johndoe123"
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-at"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="form.email" 
                    label="Email Address"
                    type="email"
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-email-outline"
                    :rules="[emailRule]"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="form.phone" 
                    label="Phone Number"
                    placeholder="081234567890" 
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-phone-outline"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select 
                    v-model="form.gender" 
                    label="Gender"
                    :items="[
                      { title: 'Male', value: 'L' },
                      { title: 'Female', value: 'P' }
                    ]"
                    item-title="title"
                    item-value="value"
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-gender-male-female"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="form.birthdate" 
                    label="Birthdate"
                    type="date" 
                    variant="outlined" 
                    color="primary"
                    prepend-inner-icon="mdi-calendar-outline"
                    hide-details="auto"
                    class="mb-4"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[passwordRule]"
                    hide-details="auto"
                    class="mb-4"
                    @click:append-inner="togglePassword"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.confirmPassword"
                    label="Confirm Password"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-lock-check-outline"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[confirmPasswordRule]"
                    hide-details="auto"
                    class="mb-4"
                    @click:append-inner="toggleConfirmPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn 
                :disabled="isLoading" 
                type="submit" 
                block 
                size="large"
                variant="elevated" 
                color="primary" 
                class="mt-4 mb-6"
                height="48"
              >
                <v-progress-circular v-if="isLoading" indeterminate size="24" class="mr-2"></v-progress-circular>
                <span class="font-weight-medium">{{ isLoading ? 'Creating Account...' : 'Create Account' }}</span>
              </v-btn>
            </v-form>

            <v-divider class="mb-4"></v-divider>

            <p class="text-center text-body-2">
              Already have an account?
              <router-link to="/user/login" class="ml-1 text-decoration-none font-weight-medium primary--text">
                Sign In
              </router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color" top rounded="pill" class="snackbar-custom">
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
        <span>{{ snackbar.message }}</span>
      </div>
    </v-snackbar>

    <v-dialog v-model="dialog.show" max-width="400" style="align-self: flex-start; margin-top: 20px;">
      <v-card rounded="lg">
        <v-card-title class="text-h6 pa-4">
          <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
          Error
        </v-card-title>
        <v-card-text class="pa-4">{{ dialog.message }}</v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="elevated" @click="dialog.show = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'fullscreen',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#imports'

const router = useRouter()
const isLoading = ref(false)

const form = ref({
  fullname: '',
  username: '',
  email: '',
  phone: '',
  gender: '',
  birthdate: '',
  password: '',
  confirmPassword: ''
})

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const dialog = ref({
  show: false,
  message: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

const emailRule = (value) => /.+@.+\..+/.test(value) || 'Enter a valid email'
const passwordRule = (value) => value.length >= 8 || 'Password must be at least 8 characters'
const confirmPasswordRule = (value) => value === form.value.password || 'Passwords do not match'

async function handleRegister() {
  if (form.value.password !== form.value.confirmPassword) {
    snackbar.value = { show: true, message: 'Passwords do not match', color: 'error' }
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await useFetch('/api/auth', {
      method: 'POST',
      body: form.value
    })

    if (error.value) {
      snackbar.value = { show: true, message: error.value.message || 'Registration failed', color: 'error' }
      return
    }

    snackbar.value = { show: true, message: 'Registration successful! Redirecting...', color: 'success' }
    setTimeout(() => router.push('/user/login'), 2000)
  } catch (err) {
    snackbar.value = { show: true, message: 'An unexpected error occurred', color: 'error' }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.registration-card {
  max-width: 100%;
  border-radius: 16px;
  padding: 16px;
}

.snackbar-custom {
  font-weight: 500;
}
</style>