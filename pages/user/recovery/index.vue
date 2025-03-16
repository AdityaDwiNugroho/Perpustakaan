<template>
  <v-container class="fill-height d-flex justify-center align-center my-auto" fluid theme="dark">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5" xl="4">
        <v-card class="recovery-card elevation-5 rounded-lg" bg-color="surface">
          <v-card-title class="text-center text-h4 pt-6 pb-2 font-weight-bold primary--text">
            Reset Password
          </v-card-title>
          <v-card-subtitle class="text-center pb-4">
            {{ stepSubtitles[currentStep] }}
          </v-card-subtitle>

          <v-card-text>
            <!-- Email Step -->
            <div v-if="currentStep === 'email'">
              <v-form ref="emailForm" @submit.prevent="requestReset">
                <v-text-field 
                  v-model="email"
                  label="Email Address"
                  placeholder="example@example.com"
                  type="email"
                  variant="outlined"
                  color="primary"
                  prepend-inner-icon="mdi-email-outline"
                  hide-details="auto"
                  class="mb-6"
                  :rules="[emailRule]"
                  required
                ></v-text-field>

                <v-btn 
                  type="submit" 
                  block 
                  size="large"
                  variant="elevated" 
                  color="primary" 
                  class="mb-4"
                  height="48"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  <span class="font-weight-medium">Send Reset Link</span>
                </v-btn>
              </v-form>

              <v-divider class="mb-4"></v-divider>

              <p class="text-center text-body-2">
                Remember your password?
                <router-link to="/user/login" class="ml-1 text-decoration-none font-weight-medium primary--text">
                  Back to Sign In
                </router-link>
              </p>
            </div>

            <!-- Verification Step -->
            <div v-else-if="currentStep === 'verify'">
              <div class="text-center mb-6">
                <v-icon icon="mdi-email-check-outline" color="primary" size="64" class="mb-4"></v-icon>
                <h3 class="text-h5 mb-2">Check Your Email</h3>
                <p class="text-body-1 text-medium-emphasis mb-1">
                  We've sent a password reset link to:
                </p>
                <p class="font-weight-medium mb-4">{{ email }}</p>
                <p class="text-body-2 text-medium-emphasis">
                  If you don't see the email, check other places it might be, like your spam, junk, social, or other folders.
                </p>
              </div>

              <v-divider class="mb-4"></v-divider>

              <v-form @submit.prevent="verifyCode">
                <v-text-field 
                  v-model="verificationCode"
                  label="Verification Code"
                  placeholder="Enter the code from your email"
                  variant="outlined"
                  color="primary"
                  prepend-inner-icon="mdi-key-outline"
                  hide-details="auto"
                  class="mb-4"
                  required
                ></v-text-field>

                <v-btn 
                  type="submit" 
                  block 
                  size="large"
                  variant="elevated" 
                  color="primary" 
                  class="mb-2"
                  height="48"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  <span class="font-weight-medium">Verify Code</span>
                </v-btn>

                <v-btn 
                  block 
                  variant="text" 
                  color="primary" 
                  class="mb-4"
                  @click="resendCode"
                  :disabled="resendCountdown > 0"
                >
                  <span v-if="resendCountdown > 0">Resend code in {{ resendCountdown }}s</span>
                  <span v-else>Resend verification code</span>
                </v-btn>
              </v-form>
            </div>

            <!-- Reset Password Step -->
            <div v-else-if="currentStep === 'reset'">
              <v-form ref="resetForm" @submit.prevent="resetPassword">
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
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

                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  variant="outlined"
                  color="primary"
                  prepend-inner-icon="mdi-lock-check-outline"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="[confirmPasswordRule]"
                  hide-details="auto"
                  class="mb-6"
                  @click:append-inner="toggleConfirmPassword"
                  required
                ></v-text-field>

                <v-btn 
                  type="submit" 
                  block 
                  size="large"
                  variant="elevated" 
                  color="primary" 
                  class="mb-4"
                  height="48"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  <span class="font-weight-medium">Reset Password</span>
                </v-btn>
              </v-form>
            </div>

            <!-- Success Step -->
            <div v-else-if="currentStep === 'success'">
              <div class="text-center mb-6">
                <v-icon icon="mdi-check-circle-outline" color="success" size="64" class="mb-4"></v-icon>
                <h3 class="text-h5 mb-2">Password Reset Successful!</h3>
                <p class="text-body-1 mb-6">
                  Your password has been updated successfully.
                </p>

                <v-btn 
                  block 
                  size="large"
                  variant="elevated" 
                  color="primary" 
                  class="mb-4"
                  height="48"
                  @click="goToLogin"
                >
                  <span class="font-weight-medium">Sign In</span>
                </v-btn>
              </div>
            </div>
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
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'fullscreen',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})

import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#imports'

const router = useRouter()
const isLoading = ref(false)
const currentStep = ref('email')
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const resendCountdown = ref(0)
const resendTimer = ref(null)

const emailForm = ref(null)
const resetForm = ref(null)

const stepSubtitles = {
  email: 'Enter your email to receive a password reset link',
  verify: 'Enter the verification code sent to your email',
  reset: 'Create a new password for your account',
  success: 'Your password has been reset successfully'
}

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

const emailRule = (value) => /.+@.+\..+/.test(value) || 'Enter a valid email'
const passwordRule = (value) => value.length >= 8 || 'Password must be at least 8 characters'
const confirmPasswordRule = (value) => value === newPassword.value || 'Passwords do not match'

async function requestReset() {
  if (!emailForm.value) return
  
  const { valid } = await emailForm.value.validate()
  if (!valid) return

  isLoading.value = true

  try {
    // TODO: Call API to send reset link
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would call your API here
    // const { data, error } = await useFetch('/api/auth/recovery', {
    //   method: 'POST',
    //   body: { email: email.value }
    // })
    
    // if (error.value) throw new Error(error.value.message)

    currentStep.value = 'verify'
    startResendCountdown()
    
  } catch (err) {
    snackbar.value = { 
      show: true, 
      message: err.message || 'Failed to send reset link. Please try again.', 
      color: 'error' 
    }
  } finally {
    isLoading.value = false
  }
}

async function verifyCode() {
  if (!verificationCode.value) {
    snackbar.value = { show: true, message: 'Please enter verification code', color: 'error' }
    return
  }

  isLoading.value = true

  try {
    // TODO: Call API to verify code
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would call your API here
    // const { data, error } = await useFetch('/api/auth/verify-code', {
    //   method: 'POST',
    //   body: { email: email.value, code: verificationCode.value }
    // })
    
    // if (error.value) throw new Error(error.value.message)

    currentStep.value = 'reset'
    
  } catch (err) {
    snackbar.value = { 
      show: true, 
      message: err.message || 'Invalid verification code. Please try again.', 
      color: 'error' 
    }
  } finally {
    isLoading.value = false
  }
}

async function resetPassword() {
  if (!resetForm.value) return
  
  const { valid } = await resetForm.value.validate()
  if (!valid) return

  if (newPassword.value !== confirmPassword.value) {
    snackbar.value = { show: true, message: 'Passwords do not match', color: 'error' }
    return
  }

  isLoading.value = true

  try {
    // TODO: Call API to reset password
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would call your API here
    // const { data, error } = await useFetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   body: { 
    //     email: email.value, 
    //     code: verificationCode.value,
    //     password: newPassword.value
    //   }
    // })
    
    // if (error.value) throw new Error(error.value.message)

    currentStep.value = 'success'
    
  } catch (err) {
    snackbar.value = { 
      show: true, 
      message: err.message || 'Failed to reset password. Please try again.', 
      color: 'error' 
    }
  } finally {
    isLoading.value = false
  }
}

function resendCode() {
  isLoading.value = true
  
  // TODO: Call API to resend verification code
  setTimeout(() => {
    isLoading.value = false
    snackbar.value = { 
      show: true, 
      message: 'Verification code resent successfully', 
      color: 'success' 
    }
    startResendCountdown()
  }, 1000)
}

function startResendCountdown() {
  clearInterval(resendTimer.value)
  resendCountdown.value = 60
  
  resendTimer.value = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--
    } else {
      clearInterval(resendTimer.value)
    }
  }, 1000)
}

function goToLogin() {
  router.push('/user/login')
}

// Clean up timer when component unmounts
onUnmounted(() => {
  clearInterval(resendTimer.value)
})
</script>

<style scoped>
.recovery-card {
  max-width: 100%;
  border-radius: 16px;
  padding: 16px;
}

.snackbar-custom {
  font-weight: 500;
}
</style>