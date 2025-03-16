<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5" xl="4">
        <v-card class="login-card elevation-5 rounded-lg" color="surface">
          <v-card-title class="text-center text-h4 pt-6 pb-2 font-weight-bold primary--text">
            Welcome Back
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            Sign in to your account to continue
          </v-card-subtitle>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field 
                v-model="form.email"
                label="Email Address"
                placeholder="example@example.com"
                type="email"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-email-outline"
                class="mb-4"
                persistent-placeholder
                required
                hide-details="auto"
              ></v-text-field>

              <v-text-field 
                v-model="form.password"
                label="Password"
                placeholder="Enter your password"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                hide-details="auto"
                class="mb-2"
                @click:append-inner="togglePassword"
                required
              ></v-text-field>

              <div class="d-flex justify-end mb-6">
                <router-link to="/user/recovery" class="text-decoration-none text-caption">
                  Forgot password?
                </router-link>
              </div>

              <v-btn 
                type="submit" 
                block 
                size="large" 
                variant="elevated" 
                color="primary" 
                class="mb-6" 
                height="48"
                :loading="isLoading" 
                :disabled="isLoading"
              >
                <span class="font-weight-medium">Sign In</span>
              </v-btn>
            </v-form>

            <v-divider class="mb-6"></v-divider>

            <p class="text-center text-body-2 text-medium-emphasis mb-4">OR CONTINUE WITH</p>

            <v-btn 
              block 
              variant="outlined"
              class="social-btn mb-6"
              height="48"
              @click="handleGoogleSubmit"
            >
              <Icon icon="logos:google-icon" width="20" class="mr-2" />
              <span>Continue with Google</span>
            </v-btn>

            <p class="text-center text-body-2">
              Don't have an account?
              <router-link to="/user/registration" class="ml-1 text-decoration-none font-weight-medium primary--text">
                Create Account
              </router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'fullscreen',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/home' }
})
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const { signIn } = useAuth()
const router = useRouter()

async function handleLogin() {
  try {
    isLoading.value = true
    await signIn('credentials', form.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const showPassword = ref(false)

const handleGoogleSubmit = () => {
  console.log('Google login clicked')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.login-card {
  max-width: 100%;
  border-radius: 16px;
  padding: 16px;
}

.social-btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>